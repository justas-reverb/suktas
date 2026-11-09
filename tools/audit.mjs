/**
 * The critic's audit of the built page: the questions a designer's own checks may not ask.
 *
 *   npm run build && node tools/audit.mjs [--out design/audit] [--page /] [--only layout,contrast,images,fallbacks,cost]
 *
 * layout     Every width from 320 to 2560 at DPR 1: sideways scroll and what sticks out, the hero
 *            headline's box against the lead's, the smallest text, tap targets under 24 px
 *            (WCAG 2.5.8; inline links in running text are exempt).
 * contrast   Every line of visible text, each <details> a reader can open included, against the pixels
 *            actually behind it: the page is shot once more with its text made transparent, and each line's box is read from that
 *            shot. At 390x844@2, 1440x900 and 2560x1440@1.5, with the still (reduced motion) and
 *            with the live canvas. The figure is the contrast at the worst 5% of the pixels
 *            behind the line, against WCAG's 4.5:1 (3:1 for large text).
 * images     Each visible <img>: the file the browser chose, against the device pixels it fills.
 * fallbacks  No WebGL (--disable-3d-apis); a lost and then restored context; a software GPU
 *            (--disable-gpu, so WebGL runs on SwiftShader): does the still stay, does the art
 *            give up, and how long the page suffers first. Plus long tasks and time-to-live.
 * cost       GPU time of one hero draw at each size: twenty draws, then a one-pixel read to
 *            wait for them. The read is the audit's, never the page's.
 *
 * Writes report.json and crops of the worst contrast lines to --out. Prints a summary. It
 * judges nothing for you; the numbers go into the critique.
 */
import http from 'node:http';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright-core';
import { scrollShot } from './lib/fullshot.mjs';

const opts = { out: 'design/audit', page: '/', only: 'layout,contrast,images,fallbacks,cost' };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) opts[argv[i].replace(/^--/, '')] = argv[++i];
const ONLY = new Set(opts.only.split(','));
const ROOT = path.resolve('dist');
const OUT = path.resolve(opts.out);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

async function resolveFile(urlPath) {
  const p = path.join(ROOT, decodeURIComponent(urlPath));
  if (!p.startsWith(ROOT)) return null;
  for (const c of [p, path.join(p, 'index.html'), p + '.html']) {
    const s = await stat(c).catch(() => null);
    if (s?.isFile()) return c;
  }
  return null;
}
const server = http.createServer(async (req, res) => {
  const file = await resolveFile(new URL(req.url, 'http://x').pathname);
  if (!file) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(await readFile(file));
});

