/**
 * Look at the built site the way a reader's browser receives it.
 *
 * Serves dist/ on a free 127.0.0.1 port, opens it in the installed Chrome (headless;
 * `channel: 'chrome'` renders WebGL on the RTX 5080, where Playwright's own headless
 * shell would fall back to SwiftShader on the CPU), and screenshots every page at every
 * size in every mode:
 *
 *   js       JavaScript on, normal motion
 *   nojs     JavaScript off: Tor Browser on Safest, NoScript. The page must be whole.
 *   reduced  prefers-reduced-motion: reduce
 *
 *   node tools/shoot.mjs [--out design/shots] [--pages /] [--wait 1500]
 *                        [--sizes 390x844@2,1440x900@1,2560x1440@1.5] [--modes js,nojs,reduced]
 *
 * Writes <page>-<w>x<h>-<mode>.png (full page) and, in js mode, <page>-<w>x<h>-fold.png
 * (the first screen), plus report.json. The report lists console errors (a CSP refusal
 * shows up there), uncaught errors, every request that left 127.0.0.1, every call that
 * read canvas pixels back or touched browser storage (the runtime half of
 * check-privacy.mjs), and whether a page scrolls sideways. It exits 1 if any of those
 * happened, after writing every screenshot.
 *
 * 2560x1440 at DPR 1.5 is what a 4K screen at 150% scaling gives a maximised browser.
 * The server and the browser are closed in `finally`,
 * so nothing is left running.
 */
import http from 'node:http';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { fullShot, scrollShot } from './lib/fullshot.mjs';

const opts ={ out: 'design/shots', pages: '/', wait: '1500', sizes: '390x844@2,1440x900@1,2560x1440@1.5', modes: 'js,nojs,reduced' };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const k = argv[i].replace(/^--/, '');
  if (!(k in opts)) { console.error(`unknown option --${k}`); process.exit(2); }
  opts[k] = argv[++i];
}

const ROOT = path.resolve('dist');
const OUT = path.resolve(opts.out);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
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
  try {
    const file = await resolveFile(new URL(req.url, 'http://x').pathname);
    const notFound = file ? null : await resolveFile('/404.html');
    const send = file || notFound;
    if (!send) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found'); return; }
    res.writeHead(file ? 200 : 404, { 'Content-Type': MIME[path.extname(send).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(send));
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end(String(e));
  }
});

/* Wraps every API that reads a canvas back or stores something in the browser, so a call
   is recorded however it was reached (a library's code path included). Runs before any
   page script. Workers have their own globals and are not covered. */
function probe() {
  const calls = [];
  Object.defineProperty(window, '__suktaiProbe', { value: calls });
  const wrap = (proto, name, label) => {
    if (!proto || typeof proto[name] !== 'function') return;
    const orig = proto[name];
    proto[name] = function (...args) { calls.push(label); return orig.apply(this, args); };
  };
  wrap(window.HTMLCanvasElement?.prototype, 'toDataURL', 'canvas.toDataURL');
  wrap(window.HTMLCanvasElement?.prototype, 'toBlob', 'canvas.toBlob');
  wrap(window.HTMLCanvasElement?.prototype, 'captureStream', 'canvas.captureStream');
  wrap(window.CanvasRenderingContext2D?.prototype, 'getImageData', '2d.getImageData');
  wrap(window.OffscreenCanvasRenderingContext2D?.prototype, 'getImageData', 'offscreen-2d.getImageData');
  wrap(window.OffscreenCanvas?.prototype, 'convertToBlob', 'offscreen.convertToBlob');
  wrap(window.WebGLRenderingContext?.prototype, 'readPixels', 'webgl.readPixels');
  wrap(window.WebGL2RenderingContext?.prototype, 'readPixels', 'webgl2.readPixels');
  wrap(window.Storage?.prototype, 'setItem', 'storage.setItem');
  wrap(window.Storage?.prototype, 'getItem', 'storage.getItem');
  wrap(window.IDBFactory?.prototype, 'open', 'indexedDB.open');
  wrap(window.ServiceWorkerContainer?.prototype, 'register', 'serviceWorker.register');
  wrap(window.Navigator?.prototype, 'sendBeacon', 'navigator.sendBeacon');
  const cookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
  if (cookie) {
    Object.defineProperty(Document.prototype, 'cookie', {
      configurable: true,
      get() { calls.push('document.cookie read'); return cookie.get.call(this); },
      set(v) { calls.push('document.cookie write'); cookie.set.call(this, v); },
    });
  }
}

/** A step that never settles fails the shot instead of holding the run (and Chrome) forever. */
const within = (promise, ms, what) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error(`${what} did not finish in ${ms / 1000} s`)), ms).unref()),
]);
/* And the whole run has a ceiling, so a hang nobody foresaw still ends with Chrome closed. */
const WATCHDOG = setTimeout(async () => {
  console.error('shoot.mjs: the run took over 10 minutes; closing Chrome and giving up');
  await browser?.close().catch(() => {});
  process.exit(1);
}, 10 * 60 * 1000);
WATCHDOG.unref();

const sizes = opts.sizes.split(',').map((s) => {
  const m = /^(\d+)x(\d+)(?:@([\d.]+))?$/.exec(s.trim());
  if (!m) { console.error(`bad size ${s}`); process.exit(2); }
  return { w: +m[1], h: +m[2], dpr: m[3] ? +m[3] : 1 };
});
const modes = opts.modes.split(',').map((s) => s.trim());
const pages = opts.pages.split(',').map((s) => s.trim());
const pageName = (p) => p.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'index';

