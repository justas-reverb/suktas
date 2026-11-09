/**
 * Does every Lithuanian letter come out right, at every weight the page uses, as the browser
 * draws it? tools/font-coverage.py reads the font file; this reads the pixels.
 *
 *   node tools/font-render.mjs        (after `npm run build`)
 *
 * A variable font can be right at its default instance and broken at another weight (Fraunces
 * drew the macron of ū beside the u). So each letter ą č ę ė į š ų ū ž and its capital is drawn
 * large in the page's own fonts at each weight and style the CSS uses, photographed, and its ink
 * compared with its base letter's: the same width within a few per cent (a displaced mark makes it
 * wider), a mark above the letter for č ė š ū ž, a mark below for ą ę į ų.
 *
 * It loads the built page, so it tests the files that ship, through the @font-face rules that ship.
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const ROOT = path.resolve('dist');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const server = http.createServer(async (req, res) => {
  let f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let s = await stat(f).catch(() => null);
  if (s?.isDirectory()) { f = path.join(f, 'index.html'); s = await stat(f).catch(() => null); }
  if (!s) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));

const BASE = { ą: 'a', č: 'c', ę: 'e', ė: 'e', į: 'i', š: 's', ų: 'u', ū: 'u', ž: 'z', Ą: 'A', Č: 'C', Ę: 'E', Ė: 'E', Į: 'I', Š: 'S', Ų: 'U', Ū: 'U', Ž: 'Z' };
const ABOVE = new Set('čėšūžČĖŠŪŽ');
const BELOW = new Set('ąęįųĄĘĮŲ');
const FACES = [
  ['Young Serif', 400, 'normal'],
  ...[400, 560, 650, 700].flatMap((w) => [['Atkinson Hyperlegible Next', w, 'normal'], ['Atkinson Hyperlegible Next', w, 'italic']]),
];
const SIZE = 160;
const MAX_EXTRA = 0.16;
const MAX_SHIFT = 0.10;
const VERBOSE = process.argv.includes('--verbose');

const browser = await chromium.launch({ channel: 'chrome', headless: true });
let failed = 0;
try {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 500 }, deviceScaleFactor: 1, bypassCSP: true });
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: 'load' });
  await page.addStyleTag({ content: 'body > * { display: none !important; } #fr { display: block !important; position: fixed; inset: 0; background: #fff; color: #000; padding: 20px; z-index: 9; } #fr span { display: inline-block; margin: 0 14px 0 0; line-height: 1.5; }' });

  for (const [family, weight, style] of FACES) {
    const letters = [...new Set([...Object.keys(BASE), ...Object.values(BASE)])];
    await page.evaluate(({ family, weight, style, letters, SIZE }) => {
      document.getElementById('fr')?.remove();
      const box = document.createElement('div');
      box.id = 'fr';
      box.style.font = `${style} ${weight} ${SIZE}px "${family}"`;
      for (const ch of letters) { const s = document.createElement('span'); s.textContent = ch; s.dataset.ch = ch; box.appendChild(s); }
      document.body.appendChild(box);
    }, { family, weight, style, letters, SIZE });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    const rects = await page.evaluate(() => [...document.querySelectorAll('#fr span')].map((s) => { const r = s.getBoundingClientRect(); return { ch: s.dataset.ch, x: r.left, y: r.top, w: r.width, h: r.height }; }));
    const png = await page.screenshot({ type: 'png' });
    const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const ink = {};
    for (const r of rects) {
      let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
      for (let y = Math.max(0, Math.floor(r.y)); y < Math.min(info.height, Math.ceil(r.y + r.h)); y++) for (let x = Math.max(0, Math.floor(r.x)); x < Math.min(info.width, Math.ceil(r.x + r.w)); x++) {
        const k = (y * info.width + x) * 3;
        if (data[k] < 140) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
      ink[r.ch] = x1 < 0 ? null : { x0, x1, y0, y1, w: x1 - x0 + 1, top: y0 - r.y, bottom: y1 - r.y };
    }
    const at = Object.fromEntries(rects.map((q) => [q.ch, q]));
    const problems = [];
    let widest = 0;
    for (const [ch, base] of Object.entries(BASE)) {
      const a = ink[ch], b = ink[base];
      if (!a) { problems.push(`${ch}: nothing drawn`); continue; }
      if (!b) continue;
      // a mark set beside its letter instead of over it makes the ink wider than the letter's by the
      // mark's own width; an ogonek adds a little to the right, a displaced macron adds much more
      const extra = a.w - b.w;
      widest = Math.max(widest, extra);
      if (extra > SIZE * MAX_EXTRA) problems.push(`${ch}: ${extra}px wider than ${base} (a mark is displaced)`);
      if (a.w < b.w * 0.8) problems.push(`${ch}: ${a.w}px wide against ${b.w}px for ${base} (the letter is cut)`);
      const shift = Math.abs((a.x0 - at[ch].x) - (b.x0 - at[base].x));
      if (shift > SIZE * MAX_SHIFT) problems.push(`${ch}: starts ${Math.round(shift)}px away from where ${base} starts`);
      if (ABOVE.has(ch) && !(a.top < b.top - SIZE * 0.05)) problems.push(`${ch}: no mark above the letter`);
      if (BELOW.has(ch) && !(a.bottom > b.bottom + SIZE * 0.03)) problems.push(`${ch}: no ogonek below the letter`);
      if (VERBOSE) console.log(`      ${ch} vs ${base}: width ${a.w} vs ${b.w}, left edge shift ${shift.toFixed(1)}, top ${a.top.toFixed(1)} vs ${b.top.toFixed(1)}, bottom ${a.bottom.toFixed(1)} vs ${b.bottom.toFixed(1)}`);
    }
    failed += problems.length;
    console.log(`${problems.length ? 'FAIL' : 'ok  '} ${family} ${weight} ${style} (widest accented letter ${widest}px over its base, limit ${Math.round(SIZE * MAX_EXTRA)})${problems.length ? '\n    ' + problems.join('\n    ') : ''}`);
  }
} finally {
  await browser.close();
  server.close();
}
process.exit(failed ? 1 : 0);
