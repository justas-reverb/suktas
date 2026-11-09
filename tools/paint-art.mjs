/**
 * Paints the art's stills: a Playwright screenshot of the canvas in the installed Chrome.
 *
 * The live hero (src/art/hero.js) never reads its own pixels back, because privacy browsers
 * flag that as fingerprinting. So the stills, which are the hero for everyone who has no
 * JavaScript or no WebGL, are made here instead: the same shader, the same presets, run in
 * a separate page (tools/paint/index.html) and photographed from outside. `channel:
 * 'chrome'` renders WebGL on the RTX 5080; Playwright's own headless shell would use
 * SwiftShader on the CPU.
 *
 *   node tools/paint-art.mjs --shot wide --mood morning --size 1920x1080 --out design/x.png
 *   node tools/paint-art.mjs --shot wide --mood morning --size 1920x1080 --webp public/art/x.webp
 *   node tools/paint-art.mjs --job hero-wide-1280         one named job from JOBS below
 *   node tools/paint-art.mjs --all                        every named job
 *
 * Options: --time <s> (frozen clock), --fade 1 (bottom edge fades into the page colour),
 * --over '<json>' (preset overrides), --quality <0-100>, --lite.
 */
import http from 'node:http';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { generate } from './paint-shaders.mjs';
import { snakeJob } from './paint/snake-design.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };

/** Named jobs: every still the site ships, so one command repaints them all. Filled in as
 *  the page grows; design/round-2/NOTES.md, design/round-3/NOTES.md and design/round-4/NOTES.md (the
 *  logo) say what each one is for. */
const PUB = path.join(ROOT, 'public');
export const JOBS = {};
const add = (name, job) => { JOBS[name] = { name, ...job }; };

const ART = path.join(PUB, 'art');

/* Per-size numbers for the snake, where the default (tools/paint/snake-design.mjs) does not land on whole
   pixels. The key is the picture's height in pixels, or the use. R is the body's half width in pixels. */
const SNAKE_HINTS = {
  // narrow phones: shown 22 x 24 CSS px; files for 1x, 1.5x, 2x, 3x
  24: { R: 2 }, 36: { R: 3 }, 48: { R: 4 }, 72: { R: 6 },
  // phones: shown 30 x 32
  32: { R: 2.75 }, 64: { R: 5.25 }, 96: { R: 8 },
  // desktop: shown 38 x 40
  40: { R: 3.25 }, 60: { R: 5 }, 80: { R: 6.5 }, 120: { R: 10 },
  // the tab icons sit on bars that may be dark, and the snake is navy and black: a pale soft halo outside it
  // (invisible on a light bar), and the S is drawn smaller to leave room for it
  fav16: { R: 1.5, head: 3.0, jaw: 1.4, tongue: [2.4, 0.5, 0.5, 0.7, -0.08, 0], halo: { w: 1.1, a: 0.9, k: 1.0, col: '#dfe7ff' } },
  fav32: { R: 2.5, halo: { w: 1.8, a: 0.85, k: 1.4, col: '#dfe7ff' } },
  // the home-screen icon: a full square on the dawn sky (a night ground would swallow a dark snake), with room for the
  // phone's rounded corners
  apple: { detail: 1, margin: 22, ground: ['#cbb9ea', '#fbe3c6'] },
  share: { detail: 1, ss: 5 },
};
// The tongue is navy like the rest of the snake. To give it an accent (design/round-6/NOTES.md shows one), set the
// colour here, as '#rrggbb', and run `npm run paint`.
const TONGUE = null;
const snake = (h, w, hint) => snakeJob(h, w, { tongueCol: TONGUE, ...hint });
// the hero, in two compositions: a 16:9 field for wide screens, a 9:16 one for phones
for (const w of [960, 1440, 1920, 2560, 3840]) add(`hero-wide-${w}`, { w, h: Math.round((w * 9) / 16), mood: 'morning', shot: 'wide', over: { fade: 1 }, webp: path.join(ART, `hero-wide-${w}.webp`), quality: 76 });
for (const w of [540, 810, 1080, 1440]) add(`hero-tall-${w}`, { w, h: Math.round((w * 16) / 9), mood: 'morning', shot: 'tall', over: { fade: 1 }, webp: path.join(ART, `hero-tall-${w}.webp`), quality: 76 });
// the same field at three hours: a vista for each level of the guide, each fading at its foot
// into the colour of the block of text below it (site.css: --snow, --dusk, --night)
const VISTAS = {
  // morning, the forest far off; the sky above it fades into the snow-white page above the picture
  'level-1': { mood: 'morning', top: ['#F4F6FC', 0.34], bg: '#F4F6FC', over: { cam: [0.40, 0.02, 0, 0.85], sunAz: 0.12, sunEl: 0.13 } },
  // dusk, the forest nearer
  'level-2': { mood: 'dusk', top: ['#F4F6FC', 0.34], bg: '#D6D0F0', over: { cam: [0.40, -0.04, 0, 0.85], tree: [120, 11, 8, 2.6], sunEl: 0.022, stars: 0.2, trail2: [1.9, 24, -0.55, 0.19], glintDensity: 0.5, glintSize: 1.4 } },
  // night: the sky above the forest goes from dusk lilac down into the dark
  'level-3': { mood: 'night', top: ['#D6D0F0', 0.36], bg: '#14123A', over: { cam: [0.40, -0.08, 0, 0.85], tree: [100, 12, 8, 2.6], sunAz: 0.22, sunEl: 0.55, trail2: [1.9, 24, -0.45, 0.16], glintDensity: 0.25, glintSize: 1.8 } },
  // pristine snow for the promise: the same light, and no trail at all
  'snow': { mood: 'morning', top: ['#F4F6FC', 0.34], bg: '#F4F6FC', over: { cam: [0.40, 0.02, 0, 0.85], sunAz: -0.08, sunEl: 0.12, trail2: [100, 50, 0, 0] } },
  // the foot of the page: night, the trail runs towards the forest and has faded away before it gets there
  'foot': { mood: 'night', top: ['#D6D0F0', 0.36], bg: '#14123A', over: { cam: [0.40, -0.10, 0, 0.85], tree: [90, 12, 7, 2.6], sunAz: -0.25, sunEl: 0.5, trail2: [1.9, 13, 0.1, 0.14], print: [0.022, 0.30, 8.0], glintDensity: 0.25, glintSize: 1.8 } },
};
// Wide screens show a band 3:1 to 4:1 (the page crops it from the top and the foot to keep it near 44% of the
// window), so the 3:1 paintings keep 14% of their height at each end as flat colour: a crop never reaches a fade.
for (const [name, v] of Object.entries(VISTAS)) for (const w of [1200, 2400, 3840]) add(`vista-${name}-${w}`, { w, h: w / 3, mood: v.mood, shot: 'vista', over: { fade: 1, fadeExtent: 0.34, flat: 0.41, bg: v.bg, top: v.top, ...v.over }, webp: path.join(ART, `vista-${name}-${w}.webp`), quality: 74 });
// A phone shows the band 3:2 and whole, so the scene is not small: painted at that shape, at its own sizes.
for (const [name, v] of Object.entries(VISTAS)) for (const w of [780, 1200, 1560]) add(`vista-${name}-phone-${w}`, { w, h: w / 1.5, mood: v.mood, shot: 'vista', over: { fade: 1, fadeExtent: 0.34, flat: 0.15, bg: v.bg, top: v.top, ...v.over }, webp: path.join(ART, `vista-${name}-phone-${w}.webp`), quality: 74 });

