/**
 * The art's frame cost on this machine, measured, at the sizes that matter.
 *
 *   node tools/paint-cost.mjs [--frames 240]
 *
 * Opens tools/paint/cost.html in the installed Chrome (WebGL on the RTX 5080) and draws the hero
 * shader at each size, reporting GPU time per frame from timer queries (`gpu`) and the wall time
 * of draw + finish (`wall`). The brief is under 4 ms a frame at 2560x1440. That window at
 * Windows' 150% scaling is 3840x2160 device pixels, which the live hero caps itself to (DPR 1.5,
 * 8.4 million pixels). Machine load changes the numbers: measure on an idle machine.
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { generate } from './paint-shaders.mjs';

const args = process.argv.slice(2);
const frames = +(args[args.indexOf('--frames') + 1] || 240);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

await generate();
const server = http.createServer(async (req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const s = f.startsWith(ROOT) ? await stat(f).catch(() => null) : null;
  if (!s?.isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const CASES = [
  ['2560x1440 CSS at 1x = 2560x1440 (the size the brief names)', { w: 2560, h: 1440 }],
  ['2560x1440 CSS at 1.5x = 3840x2160 (the cap)', { w: 3840, h: 2160 }],
  ['same, while brushing (12 wipes)', { w: 3840, h: 2160, brush: true }],
  ['same, quality 0.75 (2880x1620)', { w: 2880, h: 1620 }],
  ['same, quality 0.55 + lite shader (2112x1188)', { w: 2112, h: 1188, lite: true }],
  ['1440x900 CSS at 1x = 1600x900', { w: 1600, h: 900 }],
  ['phone 390x844 at 1.5x, tall shot = 585x1040', { w: 585, h: 1040, shot: 'tall' }],
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  page.on('pageerror', (e) => console.log('  [page error]', e.message));
  await page.goto(origin + '/tools/paint/cost.html');
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
  for (const [label, job] of CASES) {
    const r = await page.evaluate((j) => window.measure(j), { frames, ...job });
    const f = (s) => (s ? `median ${s.median.toFixed(2)}  p95 ${s.p95.toFixed(2)}  max ${s.max.toFixed(2)}` : 'n/a');
    console.log(`${label}\n    gpu  ${f(r.gpu)} ms (${r.gpu?.n ?? 0} frames)\n    wall ${f(r.wall)} ms   [${r.renderer.replace(/ANGLE \((.*?),.*/, '$1')}${r.timerQuery ? '' : ', no timer query'}]`);
  }
} finally {
  await browser.close();
  server.close();
}
