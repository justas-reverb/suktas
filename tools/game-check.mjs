/**
 * The games' score and full-screen frame (src/lib/gameScore.js, src/components/GameShell.astro).
 *
 *   node tools/game-check.mjs --self-test      the score's arithmetic; no browser
 *   npm run build && node tools/game-check.mjs      the arithmetic, then the frame in the built site, in the installed Chrome
 *   node tools/game-check.mjs --root <dir>     on another copy of the build
 *
 * tools/test-gates.mjs --browser breaks the built frame on purpose and checks this goes red. Exits 1 if any case fails.
 */
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { newRun, choose, ending, euros } from '../src/lib/gameScore.js';

function selfTest() {
  const r = newRun(2400);
  assert.equal(r.left, 2400, 'a run opens with the whole sum');
  assert.equal(ending(r), 'all', 'an untouched run is the first ending');
  assert.equal(choose(r, 'rytas', 30), true, 'the first choice in a step counts');
  assert.equal(r.left, 2370, 'a choice takes its cost');
  assert.equal(choose(r, 'rytas', 15), false, 'a later choice in the step does not count');
  assert.equal(r.left, 2370, 'a later choice costs nothing');
  assert.equal(ending(r), 'some', 'the smallest loss is the middle ending');
  choose(r, 'pietus', 0);
  assert.equal(r.left, 2370, 'a safe move costs nothing');
  assert.equal(r.picks.size, 2, 'a safe move still answers its step');

  assert.equal(ending({ start: 2400, left: 1200 }), 'some', 'exactly half left is still the middle ending');
  assert.equal(ending({ start: 2400, left: 1199 }), 'little', 'under half is the last ending');
  const worst = newRun(2400);
  for (const [s, c] of [['rytas', 30], ['pietus', 1000], ['popiete', 600], ['vakaras', 400]]) choose(worst, s, c);
  assert.equal(worst.left, 370, 'every trap in Diena su telefonu leaves 370 €');
  assert.equal(ending(worst), 'little');
  const over = newRun(100);
  choose(over, 'a', 400);
  assert.equal(over.left, 0, 'the money left never goes below zero');

  const fresh = newRun(2400);
  assert.equal(fresh.picks.size, 0, 'a new run forgets the last');
  assert.equal(euros(2400), '2\u00a0400\u00a0€');
  assert.equal(euros(370), '370\u00a0€');
  assert.equal(euros(0), '0\u00a0€');
  assert.equal(euros(1000000), '1\u00a0000\u00a0000\u00a0€');

  const here = path.dirname(fileURLToPath(import.meta.url));
  for (const f of ['../src/lib/gameScore.js', '../src/components/GameShell.astro'])
    assert.doesNotMatch(readFileSync(path.join(here, f), 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''), /\bDate\b|performance\.|setTimeout|setInterval/, `${f}: the score never depends on time`);
  console.log('game score: self-test passed');
}

selfTest();
if (process.argv.includes('--self-test')) process.exit(0);

const { chromium } = await import('playwright-core');
const argv = process.argv.slice(2);
const ROOT = path.resolve(argv.includes('--root') ? argv[argv.indexOf('--root') + 1] : 'dist');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
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
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;
const GAME = '/treniruote/diena-su-telefonu/';
const HUB = '/treniruote/';

let failures = 0;
const say = (ok, name, why = '') => { if (!ok) failures++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !why ? '' : `: ${why}`}`); };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const outside = [];
async function open(size = { width: 1440, height: 900 }, opts = {}) {
  const ctx = await browser.newContext({ viewport: size, ...opts });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console ${m.text()}`); });
  page.on('request', (r) => { if (!r.url().startsWith(BASE) && !r.url().startsWith('data:')) outside.push(r.url()); });
  await page.addInitScript(() => document.addEventListener('securitypolicyviolation', (e) => console.error(`CSP refused ${e.blockedURI} (${e.violatedDirective})`)));
  return { ctx, page };
}