// The logo: a snake bent into an S, its tongue out (tools/paint/snake.html). Each size is painted at its
// own pixel size, with its own numbers (tools/paint/snake-design.mjs), never made small from a big one.
// The header shows it 40 px tall on a desktop, 32 on a phone and 24 on the narrowest phones, and each of
// the three has a file for every device pixel ratio the browser may pick from: 1, 1.5, 2 and 3.
const MARKS = [
  ['mark-l', [[40, 38], [60, 57], [80, 76], [120, 114]]],
  ['mark-m', [[32, 30], [48, 45], [64, 60], [96, 90]]],
  ['mark-n', [[24, 22], [36, 33], [48, 44], [72, 66]]],
];
for (const [family, sizes] of MARKS) {
  for (const [h, w] of sizes) {
    add(`${family}-${h}`, { ...snake(h, w, SNAKE_HINTS[h]), png: path.join(ART, `${family}-${h}.png`) });
  }
}
// The favicons, the home-screen icon and the share image are no longer painted here: since 2026-10-25
// they are the PhotoCraft snake (design/logo-round-3/), and the share image is tools/paint-og.mjs.

// the share image: the painting at 1200 x 630 with the name over the sky (its print is a source
// kept in art-src/, which is committed and never deployed)
add('mark-share', { ...snake(236, 221, SNAKE_HINTS.share), png: path.join(ROOT, 'art-src/mark-share.png') });

// step markers and the trail between them (print.html)
// the pit under a step's number is painted dark, so the white digit keeps its contrast (6:1 and over)
for (const w of [112, 208]) add(`marker-${w}`, { kind: 'print', w, h: w, size: 1.5, pad: 1.6, deep: '#1B2678', ao: 0.97, tileAt: [0, 0, 0, 0], tilt: [0.10, 0], png: path.join(PUB, `art/marker-${w}.png`) });
add('trail-tile', { kind: 'print', w: 208, h: 416, size: 0.62, pad: 0.0, tile: true, tileAt: [-0.17, 0.50, 0.17, -0.50], tilt: [0.10, -0.12], png: path.join(PUB, 'art/trail-tile.png') });

