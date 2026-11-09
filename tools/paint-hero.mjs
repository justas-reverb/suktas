/**
 * Paints the stills of the hero's three directions (src/art/hero/*.frag.glsl): a Playwright screenshot of the
 * canvas in the installed Chrome (WebGL on the RTX 5080), made outside the page because the live art never
 * reads its own pixels back. Each size is painted natively, never made small from a larger one.
 *
 *   node tools/paint-hero.mjs                         every still of a, b and c into public/art/
 *   node tools/paint-hero.mjs --dir a --size 1920x800 --time 3 --out design/x.png      one preview
 *   node tools/paint-hero.mjs --cost                  frame cost of each direction at 3840x1600 and 1920x800
 */
import http from 'node:http';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { generate } from './paint-shaders.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json' };
const SIZES = [['wide', 1280, 2.4], ['wide', 1920, 2.4], ['wide', 2880, 2.4], ['tall', 780, 1.5], ['tall', 1170, 1.5]];
export const JOBS = [];
for (const dir of ['a', 'b', 'c']) for (const [shape, w, asp] of SIZES) JOBS.push({ dir, w, h: Math.round(w / asp), webp: path.join(ROOT, `public/art/hero-${dir}-${shape}-${w}.webp`), quality: 86 });
// the home page's "Kaip jis galvoja" band (direction t): a band 2.2:1 on a phone, a wide picture beside the text above 60rem
for (const [shape, w, asp] of [['wide', 1280, 2.4], ['wide', 1920, 2.4], ['wide', 2880, 2.4], ['wide', 3840, 2.4], ['tall', 780, 2.2], ['tall', 1170, 2.2], ['tall', 1560, 2.2], ['tall', 1920, 2.2]]) JOBS.push({ dir: 't', w, h: Math.round(w / asp), webp: path.join(ROOT, `public/art/think-${shape}-${w}.webp`), quality: 86 });

// the page bands (direction k): every family in both moods, each width painted natively (3:1)
export const BAND_WIDTHS = [780, 1280, 1920, 2880];
export const bandJobs = (families, moods = ['day', 'stage']) => families.flatMap((family) => moods.flatMap((mood) => [['m', ''], ['n', '-n'], ['w', '-w']].flatMap(([cls, tag]) => (cls === 'm' ? BAND_WIDTHS : [1280, 1920]).map((w) => ({ dir: 'k', family, mood, cls, w, h: Math.round(w / 3), webp: path.join(ROOT, `public/art/band-${family}-${mood}${tag}-${w}.webp`), quality: 86 })))));

async function serve() {
  const server = http.createServer(async (req, res) => {
    const f = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    const s = f.startsWith(ROOT) ? await stat(f).catch(() => null) : null;
    if (!s?.isFile()) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(f));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { server, origin: `http://127.0.0.1:${server.address().port}` };
}

async function withPage(fn) {
  await generate();
  const { server, origin } = await serve();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await (await browser.newContext({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 })).newPage();
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`  [page ${m.type()}] ${m.text()}`); });
    page.on('pageerror', (e) => console.log(`  [page error] ${e.message}`));
    await page.goto(origin + '/tools/paint/hero.html');
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
    return await fn(page);
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
}

export async function paint(jobs) {
  await withPage(async (page) => {
    for (const job of jobs) {
      await page.setViewportSize({ width: job.w, height: job.h });
      await page.evaluate((j) => window.paint(j), job);
      await page.waitForTimeout(120);
      const png = await page.locator('#c').screenshot({ type: 'png' });
      const outs = [];
      if (job.png) { await mkdir(path.dirname(job.png), { recursive: true }); await writeFile(job.png, png); outs.push(path.relative(ROOT, job.png)); }
      if (job.webp) {
        const buf = await sharp(png).webp({ quality: job.quality ?? 86, effort: 6, smartSubsample: true }).toBuffer();
        await writeFile(job.webp, buf);
        outs.push(`${path.relative(ROOT, job.webp)} ${(buf.length / 1024).toFixed(0)} KB`);
      }
      console.log(`${job.dir}${job.family ? ' ' + job.family + ' ' + job.mood : ''} ${job.w}x${job.h}: ${outs.join(', ')}`);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const get = (k) => (a.includes(`--${k}`) ? a[a.indexOf(`--${k}`) + 1] : undefined);
  if (a.includes('--cost')) {
    await withPage(async (page) => {
      for (const dir of ['a', 'b', 'c', 't', 'k']) for (const [w, h] of [[3840, 1600], [1920, 800]]) {
        const r = await page.evaluate(([j, n]) => window.cost(j, n), [{ dir, w, h }, 120]);
        console.log(`${dir} ${w}x${h}: median ${r.median.toFixed(2)} ms, p95 ${r.p95.toFixed(2)} ms, max ${r.max.toFixed(2)} ms`);
      }
    });
  } else if (get('bands') && !get('out')) {
    await paint(bandJobs(get('bands').split(','), get('mood') ? [get('mood')] : undefined));
  } else if (get('out')) {
    const [w, h] = (get('size') || '1920x800').split('x').map(Number);
    await paint([{ dir: get('dir') || 'a', family: get('family'), mood: get('mood'), cls: get('cls'), w, h, time: get('time') ? +get('time') : undefined, png: path.resolve(get('out')) }]);
  } else await paint(a.includes('--think') ? JOBS.filter((j) => j.dir === 't') : JOBS);
}
