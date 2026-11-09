/**
 * Paints public/og-image.jpg (1200x630): tools/paint/og.html in the installed Chrome (WebGL on the
 * real GPU), photographed from outside. The same shader as the live art; no SVG, no read-back.
 *   node tools/paint-og.mjs
 */
import http from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { generate } from './paint-shaders.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.woff2': 'font/woff2', '.png': 'image/png' };
await generate();
const server = http.createServer(async (req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const s = f.startsWith(ROOT) ? await stat(f).catch(() => null) : null;
  if (!s?.isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
  page.on('pageerror', (e) => console.log('[page error]', e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/tools/paint/og.html`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
  await page.waitForTimeout(150);
  const png = await page.locator('.card').screenshot({ type: 'png' });
  const jpg = await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  await writeFile(path.join(ROOT, 'public/og-image.jpg'), jpg);
  console.log(`public/og-image.jpg ${(jpg.length / 1024).toFixed(0)} KB`);
} finally { await browser.close(); server.close(); }
