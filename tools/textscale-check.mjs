/**
 * Every built page at 375x703 as an Android in-app browser (Messenger's WebView) shows it with the
 * system font size at 1.5: every element's font set to 1.5x its computed size, as an inline
 * `!important` px value. Fails on any text that NEWLY runs past the screen edge, measured on each
 * text node's own line boxes (a long word can spill out of an element whose box stays inside), and
 * on a page that newly scrolls sideways. Text inside a box that scrolls or clips sideways is skipped.
 *
 *   node tools/textscale-check.mjs [--workers 4] [--pages /,/apie/]
 *
 * Serves dist/ on a free 127.0.0.1 port, runs the installed Chrome headless, exits 1 on any fault.
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

/* Runs in the page. Returns what runs past the edge at x1.5 and did not at x1. */
async function scan() {
  const vw = document.documentElement.clientWidth;
  const all = [...document.querySelectorAll('body *')];
  const clipped = (n) => { for (let p = n.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false; };
  const texts = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walk.nextNode());) {
    const el = n.parentElement;
    if (!n.textContent.trim() || !el || el.closest('[popover],dialog:not([open]),script,style,noscript') || clipped(n)) continue;
    if (el.checkVisibility && !el.checkVisibility({ visibilityProperty: true, opacityProperty: true })) continue;
    texts.push(n);
  }
  const past = () => texts.map((n) => {
    const r = document.createRange(); r.selectNodeContents(n);
    return [...r.getClientRects()].some((x) => x.width > 0 && (x.right > vw + 1 || x.left < -1));
  });
  const before = past();
  const sw0 = document.documentElement.scrollWidth;
  const fs = all.map((e) => parseFloat(getComputedStyle(e).fontSize));
  all.forEach((e, i) => e.style.setProperty('font-size', `${fs[i] * 1.5}px`, 'important'));
  let after;
  // a font change restarts any opening animation, so give the layout up to six seconds to settle
  for (let k = 0; k < 12; k++) {
    await new Promise((r) => setTimeout(r, 500));
    after = past();
    if (!after.some((x, i) => x && !before[i]) && document.documentElement.scrollWidth <= Math.max(vw, sw0)) break;
  }
  const name = (e) => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? `.${e.className.trim().split(/\s+/)[0]}` : '');
  const hits = texts.filter((n, i) => after[i] && !before[i]).map((n) => {
    const r = document.createRange(); r.selectNodeContents(n);
    const right = Math.max(...[...r.getClientRects()].map((x) => x.right));
    return `${name(n.parentElement)} ->${Math.round(right)} "${n.textContent.trim().slice(0, 30)}"`;
  });
  return { sw0, sw: document.documentElement.scrollWidth, vw, hits };
}

let browser, failed = false;
try {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const pages = opts.pages ? opts.pages.split(',') : (await htmlPages(ROOT)).sort();
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const q = [...pages];
  const results = {};
  await Promise.all(Array.from({ length: Math.max(1, +opts.workers) }, async () => {
    for (let p; (p = q.shift());) {
      const ctx = await browser.newContext({ viewport: { width: 375, height: 703 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      try {
        await page.goto(origin + p, { waitUntil: 'load', timeout: 30000 });
        await page.waitForTimeout(1500);
        results[p] = await page.evaluate(scan);
      } catch (e) { results[p] = { fail: e.message.slice(0, 120) }; }
      await ctx.close();
    }
  }));
  const bad = pages.filter((p) => { const v = results[p]; return v.fail || v.hits.length || v.sw > Math.max(v.vw, v.sw0); });
  for (const p of bad) { const v = results[p]; console.log(p, v.fail || `scrollWidth ${v.sw0}->${v.sw}  ${v.hits.slice(0, 6).join(' | ')}`); }
  console.log(`textscale: ${pages.length} pages at 375x703 with text x1.5, ${bad.length} with text past the edge`);
  failed = bad.length > 0;
} finally {
  await browser?.close().catch(() => {});
  server.close();
}
process.exit(failed ? 1 : 0);
