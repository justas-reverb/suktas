/**
 * Hover jitter: a link, button or card that moves on hover can move out from under a pointer resting on
 * the edge it moves away from. The hover drops, it slides back under the pointer, the hover returns:
 * it flickers for as long as the hand is still (the next-scenario card did, 2026-11-07). The fix is an
 * empty ::after, only while hovered, over the strip the box left (way.css, `.up__card:hover::after`).
 *
 * On every built page, at 2560x1440@1.5 (the main screen) and 390x844@2 with a mouse: hovers every
 * visible link, button, summary and label with transitions off and keeps those whose box moves; then,
 * with transitions on, walks a pointer across each of their four edges in quarter-pixel steps and fails
 * on any whose hover changes more than once per crossing. Two of each class per page are walked.
 *
 *   node tools/hover-check.mjs [--workers 4] [--pages /,/sustok/]
 *
 * Serves dist/ on a free 127.0.0.1 port, runs the installed Chrome headless, exits 1 on any flicker.
 */
import http from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const opts = { workers: '4', pages: '' };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const k = argv[i].replace(/^--/, '');
  if (!(k in opts)) { console.error(`unknown option --${k}`); process.exit(2); }
  opts[k] = argv[++i];
}

const ROOT = path.resolve('dist');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };

async function resolveFile(urlPath) {
  const p = path.join(ROOT, decodeURIComponent(urlPath));
  if (!p.startsWith(ROOT)) return null;
  for (const c of [p, path.join(p, 'index.html')]) if ((await stat(c).catch(() => null))?.isFile()) return c;
  return null;
}
const server = http.createServer(async (req, res) => {
  const file = await resolveFile(new URL(req.url, 'http://x').pathname);
  if (!file) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  res.end(await readFile(file));
});

async function htmlPages(dir, base = '/') {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...await htmlPages(path.join(dir, e.name), `${base}${e.name}/`));
    else if (e.name === 'index.html') out.push(base);
  }
  return out;
}

const SIZES = [
  { name: '2560@1.5', viewport: { width: 2560, height: 1440 }, deviceScaleFactor: 1.5 },
  { name: '390@2', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
];
const OFF = '*,*::before,*::after{transition:none!important}';

async function checkPage(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(800);
  const off = await page.addStyleTag({ content: OFF });
  // tag every visible, hoverable element once; two of each class per page are enough
  const ids = await page.evaluate(() => {
    const seen = {};
    const out = [];
    for (const e of document.querySelectorAll('a[href], button, summary, label, [role="button"]')) {
      if (!e.checkVisibility({ visibilityProperty: true, opacityProperty: true }) || e.closest('dialog:not([open]),[popover]')) continue;
      const r = e.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      const k = `${e.tagName}.${typeof e.className === 'string' ? e.className.trim().split(/\s+/)[0] : ''}`;
      if ((seen[k] = (seen[k] || 0) + 1) > 2) continue;
      e.dataset.hoverProbe = out.length;
      out.push(out.length);
    }
    return out;
  });
  const rect = (el) => el.evaluate((e) => { const r = e.getBoundingClientRect(); return [r.x + scrollX, r.y + scrollY, r.width, r.height]; });
  const moving = [];
  for (const id of ids) {
    const el = page.locator(`[data-hover-probe="${id}"]`);
    try {
      await el.scrollIntoViewIfNeeded({ timeout: 2000 });
      await page.mouse.move(0, 0);
      const a = await rect(el);
      const b = await el.boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
      const c = await rect(el);
      if (a.some((v, i) => Math.abs(v - c[i]) > 0.25)) moving.push(id);
    } catch { /* covered or detached: nothing a pointer can rest on */ }
  }
  await off.evaluate((s) => s.remove());
  const faults = [];
  for (const id of moving) {
    const el = page.locator(`[data-hover-probe="${id}"]`);
    await el.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    const b = await el.boundingBox();
    const vw = page.viewportSize().width;
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    const L = Math.max(0, b.x - 6), R = Math.min(vw - 1, b.x + b.width + 6);
    const walks = { bottom: [cx, b.y + b.height + 6, cx, b.y + b.height - 6], left: [L, cy, b.x + 6, cy],
      top: [cx, b.y - 6, cx, b.y + 6], right: [R, cy, b.x + b.width - 6, cy] };
    const bad = [];
    for (const [side, [x0, y0, x1, y1]] of Object.entries(walks)) {
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
      let flips = 0, last = null;
      for (let t = 0; t <= 1.0001; t += 1 / 48) {
        await page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
        await page.waitForTimeout(25);
        const h = await el.evaluate((e) => e.matches(':hover'));
        if (last !== null && h !== last) flips++;
        last = h;
      }
      if (flips > 1) bad.push(`${side} x${flips}`);
    }
    if (bad.length) faults.push(`${await el.evaluate((e) => `${e.tagName.toLowerCase()}.${String(e.className).trim().split(/\s+/)[0]} "${e.textContent.trim().slice(0, 30)}"`)} flickers: ${bad.join(', ')}`);
  }
  return { moving: moving.length, faults };
}

let browser, failed = false;
try {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const pages = opts.pages ? opts.pages.split(',') : (await htmlPages(ROOT)).sort();
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const q = pages.flatMap((p) => SIZES.map((s) => [p, s]));
  const total = q.length;
  let moving = 0, bad = 0;
  await Promise.all(Array.from({ length: Math.max(1, +opts.workers) }, async () => {
    for (let job; (job = q.shift());) {
      const [p, size] = job;
      // bypassCSP: the probe's own style that switches transitions off is inline, which the site's CSP refuses
      const ctx = await browser.newContext({ viewport: size.viewport, deviceScaleFactor: size.deviceScaleFactor, bypassCSP: true });
      const page = await ctx.newPage();
      try {
        const r = await checkPage(page, origin + p);
        moving += r.moving;
        for (const f of r.faults) { bad++; console.log(`${p} ${size.name}: ${f}`); }
      } catch (e) { bad++; console.log(`${p} ${size.name}: could not check (${e.message.slice(0, 100)})`); }
      await ctx.close();
    }
  }));
  console.log(`hover: ${pages.length} pages at ${SIZES.map((s) => s.name).join(' and ')} (${total} loads), ${moving} boxes move on hover, ${bad} flicker`);
  failed = bad > 0;
} finally {
  await browser?.close().catch(() => {});
  server.close();
}
process.exit(failed ? 1 : 0);
