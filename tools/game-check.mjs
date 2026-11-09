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
const OLDER = [
  { path: '/treniruote/banko-paieska/', startText: '2 400', steps: 2, worst: '200', lost: 2, endHeading: 'Sąskaitoje liko', next: '/treniruote/smart-id/' },
  { path: '/treniruote/smart-id/', startText: '5 000', steps: 4, worst: '20', lost: 3, endHeading: 'Sąskaitoje liko', next: '/treniruote/skambutis/' },
];

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
  const costs = await page.locator('.gs [data-cost]').evaluateAll((o) => o.map((b) => Number(b.dataset.cost)));
  const k = want === 'trap' ? costs.indexOf(Math.max(...costs)) : want === 'safe' ? costs.indexOf(0) : want;
  await page.locator('.gs [data-cost]').nth(k).click();
}
async function play(page, wants) { for (const w of wants) { await pick(page, w); await nextBtn(page).click(); } }
const verdict = (page) => page.locator('[data-verdict]:not([hidden])').first().getAttribute('data-verdict');
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
    const reach = await page.evaluate(() => [...document.querySelectorAll('.gs [data-cost]')].map((o) => { o.scrollIntoView({ block: 'nearest' }); const r = o.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return o === e || o.contains(e); }));
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

  // The two older games: the same frame, their mock-ups played in place
  for (const g of OLDER) {
    const G = g.path;
    const here = (page) => page.goto(BASE + G).then(() => opener(page).click()).then(() => page.waitForTimeout(240));
    const n = async (page) => Number(await page.locator('[data-gs-n]').textContent());
    {
      const { ctx, page } = await open();
      await here(page);
      say(await page.evaluate(() => document.querySelector('dialog[data-game-shell]').matches(':modal')), `${G}: the opener opens the frame`);
      say(await sumOf(page) === `${g.startText} €`, `${G}: it starts on the whole sum`, await sumOf(page));
      say(await page.locator('.gs :is(input,textarea,select,form,[contenteditable])').count() === 0, `${G}: nothing typed`);
      say(await page.locator('.gs [data-round]').count() === 0, `${G}: the page's score does not count the frame's presses`);
      const bad = [], ids = [], wrong = [], unwired = [], marks = [];
      for (let i = 1; i <= g.steps; i++) {
        const st = await page.evaluate(() => [...document.querySelectorAll('.gs .mock')].map((m) => { const t = m.querySelector('.stamp'); const r = t?.getBoundingClientRect(); return !!t && t.textContent.includes('MOKOMASIS PAVYZDYS') && r.width > 0 && r.height > 0; }));
        if (!st.length || !st.every(Boolean)) bad.push(i);
        if (await page.locator('.gs .mock :is([id],[popovertarget])').count()) ids.push(i);
        if (!(await page.locator('.gs [data-cost]').count())) unwired.push(i);
        // the answer shown must be the one the page's own button opens
        const label = await page.locator('.gs [data-cost]').first().evaluate((b) => b.textContent.trim());
        const want = await page.evaluate(([l, stepAt]) => {
          const s = [...document.querySelectorAll('[data-step]')][stepAt];
          const b = [...s.querySelectorAll('[data-cost]')].find((x) => x.textContent.trim() === l);
          return document.getElementById(b.getAttribute('popovertarget')).querySelector('h2,h3').textContent.trim();
        }, [label, i - 1]);
        await page.locator('.gs [data-cost]').first().click();
        await page.waitForTimeout(40);
        if ((await page.locator('[data-gs-ansh]').textContent()).trim() !== want) wrong.push(i);
        if (await page.locator('.gs [data-cost][aria-current]').count() !== 1) wrong.push(`${i}:current`);
        marks.push(...await page.evaluate(() => [...document.querySelectorAll('.gs__side .tk')].map((e) => getComputedStyle(e).color)));
        const before = await sumOf(page);
        await page.locator('.gs [data-cost]').last().click();
        await page.waitForTimeout(40);
        if (await sumOf(page) !== before) wrong.push(`${i}:second`);
        await nextBtn(page).click();
        await page.waitForTimeout(40);
      }
      say(!bad.length, `${G}: every mock-up is stamped`, `steps ${bad}`);
      say(!ids.length, `${G}: the copy in the frame carries no id or popover`, `steps ${ids}`);
      say(!unwired.length, `${G}: every step has choices`, `steps ${unwired}`);
      say(!wrong.length, `${G}: each press shows its own answer, marks it, and a second costs nothing`, wrong.join());
      const dim = marks.filter((c) => Math.max(...c.match(/[\d.]+/g).slice(0, 3).map(Number)) < 170);
      say(marks.length && !dim.length, `${G}: marked words in the dark panel are drawn light`, `${marks.length} marks, dim: ${dim[0]}`);
      await ctx.close();
    }
    {
      const { ctx, page } = await open();
      await here(page);
      await play(page, Array(g.steps).fill('trap'));
      await page.waitForTimeout(60);
      say((await page.locator('[data-gs-endsum]').textContent()).replace(/\s/g, ' ') === `${g.worst} €`, `${G}: every trap ends on ${g.worst} €`, await page.locator('[data-gs-endsum]').textContent());
      say(await verdict(page) === 'little', `${G}: the last ending`, await verdict(page));
      say(await lostRows(page) === g.lost, `${G}: ${g.lost} losses listed`, String(await lostRows(page)));
      say(await page.locator('[data-gs-endh]').textContent() === g.endHeading.replace(/ /g, ' ') || (await page.locator('[data-gs-endh]').textContent()).replace(/\s/g, ' ') === g.endHeading, `${G}: its own end heading`);
      say(await page.evaluate(() => [...document.querySelectorAll('[data-gs-lostlist] a')].every((a) => a.getAttribute('href').startsWith('/scenarijai/'))), `${G}: each loss links to its scenario`);
      say(await page.locator('.gs__end a[href^="/treniruote/"]').first().getAttribute('href') === g.next, `${G}: the next game is ${g.next}`);
      await page.locator('[data-gs-again]').click();
      await page.waitForTimeout(40);
      await play(page, Array(g.steps).fill('safe'));
      await page.waitForTimeout(40);
      say(await verdict(page) === 'all', `${G}: every safe move is the first ending`, await verdict(page));
      say(await page.locator('[data-gs-lost]').isHidden(), `${G}: and no list of losses`);
      await ctx.close();
    }
    {
      const { ctx, page } = await open();
      await here(page);
      const pressed = [];
      for (let i = 0; i < g.steps; i++) {
        pressed.push(...await page.evaluate(() => [...document.querySelectorAll('.gs [data-cost]')].flatMap((e) => { const c = getComputedStyle(e); return [c.color, c.backgroundColor, c.borderTopColor]; })));
        await pick(page, 'safe');
        pressed.push(...await page.evaluate(() => [...document.querySelectorAll('.gs [data-cost][aria-current]')].flatMap((e) => getComputedStyle(e).boxShadow.match(/rgba?\([^)]*\)/g) ?? [])));
        await nextBtn(page).click();
      }
      say(!pressed.map(hue).some(redOrGreen), `${G}: no red or green on the choices`, pressed.find((c) => redOrGreen(hue(c))));
      await ctx.close();
    }
    for (const [w, h] of [[320, 640], [390, 844], [844, 390], [2560, 1440]]) {
      const { ctx, page } = await open({ width: w, height: h });
      await here(page);
      const wide = () => page.evaluate(() => [...document.querySelectorAll('.gs, .gs__play, .gs__main, .gs__dock, .gs__sidebody, .gs__end, .gs__bar, .gs .mock')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => `${e.className} ${e.scrollWidth}>${e.clientWidth}`));
      const out = [];
      for (let i = 0; i < g.steps; i++) { out.push(...await wide()); await pick(page, 'trap'); await page.waitForTimeout(260); out.push(...await wide()); await nextBtn(page).click(); await page.waitForTimeout(30); }
      say(!out.length, `${G}: nothing runs sideways at ${w}x${h}`, out.slice(0, 3).join('; '));
      await ctx.close();
    }
    {
      const { ctx, page } = await open({ width: 360, height: 740 }, { deviceScaleFactor: 2, hasTouch: true, isMobile: true });
      await here(page);
      const miss = [];
      for (let i = 0; i < g.steps; i++) {
        const reach = () => page.evaluate(() => [...document.querySelectorAll('.gs [data-cost]')].map((o) => { o.scrollIntoView({ block: 'nearest' }); const r = o.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return o === e || o.contains(e); }));
        const before = await reach();
        if (!before.length || !before.every(Boolean)) miss.push(`${i + 1}:${JSON.stringify(before)}`);
        await pick(page, 'safe');
        await page.waitForTimeout(300);
        await page.locator('[data-gs-handle]').click();
        await page.waitForTimeout(100);
        const folded = await reach();
        if (!folded.every(Boolean)) miss.push(`${i + 1}:folded:${JSON.stringify(folded)}`);
        await page.locator('[data-gs-handle]').click();
        await page.waitForTimeout(100);
        await nextBtn(page).click();
        await page.waitForTimeout(60);
      }
      say(!miss.length, `${G}: on a phone every choice can be pressed`, miss.join(' '));
      await ctx.close();
    }
    {
      const { ctx, page } = await open({ width: 1280, height: 800 }, { javaScriptEnabled: false });
      await page.goto(BASE + G);
      say(!(await opener(page).isVisible()), `${G}: JavaScript off, no opener`);
      await page.locator('[data-step] [data-cost]').first().click();
      await page.waitForTimeout(150);
      say(await page.locator('.pop:popover-open').count() === 1, `${G}: JavaScript off, a choice opens its answer`);
      await ctx.close();
    }
  }
  {
    const { ctx, page } = await open();
    await page.goto(BASE + '/treniruote/smart-id/');
    await opener(page).click();
    await page.waitForTimeout(200);
    await pick(page, 'safe');
    await nextBtn(page).click();
    await page.waitForTimeout(40);
    say(await page.locator('.gs__dock').isHidden(), 'a step whose choices are all inside the mock-up draws no empty dock');
    await ctx.close();
  }

  // Skambutis: a hang-up (data-end) ends the game, on any step
  {
    const G = '/treniruote/skambutis/';
    const here = (page) => page.goto(BASE + G).then(() => opener(page).click()).then(() => page.waitForTimeout(240));
    const endSum = async (page) => (await page.locator('[data-gs-endsum]').textContent()).replace(/\s/g, ' ');
    const ended = (page) => page.locator('[data-gs-end]').isVisible();
    const nextIs = async (page, t) => (await nextBtn(page).textContent()).replace(/\s/g, ' ') === t;
    {
      const { ctx, page } = await open();
      await here(page);
      say(await sumOf(page) === '2 400 €', `${G}: it starts on the whole sum`, await sumOf(page));
      say(await page.locator('.gs :is(input,textarea,select,form,[contenteditable])').count() === 0, `${G}: nothing typed`);
      await pick(page, 'safe');
      await page.waitForTimeout(60);
      say((await page.locator('[data-gs-taken-none]').textContent()) === 'Šiame žingsnyje nieko neprarasta.' && await page.locator('[data-gs-taken-none]').isVisible(), `${G}: a first hang-up says nothing was lost on this step`);
      say(await nextIs(page, 'Žiūrėk, kiek liko'), `${G}: a hang-up's next button goes to the end`, await nextBtn(page).textContent());
      await nextBtn(page).click();
      await page.waitForTimeout(60);
      say(await ended(page), `${G}: a hang-up ends the game`);
      say(await endSum(page) === '2 400 €' && await verdict(page) === 'all' && await lostRows(page) === 0, `${G}: hanging up at once keeps it all, the first ending, no losses`, `${await endSum(page)} ${await verdict(page)}`);
      say(await page.locator('[data-verdict="all"]:not([hidden])').count() === 2, `${G}: the first ending has its second line`);
      say((await page.locator('[data-gs-endh]').textContent()).replace(/\s/g, ' ') === 'Skambutis baigtas', `${G}: its own end heading`);
      say(await page.locator('.gs__end a[href^="/treniruote/"]').first().getAttribute('href') === '/treniruote/diena-su-telefonu/', `${G}: the next game is Diena su telefonu`);
      await page.locator('[data-gs-again]').click();
      await page.waitForTimeout(60);
      await pick(page, 'trap');
      say(await nextIs(page, 'Jis kalba toliau'), `${G}: staying on the line, the next button says he goes on`, await nextBtn(page).textContent());
      await nextBtn(page).click();
      await page.waitForTimeout(60);
      say(await sumOf(page) === '2 300 €' && (await page.locator('[data-gs-n]').textContent()) === '2' && !(await ended(page)), `${G}: playing again forgets the hang-up`, await sumOf(page));
      await ctx.close();
    }
    {
      const { ctx, page } = await open();
      await here(page);
      const bad = [];
      for (let i = 1; i <= 5; i++) {
        const st = await page.evaluate(() => [...document.querySelectorAll('.gs .mock')].map((m) => { const t = m.querySelector('.stamp'); const r = t?.getBoundingClientRect(); return !!t && t.textContent.includes('MOKOMASIS PAVYZDYS') && r.width > 0 && r.height > 0; }));
        if (!st.length || !st.every(Boolean)) bad.push(i);
        if (!(await page.locator('.gs [data-cost][data-end]').count())) bad.push(`${i}:no hang-up`);
        await pick(page, 'trap');
        await nextBtn(page).click();
        await page.waitForTimeout(40);
      }
      say(!bad.length, `${G}: every step is stamped and has a hang-up`, bad.join());
      say(await endSum(page) === '0 €' && await verdict(page) === 'little' && await lostRows(page) === 5, `${G}: staying to the end leaves 0 €, the last ending, five losses`, `${await endSum(page)} ${await verdict(page)}`);
      await ctx.close();
    }
    {
      const { ctx, page } = await open();
      await here(page);
      await play(page, ['trap', 'trap', 'safe']);
      await page.waitForTimeout(60);
      say(await ended(page) && await endSum(page) === '2 100 €' && await verdict(page) === 'some' && await lostRows(page) === 2, `${G}: a later hang-up keeps what is left, the middle ending, two losses`, `${await endSum(page)} ${await verdict(page)}`);
      await ctx.close();
    }
    {
      const { ctx, page } = await open();
      await here(page);
      await play(page, ['trap']);
      await pick(page, 'trap');
      await pick(page, 'safe');
      await page.waitForTimeout(60);
      say(await page.locator('[data-gs-nochange]').isHidden(), `${G}: a hang-up after a paid choice never says it changes nothing`);
      say(await page.locator('[data-gs-taken-none]').isHidden(), `${G}: and does not claim nothing was lost on this step`);
      say(await sumOf(page) === '2 100 €' && await nextIs(page, 'Žiūrėk, kiek liko'), `${G}: the paid choice stays paid and the next button goes to the end`, await sumOf(page));
      await nextBtn(page).click();
      await page.waitForTimeout(60);
      say(await ended(page) && await endSum(page) === '2 100 €', `${G}: and it still ends the game`, await endSum(page));
      await page.locator('[data-gs-again]').click();
      await pick(page, 'safe');
      await pick(page, 'trap');
      await page.waitForTimeout(60);
      say(await page.locator('[data-gs-nochange]').isVisible() && await sumOf(page) === '2 400 €' && await nextIs(page, 'Žiūrėk, kiek liko'), `${G}: a trap pressed after a hang-up costs nothing and the call stays over`, await sumOf(page));
      await ctx.close();
    }
    {
      const { ctx, page } = await open();
      await here(page);
      const pressed = [];
      for (let i = 0; i < 5; i++) {
        pressed.push(...await page.evaluate(() => [...document.querySelectorAll('.gs [data-cost]')].flatMap((e) => { const c = getComputedStyle(e); return [c.color, c.backgroundColor, c.borderTopColor]; })));
        await pick(page, 'trap');
        await nextBtn(page).click();
      }
      say(!pressed.map(hue).some(redOrGreen), `${G}: no red or green on the choices`, pressed.find((c) => redOrGreen(hue(c))));
      await ctx.close();
    }
    for (const [w, h] of [[320, 640], [390, 844], [844, 390], [2560, 1440]]) {
      const { ctx, page } = await open({ width: w, height: h });
      await here(page);
      const wide = () => page.evaluate(() => [...document.querySelectorAll('.gs, .gs__play, .gs__main, .gs__dock, .gs__sidebody, .gs__end, .gs__bar, .gs .mock')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => `${e.className} ${e.scrollWidth}>${e.clientWidth}`));
      const out = [];
      for (let i = 0; i < 5; i++) { out.push(...await wide()); await pick(page, 'trap'); await page.waitForTimeout(260); out.push(...await wide()); await nextBtn(page).click(); await page.waitForTimeout(30); }
      say(!out.length, `${G}: nothing runs sideways at ${w}x${h}`, out.slice(0, 3).join('; '));
      await ctx.close();
    }
    {
      const { ctx, page } = await open({ width: 360, height: 740 }, { deviceScaleFactor: 2, hasTouch: true, isMobile: true });
      await here(page);
      const miss = [];
      for (let i = 0; i < 5; i++) {
        const reach = await page.evaluate(() => [...document.querySelectorAll('.gs [data-cost]')].map((o) => { o.scrollIntoView({ block: 'nearest' }); const r = o.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return o === e || o.contains(e); }));
        if (!reach.length || !reach.every(Boolean)) miss.push(`${i + 1}:${JSON.stringify(reach)}`);
        await pick(page, 'trap');
        await page.waitForTimeout(300);
        await nextBtn(page).click();
        await page.waitForTimeout(60);
      }
      say(!miss.length, `${G}: on a phone every choice can be pressed`, miss.join(' '));
      await ctx.close();
    }
    {
      const { ctx, page } = await open({ width: 1280, height: 800 }, { javaScriptEnabled: false });
      await page.goto(BASE + G);
      say(!(await opener(page).isVisible()), `${G}: JavaScript off, no opener`);
      const n = { steps: await page.locator('section[data-step]').count(), opts: await page.locator('section[data-step] .opt[popovertarget]').count(), pops: await page.locator('.answers .pop[popover]').count() };
      say(n.steps === 5 && n.opts === 12 && n.pops === 12, `${G}: JavaScript off, the page is whole`, JSON.stringify(n));
      say(await page.locator('.mock a').count() === 0, `${G}: the mock-ups carry no link`);
      await page.locator('[data-step] [data-end]').first().click();
      await page.waitForTimeout(150);
      say(await page.locator('.pop:popover-open a[href="#patvirtinti"]').count() === 1, `${G}: JavaScript off, a hang-up opens its answer and the way on`);
      await ctx.close();
    }
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