const sumOf = async (page) => (await page.locator('[data-gs-sum]').textContent()).replace(/\s/g, ' ');
const isOpen = (page) => page.evaluate(() => document.querySelector('dialog[data-game-shell]').open);
const closed = (page) => page.waitForFunction(() => !document.querySelector('dialog[data-game-shell]').open, null, { timeout: 3000 }).then(() => true, () => false);
const focused = (page, sel) => page.evaluate((s) => document.activeElement?.matches(s) ?? false, sel);
const opener = (page) => page.locator('[data-game-open]');
const nextBtn = (page) => page.locator('[data-gs-next]');
async function start(page) { await page.goto(BASE + GAME); await opener(page).click(); await page.waitForTimeout(260); }
async function pick(page, want) {
  const costs = await page.locator('.gs .opt').evaluateAll((o) => o.map((b) => Number(b.dataset.cost)));
  const k = want === 'trap' ? costs.indexOf(Math.max(...costs)) : want === 'safe' ? costs.indexOf(0) : want;
  await page.locator('.gs .opt').nth(k).click();
}
async function play(page, wants) { for (const w of wants) { await pick(page, w); await nextBtn(page).click(); } }
const verdict = (page) => page.locator('[data-verdict]:not([hidden])').getAttribute('data-verdict');
const lostRows = (page) => page.locator('[data-gs-lostlist] li').count();
const hue = (c) => {
  const [r, g, b, a = 1] = c.match(/[\d.]+/g).map(Number);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, s = mx ? d / mx : 0;
  const h = !d ? 0 : mx === r ? ((g - b) / d + 6) % 6 * 60 : mx === g ? ((b - r) / d + 2) * 60 : ((r - g) / d + 4) * 60;
  return { h, s, a };
};
const redOrGreen = ({ h, s, a }) => a > 0.05 && s > 0.25 && (h < 25 || h > 335 || (h > 85 && h < 165));