let browser;
const report = { when: new Date().toISOString(), shots: [] };
let failed = false;
try {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  await mkdir(OUT, { recursive: true });
  browser = await chromium.launch({ channel: 'chrome', headless: true });

  for (const p of pages) for (const s of sizes) for (const mode of modes) {
    const phone = s.w < 768;
    const ctx = await browser.newContext({
      viewport: { width: s.w, height: s.h }, deviceScaleFactor: s.dpr, isMobile: phone, hasTouch: phone,
      javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
      locale: 'lt-LT',
    });
    await ctx.addInitScript(probe);
    const page = await ctx.newPage();
    const entry = { page: p, size: `${s.w}x${s.h}@${s.dpr}`, mode, console: [], errors: [], external: [], broken: [], calls: [] };
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') entry.console.push(`${m.type()}: ${m.text()}`); });
    page.on('pageerror', (e) => entry.errors.push(String(e)));
    page.on('request', (r) => { const u = r.url(); if (!u.startsWith(origin) && !/^(data|blob):/.test(u)) entry.external.push(u); });
    /* A browser's console says "404" without the URL; this names it. Chrome asks for
       /favicon.ico by itself when a page declares no icon, so a missing icon shows here. */
    page.on('response', (r) => { if (r.status() >= 400) entry.broken.push(`${r.status()} ${r.url().replace(origin, '')}`); });

    const res = await page.goto(origin + p, { waitUntil: 'load', timeout: 30000 });
    entry.status = res?.status();
    /* page.evaluate never settles when JavaScript is off (measured 2026-10-02: the run
       hung on its first nojs page), so nothing below evaluates in nojs mode. Lazy images
       need no scroll there: browsers load them eagerly when scripting is off. */
    const scripted = mode !== 'nojs';
    if (scripted) {
      /* Scroll through once so lazy images load and scroll-driven art wakes, then back.
         The limit grows with the page: Šaltiniai at 390 px is ~258,000 px, ~380 steps of 60 ms (2026-11-07). */
      const steps = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight / (innerHeight * 0.8)));
      await within(page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        scrollTo(0, 0);
      }), Math.max(20000, steps * 150), 'scrolling through').catch((e) => entry.errors.push(String(e)));
    }
    await page.waitForTimeout(+opts.wait);

    const base = `${pageName(p)}-${s.w}x${s.h}`;
    if (mode === 'js') await page.screenshot({ path: path.join(OUT, `${base}-fold.png`), timeout: 30000 });
    /* Stitched, never one capture: a single full-page capture wraps past 16,384 device pixels.
       With JavaScript on, one viewport at a time (scrollShot), because fullShot's beyond-viewport
       capture laid some pages out at the wrong width (2026-10-25); sticky elements are set static
       first so they do not repeat down the shot. With it off, fullShot, which needs no page script.
       Either way the size comes from DevTools, so it tells whether the page scrolls sideways. */
    let full;
    if (scripted) {
      await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) if (getComputedStyle(el).position === 'sticky') el.style.setProperty('position', 'static', 'important'); });
      full = await scrollShot(page, s.dpr);
      await writeFile(path.join(OUT, `${base}-${mode}.png`), full.png);
    } else full = await fullShot(page, s.dpr, path.join(OUT, `${base}-${mode}.png`));
    entry.scrollWidth = full.width;
    entry.overflowX = full.width > s.w + 1;
    entry.height = full.height;
    if (scripted) {
      const calls = await within(page.evaluate(() => (window.__suktaiProbe ? [...window.__suktaiProbe] : [])), 10000, 'reading the probe')
        .catch((e) => { entry.errors.push(String(e)); return []; });
      entry.calls = [...new Set(calls)];
    }
    entry.console = [...new Set(entry.console)];
    entry.external = [...new Set(entry.external)];
    entry.broken = [...new Set(entry.broken)];

    /* Chrome fetches /favicon.ico on its own and Playwright never reports that request,
       so an unnamed 404 in the console with nothing in `broken` is almost always it. */
    entry.console = entry.console.map((c) => (/status of 404/.test(c) && !entry.broken.length ? `${c} (probably /favicon.ico: declare an icon)` : c));
    const consoleErrors = entry.console.filter((c) => c.startsWith('error'));
    const bad = entry.external.length || entry.errors.length || entry.calls.length || entry.overflowX || entry.broken.length || consoleErrors.length || entry.status !== 200;
    if (bad) failed = true;
    console.log(`${bad ? 'FAIL' : 'ok  '} ${p} ${entry.size} ${mode}` +
      (entry.external.length ? ` | external: ${entry.external.join(', ')}` : '') +
      (entry.broken.length ? ` | broken: ${entry.broken.join(', ')}` : '') +
      (entry.errors.length ? ` | errors: ${entry.errors.join(' / ')}` : '') +
      (entry.calls.length ? ` | forbidden calls: ${entry.calls.join(', ')}` : '') +
      (consoleErrors.length ? ` | console: ${consoleErrors.join(' / ')}` : '') +
      (entry.overflowX ? ` | scrolls sideways (${entry.scrollWidth}px)` : '') +
      (entry.status !== 200 ? ` | HTTP ${entry.status}` : ''));
    report.shots.push(entry);
    await ctx.close();
  }
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`${report.shots.length} shots in ${path.relative(process.cwd(), OUT) || '.'}${failed ? ', with failures' : ''}`);
} finally {
  await browser?.close().catch(() => {});
  server.close();
}
process.exit(failed ? 1 : 0);
