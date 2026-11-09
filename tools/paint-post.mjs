/**
 * Paints the postmark and the cancelled stamp (public/art/postmark-*.png, cancelled-*.png): tools/paint/post.html
 * in the installed Chrome, photographed from outside on a transparent ground, each size drawn natively at 1x, 2x
 * and 3x. Textless; no SVG, no read-back in the site.
 *   node tools/paint-post.mjs
 */
import http from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const s = f.startsWith(ROOT) ? await stat(f).catch(() => null) : null;
  if (!s?.isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const SIZES = { postmark: 128, cancelled: 200 };
try {
  for (const [kind, w] of Object.entries(SIZES)) {
    for (const scale of [1, 2, 3]) {
      const ctx = await browser.newContext({ viewport: { width: 500, height: 500 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      page.on('pageerror', (e) => console.log('[page error]', e.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/tools/paint/post.html?kind=${kind}&scale=${scale}`);
      await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
      const png = await page.locator('#c').screenshot({ type: 'png', omitBackground: true });
      const out = path.join(ROOT, `public/art/${kind}-${w * scale}.png`);
      await writeFile(out, png);
      console.log(path.relative(ROOT, out), `${(png.length / 1024).toFixed(1)} KB`);
      await ctx.close();
    }
  }
} finally { await browser.close(); server.close(); }
