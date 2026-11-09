/**
 * Paints the stills of the /treniruote/ game thumbnails (tools/paint/thumbs.html): a Playwright screenshot of a canvas in the
 * installed Chrome, each width painted natively, never made small from a larger one. A later game is one more row in GAMES here
 * and in GAMES in thumbs.html.
 *
 *   node tools/paint-thumbs.mjs                 every still into public/art/game-<slug>-<width>.webp
 *   node tools/paint-thumbs.mjs --sheet <dir>   also the review sheet's two screenshots (desktop 208 px @1.5, phone 340 px @2.875) in <dir>
 */
import http from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GAMES = ['banko-paieska', 'smart-id', 'diena-su-telefonu'];
const WIDTHS = [640, 960, 1280];
const ASPECT = 1.6;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png' };

const server = http.createServer(async (req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const s = f.startsWith(ROOT) ? await stat(f).catch(() => null) : null;
  if (!s?.isFile()) { res.writeHead(404).end('not found'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 })).newPage();
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`  [page ${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => console.log(`  [page error] ${e.message}`));
  await page.goto(origin + '/tools/paint/thumbs.html');
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
  for (const slug of GAMES) for (const w of WIDTHS) {
    const h = Math.round(w / ASPECT);
    await page.setViewportSize({ width: w, height: h });
    await page.evaluate((j) => window.paint(j), { slug, w, h });
    await page.waitForTimeout(100);
    const png = await page.locator('#c').screenshot({ type: 'png' });
    const buf = await sharp(png).webp({ quality: 80, effort: 6, smartSubsample: true }).toBuffer();
    const out = path.join(ROOT, `public/art/game-${slug}-${w}.webp`);
    await writeFile(out, buf);
    console.log(`${slug} ${w}x${h}: ${path.relative(ROOT, out)} ${(buf.length / 1024).toFixed(0)} KB`);
  }
  const a = process.argv.slice(2);
  if (a.includes('--sheet')) {
    const dir = path.resolve(a[a.indexOf('--sheet') + 1]);
    for (const [name, vw, dpr, shot] of [['desktop', 900, 1.5, 'sheet-desktop.png'], ['phone', 375, 2.875, 'sheet-phone.png']]) {
      const ctx = await browser.newContext({ viewport: { width: vw, height: 10 }, deviceScaleFactor: dpr });
      const p = await ctx.newPage();
      await p.goto(`${origin}/${path.relative(ROOT, dir).split(path.sep).join("/")}/sheet.html?mode=${name}`);
      await p.waitForLoadState('load');
      await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
      await p.screenshot({ path: path.join(dir, shot), fullPage: true });
      console.log(`sheet: ${shot}`);
      await ctx.close();
    }
  }
} finally {
  await browser.close().catch(() => {});
  server.close();
}