function parseArgs(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i].replace(/^--/, '');
    if (['lite', 'all'].includes(k)) o[k] = true;
    else o[k] = argv[++i];
  }
  return o;
}

async function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://x');
      const file = path.join(ROOT, decodeURIComponent(url.pathname));
      if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
      const s = await stat(file).catch(() => null);
      if (!s?.isFile()) { res.writeHead(404).end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(await readFile(file));
    } catch (e) { res.writeHead(500).end(String(e)); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { server, origin: `http://127.0.0.1:${server.address().port}` };
}

export async function paintJobs(jobs) {
  await generate();
  const { server, origin } = await serve();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const ctx = await browser.newContext({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 });
    const pages = {};
    const open = async (kind) => {
      if (pages[kind]) return pages[kind];
      const page = await ctx.newPage();
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`  [page ${m.type()}] ${m.text()}`); });
      page.on('pageerror', (e) => console.log(`  [page error] ${e.message}`));
      await page.goto(origin + ({ print: '/tools/paint/print.html', share: '/tools/paint/share.html', snake: '/tools/paint/snake.html' }[kind] ?? '/tools/paint/index.html'));
      await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
      return (pages[kind] = page);
    };
    for (const job of jobs) {
      const t0 = Date.now();
      const kind = job.kind || 'scene';
      const page = await open(kind);
      await page.setViewportSize({ width: job.w, height: job.h });
      const info = await page.evaluate((j) => (j.kind === 'print' ? window.paintPrint(j) : j.kind === 'snake' ? window.paintSnake(j) : j.kind === 'share' ? window.paintShare(j) : window.paint(j)), job);
      await page.waitForTimeout(120);
      let png = await page.locator(kind === 'share' ? '#card' : '#c').screenshot({ type: 'png' });
      if ((kind === 'print' || kind === 'snake') && !job.ground) {
        /* A canvas screenshot has no alpha, so the print is painted twice, as colour and as
           opacity, and the two are joined into one PNG. */
        await page.evaluate((j) => (j.kind === 'snake' ? window.paintSnake({ ...j, out: 1 }) : window.paintPrint({ ...j, out: 1 })), job);
        await page.waitForTimeout(120);
        const aPng = await page.locator('#c').screenshot({ type: 'png' });
        const col = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        const al = await sharp(aPng).removeAlpha().extractChannel(0).raw().toBuffer();
        const { width, height } = col.info;
        const rgba = Buffer.alloc(width * height * 4);
        for (let i = 0; i < width * height; i++) {
          rgba[i * 4] = col.data[i * 3]; rgba[i * 4 + 1] = col.data[i * 3 + 1]; rgba[i * 4 + 2] = col.data[i * 3 + 2]; rgba[i * 4 + 3] = al[i];
        }
        png = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
      }
      const outs = [];
      if (job.png) { await mkdir(path.dirname(job.png), { recursive: true }); await writeFile(job.png, png); outs.push(`${path.relative(ROOT, job.png)} ${(png.length / 1024).toFixed(0)} KB`); }
      if (job.jpg) {
        await mkdir(path.dirname(job.jpg), { recursive: true });
        const buf = await sharp(png).jpeg({ quality: job.quality ?? 90, mozjpeg: true }).toBuffer();
        await writeFile(job.jpg, buf);
        outs.push(`${path.relative(ROOT, job.jpg)} ${(buf.length / 1024).toFixed(0)} KB`);
      }
      if (job.webp) {
        await mkdir(path.dirname(job.webp), { recursive: true });
        const buf = await sharp(png).webp({ quality: job.quality ?? 80, effort: 6, smartSubsample: true }).toBuffer();
        await writeFile(job.webp, buf);
        outs.push(`${path.relative(ROOT, job.webp)} ${(buf.length / 1024).toFixed(0)} KB`);
      }
      console.log(`${job.w}x${job.h} ${kind === 'print' ? 'print' : job.mood + '/' + job.shot}${info.renderer ? ' on ' + info.renderer.replace(/ANGLE \((.*?),.*/, '$1') : ''}: ${outs.join(', ')} (${Date.now() - t0} ms)`);
    }
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = parseArgs(process.argv.slice(2));
  let jobs;
  if (a.all) jobs = Object.values(JOBS);
  else if (a.job) { if (!JOBS[a.job]) { console.error(`no job ${a.job}`); process.exit(2); } jobs = [JOBS[a.job]]; }
  else {
    const [w, h] = (a.size || '1280x720').split('x').map(Number);
    jobs = [{
      w, h, mood: a.mood || 'morning', shot: a.shot || 'wide', time: +(a.time || 0), lite: !!a.lite,
      over: { ...(a.fade ? { fade: +a.fade } : {}), ...(a.over ? JSON.parse(a.over) : {}) },
      png: a.out ? path.resolve(a.out) : undefined, webp: a.webp ? path.resolve(a.webp) : undefined, quality: a.quality ? +a.quality : undefined,
    }];
  }
  await paintJobs(jobs);
}
