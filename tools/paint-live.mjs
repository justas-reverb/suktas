/**
 * Does the live hero do what design/round-2/NOTES.md says it does? Each line below can fail.
 *
 *   node tools/paint-live.mjs
 *
 * Against dist/ (run `npm run build` first), in the installed Chrome:
 *   - it draws about 30 frames a second when idle;
 *   - it stops drawing when the hero is scrolled out of view, and when the tab is hidden, and
 *     draws again when they come back;
 *   - brushing the snow with the pointer changes the picture where the pointer went;
 *   - with prefers-reduced-motion it never starts, and the still stays;
 *   - with no WebGL2 it never starts, the still stays, and nothing throws;
 *   - when the context is lost the canvas is dropped and the still shows; when it is restored
 *     the canvas comes back;
 *   - with the data-saver switch on it never starts;
 *   - on a slow renderer that WebGL still allows (simulated: every draw stalls the page) it steps
 *     down, resolution first, then the lite shader, and ends at the still;
 *   - on Chrome's software renderer it is refused WebGL (failIfMajorPerformanceCaveat), so the still
 *     stays and nothing freezes; and if a software renderer is let through anyway, the art gives up in
 *     its first frames, not after twelve seconds;
 *   - it waits for the load event, and has the driver compile the shader off the page's thread.
 * It counts draw calls by wrapping drawArrays, which the page itself never touches.
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
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(await readFile(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

let failed = 0;
const check = (ok, what, detail = '') => { if (!ok) failed++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}${detail ? ' (' + detail + ')' : ''}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const COUNT = `
  window.__draws = 0; window.__hidden = false; window.__errors = [];
  Object.defineProperty(document, 'hidden', { get: () => window.__hidden });
  const w = WebGL2RenderingContext.prototype.drawArrays;
  WebGL2RenderingContext.prototype.drawArrays = function (...a) { window.__draws++; return w.apply(this, a); };
  addEventListener('error', (e) => window.__errors.push(String(e.message)));
`;

/* A renderer that is slow but allowed: each draw holds the page for `ms`, as a weak GPU's driver does. */
const SPIN = (ms) => `
  { const d0 = WebGL2RenderingContext.prototype.drawArrays;
    WebGL2RenderingContext.prototype.drawArrays = function (...a) { const t = performance.now(); while (performance.now() - t < ${ms}); return d0.apply(this, a); }; }
`;
/* The page asks for failIfMajorPerformanceCaveat; this stands in for a browser that lets software WebGL through. */
const NO_CAVEAT = `
  { const g = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (t, a) { return g.call(this, t, a && a.failIfMajorPerformanceCaveat ? { ...a, failIfMajorPerformanceCaveat: false } : a); }; }
`;
/* Long tasks (over 50 ms) on the page's thread, with when they started. */
const LONGTASKS = `
  window.__lt = [];
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: true });
`;
const worstTask = (page) => page.evaluate(() => Math.max(0, ...window.__lt.map((x) => x[1])));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
async function open(opts = {}, init = '', before = null) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'lt-LT', ...opts });
  await ctx.addInitScript(COUNT + init);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  if (before) await before(page);
  await page.goto(origin + '/', { waitUntil: 'load' });
  return { ctx, page, errors };
}
const draws = (page) => page.evaluate(() => window.__draws);
const rate = async (page, ms = 2000) => { const a = await draws(page); await sleep(ms); return ((await draws(page)) - a) / (ms / 1000); };