const within = (p, ms, what) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(`${what}: over ${ms / 1000} s`)), ms).unref())]);
const browsers = [];
async function launch(args = []) {
  const b = await chromium.launch({ channel: 'chrome', headless: true, args });
  browsers.push(b);
  return b;
}
async function open(browser, { w, h, dpr = 1, reduced = false, js = true, bypassCSP = false, init = null }) {
  const phone = w < 768;
  const ctx = await browser.newContext({
    viewport: { width: w, height: h }, deviceScaleFactor: dpr, isMobile: phone, hasTouch: phone,
    reducedMotion: reduced ? 'reduce' : 'no-preference', javaScriptEnabled: js, bypassCSP, locale: 'lt-LT',
  });
  if (init) await ctx.addInitScript(init);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(origin + opts.page, { waitUntil: 'load', timeout: 30000 });
  return { ctx, page, errors };
}
const scrollThrough = (page) => within(page.evaluate(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
  scrollTo(0, 0);
  /* a lazy image inside a closed <details> never loads, so it is not waited for */
  await Promise.all([...document.images].map((i) => (i.complete || i.closest('details:not([open])') ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
}), 30000, 'scroll-through');
const waitLive = (page, ms = 8000) => page.waitForFunction(() => document.querySelector('[data-hero],[data-herofx]')?.classList.contains('is-live'), null, { timeout: ms }).then(() => true, () => false);

/* A short CSS path for reports. Defined in each evaluate, since functions do not cross over. */
const SEL = `const sel = (el) => { const parts = []; for (let e = el; e && e !== document.body && parts.length < 4; e = e.parentElement) { let s = e.tagName.toLowerCase(); if (e.id) { s += '#' + e.id; parts.unshift(s); break; } const c = [...e.classList].slice(0, 2).join('.'); if (c) s += '.' + c; parts.unshift(s); } return parts.join(' > '); };`;

const report = { when: new Date().toISOString() };
let origin;

try {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  origin = `http://127.0.0.1:${server.address().port}`;
  await mkdir(OUT, { recursive: true });
  const gpu = await launch();

  {
    const { ctx, page } = await open(gpu, { w: 800, h: 600 });
    report.renderer = await page.evaluate(() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
      return gl ? (ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'webgl2, renderer hidden') : 'no webgl2';
    });
    await ctx.close();
    console.log(`renderer: ${report.renderer}`);
  }

  if (ONLY.has('layout')) {
    const sizes = [[320, 568], [360, 660], [375, 812], [390, 844], [414, 896], [480, 800], [600, 900], [768, 1024],
      [900, 1100], [1024, 768], [1280, 800], [1366, 768], [1440, 900], [1920, 1080], [2560, 1440], [844, 390]];
    report.layout = [];
    for (const [w, h] of sizes) {
      const { ctx, page } = await open(gpu, { w, h });
      await scrollThrough(page);
      const r = await page.evaluate(new Function(`${SEL} return (() => {
        const W = innerWidth, sw = document.documentElement.scrollWidth, out = [];
        if (sw > W + 1) for (const el of document.querySelectorAll('body *')) { const b = el.getBoundingClientRect(); if (b.width && b.right > W + 1) { out.push(sel(el) + ' ->' + Math.round(b.right)); if (out.length > 6) break; } }
        const box = (s) => document.querySelector(s)?.getBoundingClientRect();
        const h1 = box('h1'), hero = box('.hero') || h1, sub = box('.hero__sub-in') || h1;
        const meet = sub !== h1 && !(h1.bottom <= sub.top || sub.bottom <= h1.top || h1.right <= sub.left || sub.right <= h1.left);
        let minFont = 99, minAt = '';
        const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (tw.nextNode()) {
          const n = tw.currentNode, el = n.parentElement;
          if (!n.data.trim() || el.closest('.sr, script, style')) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue;
          const fs = parseFloat(cs.fontSize); if (fs < minFont) { minFont = fs; minAt = sel(el) + ' "' + n.data.trim().slice(0, 30) + '"'; }
        }
        const small = [];
        for (const el of document.querySelectorAll('a, button, summary, input, select')) {
          const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue;
          // a closed <details> still lays out its content in Chrome; nobody can reach it
          if (el.closest('details:not([open]) > :not(summary)')) continue;
          if (getComputedStyle(el).display === 'inline' && el.closest('p, li')) continue;
          let t = b; if (el.matches('input')) { const l = el.closest('label'); if (l) t = l.getBoundingClientRect(); }
          if (t.width < 24 || t.height < 24) small.push(sel(el) + ' ' + Math.round(t.width) + 'x' + Math.round(t.height));
        }
        return { W, H: innerHeight, overflow: sw > W + 1 ? sw : 0, out, heroH: Math.round(hero.height),
          h1: [Math.round(h1.top), Math.round(h1.bottom)], sub: [Math.round(sub.top), Math.round(sub.bottom)],
          subBelowHero: hero !== h1 && sub.bottom > hero.bottom + 1, meet, minFont, minAt, small, docH: document.documentElement.scrollHeight };
      })();`));
      report.layout.push(r);
      const flags = [r.overflow && `SCROLLS SIDEWAYS ${r.overflow}px: ${r.out.join(', ')}`, r.meet && 'headline MEETS lead', r.subBelowHero && 'lead below hero',
        r.minFont < 16 && `smallest text ${r.minFont}px at ${r.minAt}`, r.small.length && `${r.small.length} small targets: ${r.small.slice(0, 3).join('; ')}`].filter(Boolean);
      console.log(`layout ${w}x${h}: hero ${r.heroH}, h1 ${r.h1}, lead ${r.sub}, page ${r.docH}px${flags.length ? ' | ' + flags.join(' | ') : ''}`);
      await ctx.close();
    }
  }

  if (ONLY.has('contrast')) {
    report.contrast = [];
    const configs = [{ w: 390, h: 844, dpr: 2 }, { w: 1440, h: 900, dpr: 1 }, { w: 2560, h: 1440, dpr: 1.5 }];
    const LIN = new Float64Array(256).map((_, i) => { const c = i / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
    const lum = (r, g, b) => 0.2126 * LIN[r] + 0.7152 * LIN[g] + 0.0722 * LIN[b];
    for (const c of configs) for (const mode of ['still', 'live']) {
      const { ctx, page } = await open(gpu, { ...c, reduced: mode === 'still', bypassCSP: true });
      // Every block a reader can open is measured open, before the scroll so lazy images inside it load. The site's menus stay closed: open, they cover the page.
      await page.evaluate(() => document.querySelectorAll('details:not([data-drop],[data-menu])').forEach((d) => { d.open = true; }));
      await scrollThrough(page);
      if (mode === 'live') { const ok = await waitLive(page); if (!ok) console.log(`contrast ${c.w}: the art never went live`); await page.waitForTimeout(1500); }
      // scrollShot scrolls the page; a sticky heading would move under its measured box
      await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) if (getComputedStyle(el).position === 'sticky') el.style.setProperty('position', 'static', 'important'); });
      const lines = await page.evaluate(new Function(`${SEL} return (() => {
        const out = [], tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (tw.nextNode()) {
          const n = tw.currentNode, el = n.parentElement;
          if (!n.data.trim() || el.closest('.sr, script, style')) continue;
          /* Text in a closed <details> (only the site's menus are left closed) still reports boxes
             where it would sit, over whatever is really drawn there; it is not visible, so it is not measured. */
          const det = el.closest('details');
          if (det && !det.open && !el.closest('summary')) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
          if (op < 0.05) continue;
          const m = cs.color.match(/[\\d.]+/g).map(Number);
          const r = document.createRange(); r.selectNodeContents(n);
          for (const b of r.getClientRects()) {
            if (b.width < 3 || b.height < 3) continue;
            out.push({ x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height, rgb: m.slice(0, 3), a: (m[3] ?? 1) * op,
              size: parseFloat(cs.fontSize), weight: +cs.fontWeight || 400, text: n.data.trim().slice(0, 48), at: sel(el), band: !!el.closest('.scn-head, .shead, .stage, .key') });
          }
        }
        return out;
      })();`));
      const shown = (await scrollShot(page, c.dpr)).png;
      await page.addStyleTag({ content: '*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-decoration-color:transparent!important;caret-color:transparent!important}' });
      await page.waitForTimeout(150);
      const bare = (await scrollShot(page, c.dpr)).png;
      const { data, info } = await sharp(bare).raw().toBuffer({ resolveWithObject: true });
      const fails = [];
      const bandLines = [];
      for (const L of lines) {
        const x0 = Math.max(0, Math.floor(L.x * c.dpr)), y0 = Math.max(0, Math.floor(L.y * c.dpr));
        const x1 = Math.min(info.width, Math.ceil((L.x + L.w) * c.dpr)), y1 = Math.min(info.height, Math.ceil((L.y + L.h) * c.dpr));
        if (x1 - x0 < 2 || y1 - y0 < 2) continue;
        const ratios = [];
        const step = Math.max(1, Math.floor(Math.sqrt(((x1 - x0) * (y1 - y0)) / 6000)));
        for (let y = y0; y < y1; y += step) for (let x = x0; x < x1; x += step) {
          const i = (y * info.width + x) * info.channels;
          const br = data[i], bg = data[i + 1], bb = data[i + 2];
          const fr = Math.round(L.a * L.rgb[0] + (1 - L.a) * br), fg = Math.round(L.a * L.rgb[1] + (1 - L.a) * bg), fb = Math.round(L.a * L.rgb[2] + (1 - L.a) * bb);
          const lb = lum(br, bg, bb), lf = lum(fr, fg, fb);
          ratios.push((Math.max(lb, lf) + 0.05) / (Math.min(lb, lf) + 0.05));
        }
        ratios.sort((a, b) => a - b);
        const p5 = ratios[Math.floor(ratios.length * 0.05)], med = ratios[Math.floor(ratios.length / 2)];
        const large = L.size >= 24 || (L.size >= 18.66 && L.weight >= 700);
        const need = large ? 3 : 4.5;
        if (L.band) bandLines.push({ p5: +p5.toFixed(2), med: +med.toFixed(2), need, size: L.size, text: L.text });
        if (p5 < need) fails.push({ p5: +p5.toFixed(2), med: +med.toFixed(2), need, size: L.size, text: L.text, at: L.at, box: [Math.round(L.x), Math.round(L.y), Math.round(L.w), Math.round(L.h)] });
      }
      fails.sort((a, b) => a.p5 / a.need - b.p5 / b.need);
      bandLines.sort((a, b) => a.p5 / a.need - b.p5 / b.need);
      report.contrast.push({ size: `${c.w}x${c.h}@${c.dpr}`, mode, lines: lines.length, fails, band: { lines: bandLines.length, worst: bandLines.slice(0, 3) } });
      if (bandLines.length) console.log(`   band text (${bandLines.length} lines): worst ${bandLines.slice(0, 3).map((b) => `${b.p5} (needs ${b.need}) "${b.text}"`).join(' | ')}`);
      console.log(`contrast ${c.w}x${c.h}@${c.dpr} ${mode}: ${lines.length} lines, ${fails.length} under the threshold`);
      for (const f of fails.slice(0, 8)) console.log(`   ${f.p5} (median ${f.med}, needs ${f.need}) ${f.size}px "${f.text}" at ${f.at} [${f.box}]`);
      for (const [k, f] of fails.slice(0, 4).entries()) {
        const [bx, by, bw, bh] = f.box, pad = 24;
        const left = Math.max(0, Math.round((bx - pad) * c.dpr)), top = Math.max(0, Math.round((by - pad) * c.dpr));
        const width = Math.min(info.width - left, Math.round((bw + pad * 2) * c.dpr)), height = Math.min(info.height - top, Math.round((bh + pad * 2) * c.dpr));
        await sharp(shown).extract({ left, top, width, height }).toFile(path.join(OUT, `contrast-${c.w}-${mode}-${k + 1}.png`)).catch(() => {});
      }
      await ctx.close();
    }
  }

  if (ONLY.has('images')) {
    report.images = [];
    for (const c of [{ w: 390, h: 844, dpr: 2 }, { w: 414, h: 896, dpr: 3 }, { w: 1440, h: 900, dpr: 1 }, { w: 1920, h: 1080, dpr: 1 }, { w: 2560, h: 1440, dpr: 1.5 }]) {
      const { ctx, page } = await open(gpu, { ...c, reduced: true });
      await scrollThrough(page);
      /* naturalWidth of an <img> chosen through srcset is corrected by the density the browser
         assigned it, not the file's pixels, so each chosen file is decoded again on its own. */
      const imgs = await page.evaluate(async (dpr) => (await Promise.all([...document.images].map(async (i) => {
        const b = i.getBoundingClientRect(); const cs = getComputedStyle(i);
        if (!b.width || !i.currentSrc) return null;
        const t = new Image(); t.src = i.currentSrc; await t.decode().catch(() => {});
        const nw = t.naturalWidth, nh = t.naturalHeight; if (!nw) return null;
        const fit = cs.objectFit === 'cover' || cs.objectFit === 'contain';
        const s = cs.objectFit === 'cover' ? Math.max(b.width / nw, b.height / nh) : Math.min(b.width / nw, b.height / nh);
        const drawnW = fit ? nw * s : b.width;
        return { src: i.currentSrc.split('/').pop(), file: nw + 'x' + nh, box: Math.round(b.width) + 'x' + Math.round(b.height), up: +((drawnW * dpr) / nw).toFixed(2) };
      }))).filter(Boolean), c.dpr);
      report.images.push({ size: `${c.w}x${c.h}@${c.dpr}`, imgs });
      const soft = imgs.filter((i) => i.up > 1.15);
      console.log(`images ${c.w}x${c.h}@${c.dpr}: ${imgs.length} shown${soft.length ? ' | upscaled: ' + soft.map((i) => `${i.src} x${i.up} in ${i.box}`).join('; ') : ', none upscaled past 1.15x'}`);
      await ctx.close();
    }
  }

  // a page with no art band (a weekly letter) has no canvas for the fallback and cost steps
  if (ONLY.has('fallbacks') || ONLY.has('cost')) {
    const { ctx, page } = await open(gpu, { w: 1440, h: 900 });
    if (!(await page.locator('[data-hero],[data-rings]').count())) {
      console.log('no art band on this page: fallbacks and cost skipped');
      ONLY.delete('fallbacks'); ONLY.delete('cost');
    }
    await ctx.close();
  }

  if (ONLY.has('fallbacks')) {
    report.fallbacks = {};
    const state = (page) => page.evaluate(() => {
      const h = document.querySelector('[data-hero],[data-herofx]'), cv = h.querySelector('canvas'), img = h.querySelector('img');
      return { live: h.classList.contains('is-live'), canvasOpacity: +getComputedStyle(cv).opacity, imgOpacity: +getComputedStyle(img).opacity, imgShown: img.complete && img.naturalWidth > 0 };
    });
    const timing = () => {
      window.__lt = []; window.__iv = []; window.__liveAt = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: true });
      let prev = 0; const tick = (t) => { if (prev) window.__iv.push(+(t - prev).toFixed(2)); prev = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
      document.addEventListener('DOMContentLoaded', () => {
        const h = document.querySelector('[data-hero],[data-herofx]');
        if (h) new MutationObserver(() => { if (h.classList.contains('is-live') && !window.__liveAt) window.__liveAt = Math.round(performance.now()); }).observe(h, { attributes: true });
      });
    };

    {
      const { ctx, page, errors } = await open(gpu, { w: 1440, h: 900, init: timing });
      await waitLive(page); await page.waitForTimeout(3000);
      const t = await page.evaluate(() => ({ liveAt: window.__liveAt, longTasks: window.__lt, iv: window.__iv }));
      const iv = t.iv.slice(10), med = [...iv].sort((a, b) => a - b)[Math.floor(iv.length / 2)];
      report.fallbacks.normal = { liveAt: t.liveAt, longTasks: t.longTasks, medianInterval: med, late: iv.filter((x) => x > med * 1.5).length, frames: iv.length, errors };
      console.log(`normal 1440: live after ${t.liveAt} ms; long tasks ${JSON.stringify(t.longTasks)}; rAF median ${med} ms, ${report.fallbacks.normal.late} of ${iv.length} over 1.5x`);

      const lose = await page.evaluate(async () => {
        const cv = document.querySelector(':is([data-hero],[data-herofx]) canvas'); const gl = cv.getContext('webgl2'); const ext = gl.getExtension('WEBGL_lose_context');
        ext.loseContext(); await new Promise((r) => setTimeout(r, 900));
        const h = document.querySelector('[data-hero],[data-herofx]'); const afterLoss = { live: h.classList.contains('is-live'), canvasOpacity: +getComputedStyle(cv).opacity };
        ext.restoreContext(); await new Promise((r) => setTimeout(r, 3000));
        return { afterLoss, afterRestore: { live: h.classList.contains('is-live'), canvasOpacity: +getComputedStyle(cv).opacity } };
      });
      report.fallbacks.contextLoss = { ...lose, errors };
      console.log(`context lost: ${JSON.stringify(lose.afterLoss)}; restored: ${JSON.stringify(lose.afterRestore)}; errors ${errors.length}`);
      await ctx.close();
    }
    {
      const { ctx, page } = await open(gpu, { w: 1440, h: 900, reduced: true });
      await page.waitForTimeout(2500);
      report.fallbacks.reduced = await state(page);
      console.log(`reduced motion: ${JSON.stringify(report.fallbacks.reduced)}`);
      await ctx.close();
    }
    {
      const b = await launch(['--disable-3d-apis']);
      const { ctx, page, errors } = await open(b, { w: 1440, h: 900 });
      await page.waitForTimeout(3000);
      report.fallbacks.noWebGL = { ...(await state(page)), errors };
      console.log(`no WebGL: ${JSON.stringify(report.fallbacks.noWebGL)}`);
      await ctx.close();
    }
    {
      const b = await launch(['--disable-gpu', '--enable-unsafe-swiftshader']);
      const { ctx, page, errors } = await open(b, { w: 2560, h: 1440, dpr: 1.5, init: timing });
      const renderer = await page.evaluate(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl && gl.getExtension('WEBGL_debug_renderer_info'); return gl ? (e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : '?') : 'none'; });
      const samples = [];
      for (let s = 0; s < 8; s++) { await page.waitForTimeout(2000); samples.push(await state(page).then((x) => x.live).catch(() => 'n/a')); }
      const t = await page.evaluate(() => ({ liveAt: window.__liveAt, longTasks: window.__lt, iv: window.__iv }));
      const slow = t.iv.filter((x) => x > 100);
      report.fallbacks.software = { renderer, liveEvery2s: samples, liveAt: t.liveAt, longTasks: t.longTasks.length, worstLongTask: Math.max(0, ...t.longTasks.map((x) => x[1])), framesOver100ms: slow.length, worstFrame: Math.max(0, ...t.iv), errors };
      console.log(`software GPU (${renderer}): live every 2 s ${JSON.stringify(samples)}; ${slow.length} frames over 100 ms, worst ${report.fallbacks.software.worstFrame} ms; long tasks ${t.longTasks.length}, worst ${report.fallbacks.software.worstLongTask} ms`);
      await ctx.close();
    }
  }

  if (ONLY.has('cost')) {
    report.cost = [];
    for (const c of [{ w: 2560, h: 1440, dpr: 1.5 }, { w: 1920, h: 1080, dpr: 1 }, { w: 1440, h: 900, dpr: 1 }, { w: 390, h: 844, dpr: 2 }]) {
      const { ctx, page } = await open(gpu, c);
      if (!(await waitLive(page))) { console.log(`cost ${c.w}: never live`); await ctx.close(); continue; }
      const r = await page.evaluate(() => {
        const cv = document.querySelector(':is([data-hero],[data-herofx]) canvas'); const gl = cv.getContext('webgl2'); const px = new Uint8Array(4);
        const runs = [];
        for (let k = 0; k < 6; k++) {
          gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
          const t0 = performance.now();
          for (let i = 0; i < 20; i++) gl.drawArrays(gl.TRIANGLES, 0, 3);
          gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
          runs.push((performance.now() - t0) / 20);
        }
        runs.sort((a, b) => a - b);
        return { canvas: cv.width + 'x' + cv.height, perDraw: +runs[Math.floor(runs.length / 2)].toFixed(2), best: +runs[0].toFixed(2) };
      });
      report.cost.push({ size: `${c.w}x${c.h}@${c.dpr}`, ...r });
      console.log(`cost ${c.w}x${c.h}@${c.dpr}: canvas ${r.canvas}, ${r.perDraw} ms a draw (best ${r.best})`);
      await ctx.close();
    }
  }

  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
} finally {
  for (const b of browsers) await b.close().catch(() => {});
  server.close();
}