try {
  // Opening, the first choice, focus, history
  {
    const { ctx, page } = await open();
    await page.goto(BASE + HUB);
    await page.goto(BASE + GAME);
    say(await opener(page).isVisible(), 'with JavaScript the opener is on the page');
    say(!(await isOpen(page)), 'the frame is closed until asked for');
    const baseLen = await page.evaluate(() => history.length);
    await opener(page).click();
    await page.waitForTimeout(260);
    say(await page.evaluate(() => document.querySelector('dialog[data-game-shell]').matches(':modal')), 'the opener opens a modal dialog');
    say(await page.evaluate(() => { const r = document.querySelector('dialog[data-game-shell]').getBoundingClientRect(); return r.x === 0 && r.y === 0 && r.width === innerWidth && r.height === innerHeight; }), 'the frame fills the screen');
    say(await focused(page, '[data-gs-title]'), 'focus starts on the step heading');
    say(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY === 'hidden'), 'the page behind does not scroll');
    say(await page.evaluate((n) => history.length === n + 1, baseLen), 'one history entry on open');
    say(await page.locator('[data-gs-nextbar]').isHidden(), 'no next button before a choice');
    await page.evaluate(() => document.querySelector('[data-gs-next]').click());
    say((await page.locator('[data-gs-n]').textContent()) === '1', 'a step cannot be skipped without a choice');
    say(await page.locator('.gs :is(input,textarea,select,form,[contenteditable])').count() === 0, 'nothing typed: no form or input in the frame');
    say(await page.locator('.gs [data-round]').count() === 0, "the page's score does not count the frame's presses (no data-round inside)");

    const tabbed = [];
    for (let i = 0; i < 10; i++) { await page.keyboard.press('Tab'); tabbed.push(await page.evaluate(() => { const a = document.activeElement; return !a || a === document.body || !!a.closest('dialog[data-game-shell]'); })); }
    say(tabbed.every(Boolean), 'Tab stays inside the frame');

    await pick(page, 0);
    await page.waitForTimeout(120);
    say(await sumOf(page) === '2 370 €', 'the first choice takes its cost', await sumOf(page));
    say(await focused(page, '[data-gs-ansh]'), 'focus moves to the answer heading');
    say(await nextBtn(page).isVisible(), 'the next button comes after a choice');
    say(await page.locator('[data-gs-live]').textContent().then((t) => t.replace(/\s/g, ' ').endsWith('2 370 €')), 'the new sum is announced');
    await pick(page, 1);
    await page.waitForTimeout(80);
    say(await sumOf(page) === '2 370 €', 'a second choice in the step costs nothing', await sumOf(page));
    say(await page.locator('[data-gs-nochange]').isVisible(), 'and says it changed nothing');
    say(await page.locator('[data-gs-taken-lost]').isHidden() && await page.locator('[data-gs-taken-none]').isHidden(), 'and does not show a loss again');

    const colours = await page.evaluate(() => [...document.querySelectorAll('.gs .opt, .gs__sum, [data-gs-amt]')].flatMap((e) => { const c = getComputedStyle(e); return [c.color, c.backgroundColor, c.borderTopColor, ...(c.boxShadow.match(/rgba?\([^)]*\)/g) ?? [])]; }));
    say(!colours.map(hue).some(redOrGreen), 'no red or green on the choices or the sums', colours.find((c) => redOrGreen(hue(c))));

    await nextBtn(page).click();
    await page.waitForTimeout(80);
    say((await page.locator('[data-gs-n]').textContent()) === '2', 'the next button moves one step');
    say(await focused(page, '[data-gs-title]'), 'focus returns to the new step heading');
    say(await sumOf(page) === '2 370 €', 'the sum carries over');
    say(await page.locator('[data-gs-nextbar]').isHidden(), 'next is hidden again on the new step');

    await page.keyboard.press('Escape');
    say(await closed(page), 'Esc closes the frame');
    say(await focused(page, '[data-game-open]'), 'focus returns to the opener');
    say(new URL(page.url()).pathname === GAME, 'Esc stays on the page');
    await opener(page).click();
    await page.waitForTimeout(200);
    say(await sumOf(page) === '2 370 €' && (await page.locator('[data-gs-n]').textContent()) === '2', 'reopening resumes the run in memory');
    await page.keyboard.press('Escape');
    await closed(page);
    await opener(page).click();
    await page.waitForTimeout(200);
    say(await page.evaluate((n) => history.length === n + 1, baseLen), 'one history entry, however often it opens');
    await page.goBack();
    say(await closed(page), 'Back closes the frame');
    say(new URL(page.url()).pathname === GAME, 'Back stays on the game page');
    await page.goBack();
    await page.waitForURL(`**${HUB}`, { timeout: 3000 }).catch(() => {});
    say(new URL(page.url()).pathname === HUB, 'one more Back leaves the page', page.url());
    await page.goto(BASE + GAME);
    await opener(page).click();
    await page.locator('[data-gs-close]').click();
    say(await closed(page), 'Uždaryk closes the frame');
    await ctx.close();
  }

  // The stamp on every step, the endings, playing again, nothing stored
  {
    const { ctx, page } = await open();
    await start(page);
    const pageScore = () => page.locator('[data-score] .tr-score__line').textContent();
    const scoreBefore = await pageScore();
    const bad = [];
    for (let i = 0; i < 4; i++) {
      const s = await page.evaluate(() => [...document.querySelectorAll('.gs .mock')].map((m) => { const t = m.querySelector('.stamp'); const r = t?.getBoundingClientRect(); return !!t && t.textContent.includes('MOKOMASIS PAVYZDYS') && r.width > 0 && r.height > 0 && getComputedStyle(t).visibility !== 'hidden' && getComputedStyle(t).display !== 'none'; }));
      if (!s.length || !s.every(Boolean)) bad.push(i + 1);
      await pick(page, 'trap');
      if (i < 3) await nextBtn(page).click();
    }
    say(!bad.length, 'every mock-up in the frame is stamped MOKOMASIS PAVYZDYS', `steps ${bad}`);
    await nextBtn(page).click();
    await page.waitForTimeout(60);
    say((await page.locator('[data-gs-endsum]').textContent()).replace(/\s/g, ' ') === '370 €', 'every trap ends on 370 €');
    say(await verdict(page) === 'little', 'under half left is the last ending', await verdict(page));
    say(await lostRows(page) === 4, 'all four losses are listed', String(await lostRows(page)));
    say(await focused(page, '[data-gs-endh]'), 'focus moves to the end heading');
    say(await page.evaluate(() => [...document.querySelectorAll('[data-gs-lostlist] a')].every((a) => a.getAttribute('href').startsWith('/scenarijai/'))), 'each loss links to its scenario');

    await page.locator('[data-gs-again]').click();
    await page.waitForTimeout(60);
    say(await sumOf(page) === '2 400 €' && (await page.locator('[data-gs-n]').textContent()) === '1', 'playing again starts over');
    await play(page, ['safe', 'safe', 'safe', 'safe']);
    await page.waitForTimeout(60);
    say(await verdict(page) === 'all', 'every safe move is the first ending', await verdict(page));
    say(await page.locator('[data-gs-lost]').isHidden(), 'and no list of losses');

    await page.locator('[data-gs-again]').click();
    await play(page, [0, 'safe', 'safe', 'safe']);
    await page.waitForTimeout(60);
    say(await verdict(page) === 'some', 'one small loss is the middle ending', await verdict(page));
    say(await lostRows(page) === 1, 'and one row', String(await lostRows(page)));

    const stored = await page.evaluate(() => ({ l: Object.keys(localStorage), s: Object.keys(sessionStorage), c: document.cookie }));
    say(!stored.l.length && !stored.s.length && !stored.c, 'nothing stored in the browser', JSON.stringify(stored));
    say(await pageScore() === scoreBefore, "the page's own score stayed out of it", await pageScore());
    await ctx.close();
  }

  // A phone: the sheet
  for (const [w, h] of [[390, 844], [360, 740], [320, 640]]) {
    const { ctx, page } = await open({ width: w, height: h }, { deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    await start(page);
    say(await page.locator('[data-gs-side]').isHidden(), `${w}x${h}: the sheet is not drawn before a choice`);
    await pick(page, 0);
    await page.waitForTimeout(330);
    say(await page.locator('[data-gs-side]').isVisible() && await page.locator('[data-gs-handle]').getAttribute('aria-expanded') === 'true', `${w}x${h}: a choice opens the sheet`);
    say(await page.evaluate(() => { const m = document.querySelector('.gs__text .pop__move').getBoundingClientRect(), b = document.querySelector('.gs__sidebody').getBoundingClientRect(); return m.top < b.bottom - 40; }), `${w}x${h}: the move is in sight in the open sheet`);
    say(await nextBtn(page).isVisible(), `${w}x${h}: the next button is on the sheet`);
    await page.locator('[data-gs-handle]').click();
    await page.waitForTimeout(120);
    say(await page.locator('[data-gs-handle]').getAttribute('aria-expanded') === 'false' && await page.locator('[data-gs-sidebody]').isHidden(), `${w}x${h}: the sheet folds`);
    const reach = await page.evaluate(() => [...document.querySelectorAll('.gs .opt')].map((o) => { o.scrollIntoView({ block: 'nearest' }); const r = o.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return o === e || o.contains(e); }));
    say(reach.every(Boolean), `${w}x${h}: folded, every choice can be pressed`, JSON.stringify(reach));
    await page.locator('[data-gs-handle]').click();
    await page.waitForTimeout(120);
    say(await page.locator('[data-gs-sidebody]').isVisible(), `${w}x${h}: and opens again`);
    await ctx.close();
  }

  // Sizes: nothing runs sideways
  for (const [w, h] of [[320, 640], [390, 844], [844, 390], [768, 1024], [2560, 1440]]) {
    const { ctx, page } = await open({ width: w, height: h });
    await start(page);
    const wide = () => page.evaluate(() => [...document.querySelectorAll('.gs, .gs__play, .gs__main, .gs__dock, .gs__sidebody, .gs__end, .gs__bar')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => `${e.className} ${e.scrollWidth}>${e.clientWidth}`));
    const a = await wide();
    await pick(page, 'trap');
    await page.waitForTimeout(280);
    const b = await wide();
    say(!a.length && !b.length, `nothing runs sideways at ${w}x${h}`, [...a, ...b].join('; '));
    await ctx.close();
  }

  // Reduced motion
  {
    const { ctx, page } = await open({ width: 390, height: 844 }, { reducedMotion: 'reduce', hasTouch: true });
    await start(page);
    say(await page.evaluate(() => getComputedStyle(document.querySelector('.gs')).transitionDuration.split(',').every((d) => parseFloat(d) < 0.001)), 'reduced motion: the frame opens without a transition');
    await pick(page, 'trap');
    const anim = await page.evaluate(() => ['[data-gs-side]', '[data-gs-sum]'].map((s) => getComputedStyle(document.querySelector(s)).animationName));
    say(anim.every((a) => a === 'none'), 'reduced motion: the sheet and the sum do not animate', anim.join());
    say(await sumOf(page) !== '2 400 €', 'reduced motion: the game still plays');
    await ctx.close();
  }

  // JavaScript off, and a browser with no showModal
  {
    const { ctx, page } = await open({ width: 1280, height: 800 }, { javaScriptEnabled: false });
    await page.goto(BASE + GAME);
    say(!(await page.locator('[data-game-start]').isVisible()) && !(await opener(page).isVisible()), 'JavaScript off: no opener');
    const n = { steps: await page.locator('section[data-step]').count(), opts: await page.locator('section[data-step] .opt[popovertarget]').count(), pops: await page.locator('.answers .pop[popover], section[data-step] .pop[popover]').count() };
    say(n.steps === 4 && n.opts >= 8 && n.pops === n.opts, 'JavaScript off: the page is whole', JSON.stringify(n));
    await page.locator('section[data-step] .opt').first().click();
    await page.waitForTimeout(150);
    say(await page.locator('.pop:popover-open').count() === 1, 'JavaScript off: a choice opens its answer as a popover');
    await ctx.close();
  }
  {
    const { ctx, page } = await open();
    await page.addInitScript(() => { delete HTMLDialogElement.prototype.showModal; });
    await page.goto(BASE + GAME);
    await page.waitForTimeout(200);
    say(!(await opener(page).isVisible()), 'no showModal: no opener, the page stays the popover version');
    await ctx.close();
  }

  say(!errors.length, 'no page error, no console error, nothing the CSP refused', errors.slice(0, 4).join('; '));
  say(!outside.length, 'nothing requested from another server', outside.slice(0, 3).join('; '));
} catch (e) {
  say(false, 'the check ran to the end', e.message.split('\n')[0]);
} finally {
  await browser.close();
  server.close();
}
console.log(failures ? `${failures} case(s) failed` : 'game frame: every case passed');
process.exit(failures ? 1 : 0);