try {
  // 1 idle rate, pause when scrolled away, pause when hidden
  {
    const { ctx, page, errors } = await open();
    await sleep(1500);
    const idle = await rate(page);
    check(idle > 15 && idle < 45, 'idle: about 30 frames a second', `${idle.toFixed(1)} fps`);
    check(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live')), 'the first frame marks the hero live');
    await page.evaluate(() => scrollTo(0, 3000));
    await sleep(400);
    const off = await rate(page, 1500);
    check(off < 2, 'scrolled out of view: it stops', `${off.toFixed(1)} fps`);
    await page.evaluate(() => scrollTo(0, 0));
    await sleep(400);
    const back = await rate(page, 1500);
    check(back > 15, 'scrolled back: it draws again', `${back.toFixed(1)} fps`);
    await page.evaluate(() => { window.__hidden = true; document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(400);
    const hid = await rate(page, 1500);
    check(hid < 2, 'tab hidden: it stops', `${hid.toFixed(1)} fps`);
    await page.evaluate(() => { window.__hidden = false; document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(400);
    check((await rate(page, 1500)) > 15, 'tab shown again: it draws again');
    check(errors.length === 0, 'no uncaught errors', errors.join('; '));
    await ctx.close();
  }

  // 2 brushing the snow fills the prints under the pointer, and they come back. The twinkle of
  // the glints changes pixels everywhere all the time, so the proof is not "the picture changed"
  // but a count of the dark-blue pixels the prints are made of (the pits), before, during, after.
  {
    const { ctx, page } = await open();
    await sleep(2500);
    const region = { x: 330, y: 560, width: 460, height: 300 };
    const pits = async () => {
      const { data } = await sharp(await page.screenshot({ type: 'png', clip: region })).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      let n = 0;
      for (let i = 0; i < data.length; i += 3) if (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2] < 130 && data[i + 2] > data[i] + 20) n++;
      return n;
    };
    const before = await pits();
    await page.mouse.move(330, 840);
    for (let i = 0; i <= 24; i++) { await page.mouse.move(330 + i * 18, 840 - i * 11); await sleep(16); }
    await sleep(100);
    const during = await pits();
    check(during <= before * 0.88, 'brushing fills the prints under the pointer', `${before} pit pixels before, ${during} during`);
    check(await page.evaluate(() => document.querySelector('.hero').classList.contains('has-wiped')), 'the hint hides itself after a brush');
    await sleep(3800);
    const after = await pits();
    check(after >= before * 0.9, 'and the prints come back after a few seconds', `${after} after`);
    await ctx.close();
  }

  // 3 reduced motion: never starts
  {
    const { ctx, page, errors } = await open({ reducedMotion: 'reduce' });
    await sleep(1500);
    check((await draws(page)) === 0, 'prefers-reduced-motion: no frame is ever drawn');
    check(!(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live'))), 'and the hero is not marked live');
    check(await page.evaluate(() => { const i = document.querySelector('.hero__art img'); return i.complete && i.naturalWidth > 0; }), 'and the still is there');
    check(errors.length === 0, 'no uncaught errors', errors.join('; '));
    await ctx.close();
  }

  // 4 data saver
  {
    const { ctx, page } = await open({}, `Object.defineProperty(navigator, 'connection', { value: { saveData: true } });`);
    await sleep(1500);
    check((await draws(page)) === 0, 'data saver on: no frame is ever drawn');
    await ctx.close();
  }

  // 5 no WebGL2
  {
    const { ctx, page, errors } = await open({}, `const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { return t === 'webgl2' || t === 'webgl' ? null : g.call(this, t, ...a); };`);
    await sleep(1500);
    check(!(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live'))), 'no WebGL2: the hero is not marked live');
    check(await page.evaluate(() => { const i = document.querySelector('.hero__art img'); return i.complete && i.naturalWidth > 0 && getComputedStyle(document.querySelector('.hero__art canvas')).opacity === '0'; }), 'and the still shows, the canvas stays clear');
    check(errors.length === 0, 'no uncaught errors', errors.join('; '));
    await ctx.close();
  }

  // 6 context lost and restored
  {
    const { ctx, page } = await open();
    await sleep(1500);
    await page.evaluate(() => { const c = document.querySelector('.hero canvas'); window.__lose = c.getContext('webgl2').getExtension('WEBGL_lose_context'); window.__lose.loseContext(); });
    await sleep(600);
    check(!(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live'))), 'context lost: the canvas is dropped');
    const drawsLost = await draws(page);
    await sleep(800);
    check((await draws(page)) === drawsLost, 'and nothing is drawn');
    await page.evaluate(() => window.__lose.restoreContext());
    await sleep(1500);
    check(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live')), 'context restored: the canvas comes back');
    await ctx.close();
  }
  // 7 a slow renderer that WebGL still allows: every draw holds the page for 45 ms
  {
    const { ctx, page, errors } = await open({ deviceScaleFactor: 1.5 }, SPIN(45));
    const widths = [];
    let ended = false;
    for (let i = 0; i < 45 && !ended; i++) {
      await sleep(1000);
      const st = await page.evaluate(() => ({ live: document.querySelector('.hero').classList.contains('is-live'), w: document.querySelector('.hero canvas').width }));
      if (st.live) widths.push(st.w);
      if (!st.live && widths.length) ended = true;
    }
    check(widths.length > 0 && Math.min(...widths) < Math.max(...widths), 'slow renderer: the canvas gets smaller', widths.length ? widths[0] + ' to ' + Math.min(...widths) + ' px wide' : 'it never started');
    check(ended, 'and the art ends at the still');
    check(await page.evaluate(() => { const i = document.querySelector('.hero__art img'); return i.complete && i.naturalWidth > 0; }), 'which is there');
    check(errors.length === 0, 'no uncaught errors', errors.join('; '));
    await ctx.close();
  }

  // 8 Chrome's software renderer, as shipped: WebGL is refused, the still stays, nothing freezes
  {
    const slow = await chromium.launch({ channel: 'chrome', headless: true, args: ['--disable-gpu', '--enable-unsafe-swiftshader'] });
    try {
      const ctx = await slow.newContext({ viewport: { width: 2560, height: 1440 }, deviceScaleFactor: 1.5, locale: 'lt-LT' });
      await ctx.addInitScript(COUNT + LONGTASKS);
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.goto(origin + '/', { waitUntil: 'load' });
      await sleep(5000);
      check(!(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live'))), 'software renderer: the art never starts');
      check((await draws(page)) === 0, 'and no frame is drawn');
      check(await page.evaluate(() => { const i = document.querySelector('.hero__art img'); return i.complete && i.naturalWidth > 0; }), 'and the still shows');
      const worst = await worstTask(page);
      check(worst < 300, 'and the page is never held up', `longest task ${worst} ms`);
      check(errors.length === 0, 'no uncaught errors', errors.join('; '));
      await ctx.close();

      // 9 the same renderer, if the browser lets it through: it gives up in its first frames
      const ctx2 = await slow.newContext({ viewport: { width: 2560, height: 1440 }, deviceScaleFactor: 1.5, locale: 'lt-LT' });
      await ctx2.addInitScript(COUNT + LONGTASKS + NO_CAVEAT);
      const page2 = await ctx2.newPage();
      await page2.goto(origin + '/', { waitUntil: 'load' });
      await sleep(8000);
      const d = await draws(page2);
      check(d >= 1 && d <= 6, 'a software renderer let through: gives up in its first frames', `${d} draws`);
      check(!(await page2.evaluate(() => document.querySelector('.hero').classList.contains('is-live'))), 'and the hero is not live');
      const worst2 = await worstTask(page2);
      check(worst2 < 3000, 'and the page was held up for no more than a few seconds', `longest task ${worst2} ms`);
      await sleep(2000);
      check((await draws(page2)) === d, 'and it stays given up');
      await ctx2.close();
    } finally {
      await slow.close();
    }
  }

  // 10 it waits for the page: the hero's picture is held back for 2.5 s, so the load event comes late,
  // and nothing may be drawn before it. A page that started at once would have drawn by then.
  {
    const { ctx, page } = await open({}, `window.__atLoad = -1; addEventListener('load', () => { window.__atLoad = window.__draws; });`,
      (p) => p.route(/\/art\/hero-(wide|tall)-\d+\.webp/, async (route) => { await sleep(2500); await route.continue(); }));
    await sleep(2500);
    const atLoad = await page.evaluate(() => window.__atLoad);
    check(atLoad === 0 && (await draws(page)) > 0, 'nothing is drawn before the page has loaded, and then it starts', `${atLoad} draws at load, ${await draws(page)} after`);
    await ctx.close();
  }

  // 11 the driver compiles the shader off the page's thread, and the page asks it when it is done
  {
    const { ctx, page } = await open({}, `
      window.__ext = []; window.__polls = 0; window.__caveat = null;
      const ge = WebGL2RenderingContext.prototype.getExtension;
      WebGL2RenderingContext.prototype.getExtension = function (n) { window.__ext.push(n); return ge.call(this, n); };
      const gp = WebGL2RenderingContext.prototype.getProgramParameter;
      WebGL2RenderingContext.prototype.getProgramParameter = function (p, n) { if (n === 37297) window.__polls++; return gp.call(this, p, n); };
      const gc = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (t, a) { if (t === 'webgl2') window.__caveat = a && a.failIfMajorPerformanceCaveat; return gc.call(this, t, a); };
    `);
    await sleep(2500);
    const st = await page.evaluate(() => ({ ext: window.__ext.includes('KHR_parallel_shader_compile'), polls: window.__polls, caveat: window.__caveat, live: document.querySelector('.hero').classList.contains('is-live') }));
    check(st.ext && st.polls >= 1 && st.live, 'the shader is compiled in parallel and its completion polled', `extension ${st.ext}, ${st.polls} polls`);
    check(st.caveat === true, 'WebGL is asked for with failIfMajorPerformanceCaveat');
    await ctx.close();
  }

  // 12 a shader the driver refuses: the still stays, the page throws nothing, and nothing is drawn
  {
    const { ctx, page, errors } = await open({}, `
      const ss = WebGL2RenderingContext.prototype.shaderSource;
      WebGL2RenderingContext.prototype.shaderSource = function (sh, src) { return ss.call(this, sh, src.includes('uRes') ? src.replace('void main()', 'void main() { THIS IS NOT GLSL } void unused()') : src); };
    `);
    await sleep(2500);
    check(!(await page.evaluate(() => document.querySelector('.hero').classList.contains('is-live'))), 'a shader the driver refuses: the hero is not live');
    check((await draws(page)) === 0, 'and nothing is drawn');
    check(await page.evaluate(() => { const i = document.querySelector('.hero__art img'); return i.complete && i.naturalWidth > 0 && getComputedStyle(document.querySelector('.hero__art canvas')).opacity === '0'; }), 'and the still shows, the canvas stays clear');
    check(errors.length === 0, 'no uncaught errors', errors.join('; '));
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(failed ? `${failed} check(s) failed` : 'all live checks passed');
process.exit(failed ? 1 : 0);
