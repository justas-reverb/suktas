/**
 * Tries to break the header search (src/lib/find.js) in the built site, in the installed Chrome:
 * opening and closing it every way, the keyboard, the phone's Meniu, hostile queries, a failed and a
 * slow index, JavaScript off, and every link the index holds. tools/test-gates.mjs --browser breaks
 * the built search on purpose and checks this goes red.
 *
 *   npm run build && node tools/find-e2e.mjs            every case, on dist/
 *   node tools/find-e2e.mjs --root <dir>                on another copy of the build
 *   node tools/find-e2e.mjs --perf                      also the timings (CPU slowed 4x, as a mid phone)
 *
 * Exits 1 if any case fails.
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import path from 'node:path';
import { chromium } from 'playwright-core';

const argv = process.argv.slice(2);
const ROOT = path.resolve(argv.includes('--root') ? argv[argv.indexOf('--root') + 1] : 'dist');
const PERF = argv.includes('--perf');
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
const PAGE = '/scenarijai/';

let failures = 0;
const say = (ok, name, why = '') => { if (!ok) failures++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || !why ? '' : `: ${why}`}`); };
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
async function open(size = { width: 1280, height: 800 }, opts = {}) {
  const ctx = await browser.newContext({ viewport: size, ...opts });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console ${m.text()}`); });
  page.on('dialog', (d) => { errors.push(`a ${d.type()} dialog opened: ${d.message()}`); d.dismiss(); });
  await page.addInitScript(() => document.addEventListener('securitypolicyviolation', (e) => console.error(`CSP refused ${e.blockedURI} (${e.violatedDirective})`)));
  const indexLoads = [];
  page.on('request', (r) => { if (r.url().endsWith('/paieska.json')) indexLoads.push(r.url()); });
  return { ctx, page, indexLoads };
}
const st = (page) => page.evaluate(() => {
  const d = document.querySelector('[data-find-dialog]');
  return {
    open: d.open,
    active: document.activeElement?.id || document.activeElement?.className || document.activeElement?.tagName,
    status: d.querySelector('[data-find-status]').textContent,
    hint: !d.querySelector('[data-find-hint]').hidden,
    rows: [...d.querySelectorAll('[data-find-list] > li')].map((li) => li.className === 'find__sect' ? '#sect'
      : { k: li.querySelector('.find__kind b')?.textContent, kt: li.querySelector('.find__kind')?.textContent, t: li.querySelector('strong')?.textContent, href: li.querySelector('a')?.getAttribute('href') }),
    marks: [...d.querySelectorAll('[data-find-list] mark')].map((m) => m.textContent),
    alien: d.querySelectorAll('[data-find-list] :is(img,script,iframe,svg,object,style)').length,
  };
});
const type = async (page, q) => { await page.fill('#find-q', q); return st(page); };
// Bounded and quiet: a search that never settles fails its own case below instead of ending the run.
const settled = (page) => page.waitForFunction(() => /Rasta|Rodome|Nieko|neveikia/.test(document.querySelector('[data-find-status]').textContent) || !document.querySelector('#find-q').value.trim(), null, { timeout: 8000 }).catch(() => {});

try {
  /* Every link in the index lands on a built page, and its #id exists there. */
  {
    const items = JSON.parse(await readFile(path.join(ROOT, 'paieska.json'), 'utf8'));
    const pages = new Map();
    const html = async (u) => { if (!pages.has(u)) pages.set(u, await readFile(await resolveFile(u) ?? path.join(ROOT, '\0'), 'utf8').catch(() => null)); return pages.get(u); };
    const bad = [];
    for (const it of items) {
      const [u, id] = it.u.split('#');
      const h = await html(u);
      if (!h) { bad.push(`${it.u}: no page`); continue; }
      for (const want of [id, ...it.h.map(([, i]) => i)].filter(Boolean)) if (!h.includes(`id="${want}"`)) bad.push(`${u}#${want}: no such id`);
    }
    say(items.length > 300 && !bad.length, `every link in the index lands on a page and section that exist (${items.length} entries)`, bad.slice(0, 5).join('; '));
  }

  const { ctx, page, indexLoads } = await open();
  await page.goto(BASE + PAGE);
  await page.waitForTimeout(400);
  say(indexLoads.length === 0, 'nothing is fetched before the pointer or focus reaches the search', `${indexLoads.length} request(s)`);
  await page.hover('.find');
  await page.waitForTimeout(400);
  say(indexLoads.length === 1, 'the pointer on the button starts loading the index before the click', `${indexLoads.length} request(s)`);

  await page.click('.find');
  let s = await st(page);
  say(s.open && s.active === 'find-q', 'the button opens a modal with the cursor in the box', JSON.stringify(s));
  say(await page.evaluate(() => getComputedStyle(document.documentElement).overflow === 'hidden'), 'the page behind does not scroll while it is open');
  s = await type(page, '');
  say(s.hint && !s.rows.length && !s.status, 'an empty box shows the hint and no results', JSON.stringify(s));

  await page.fill('#find-q', 'slaptazodis'); await settled(page); s = await st(page);
  say(s.rows[0]?.k !== 'Šaltinis' && s.rows.some((r) => r.t && fold(r.t).includes('slaptazod')), 'a word typed without marks finds the page with them', JSON.stringify(s.rows.slice(0, 3)));

  {
    // A form found nowhere on the site whose first letters are: only the cut ending can find it.
    const raw = fold(await readFile(path.join(ROOT, 'paieska.json'), 'utf8'));
    const w = 'slaptazodziais';
    await page.fill('#find-q', w); await settled(page); s = await st(page);
    say(!raw.includes(w) && raw.includes(w.slice(0, -3)) && s.rows.some((r) => r.t && fold(r.t).includes('slaptazod')), 'another ending of a word still finds its page', JSON.stringify(s.rows.slice(0, 2)));
  }

  await page.fill('#find-q', 'smart id'); await settled(page); s = await st(page);
  {
    const first = s.rows.findIndex((r) => r.k === 'Šaltinis');
    const sects = s.rows.filter((r) => r === '#sect').length;
    const pageAfter = first >= 0 && s.rows.slice(first).some((r) => r !== '#sect' && r.k !== 'Šaltinis');
    say(s.rows[0]?.k && s.rows[0].k !== 'Šaltinis' && first > 0 && sects === 1 && s.rows[first - 1] === '#sect' && !pageAfter,
      'pages come first, then the sources under one Šaltiniai heading', JSON.stringify(s.rows.map((r) => r.k || r)));
    say(s.marks.some((m) => /^smart-id$/i.test(m)), 'a match marks the whole word, „Smart-ID" as one', JSON.stringify(s.marks.slice(0, 8)));
  }

  await page.fill('#find-q', 'ka daryti'); await settled(page); s = await st(page);
  {
    const sec = s.rows.filter((r) => r.href?.includes('#') && !r.href.startsWith('/saltiniai/'));
    say(sec.length > 0 && sec.every((r) => /^\S+( \S+)?, skyrius „[^“]+“$/.test(r.kt)) && !s.rows.some((r) => r.kt?.includes('·')),
      'a hit in a section links to it and names it, with no dot-joined label', JSON.stringify(sec.slice(0, 2)));
  }

  await page.fill('#find-q', 'id'); await settled(page); s = await st(page);
  say(s.rows.length > 0 && s.marks.every((m) => fold(m) === 'id'), 'a two-letter word matches whole words only', JSON.stringify([...new Set(s.marks)].slice(0, 8)));

  await page.fill('#find-q', 'sukciai'); await settled(page); s = await st(page);
  say(s.rows.filter((r) => r !== '#sect').length === 30 && /^Rodome 30/.test(s.status), 'a broad word shows the best 30 and says so', `${s.rows.length} rows, „${s.status}"`);

  await page.fill('#find-q', 'qqzzxxvv'); await settled(page); s = await st(page);
  say(!s.rows.length && /^Nieko/.test(s.status), 'a word found nowhere says so', JSON.stringify(s));

  {
    const words = await page.$$eval('[data-find-try]', (b) => b.map((x) => x.textContent));
    const empty = [];
    for (let i = 0; i < words.length; i++) {
      await page.fill('#find-q', '');
      await page.click(`[data-find-try] >> nth=${i}`);
      await settled(page);
      const r = await st(page);
      if (!r.rows.length || (await page.inputValue('#find-q')) !== words[i]) empty.push(words[i]);
    }
    say(words.length >= 5 && !empty.length, `every suggested word finds something (${words.length})`, empty.join(', '));
  }

  {
    const HOSTILE = ['<img src=x onerror=alert(1)>', '"><script>alert(1)</script>', '.*+?^${}()|[]\\', '‮\u0000￿', '😀 policija 😀',
      '------', 'a'.repeat(5000), 'smart '.repeat(200), '<b>kurjeris</b>', 'javascript:alert(1)', '%3Cscript%3E', 'ŽŽŽ ąčęėįšųūž'];
    const bad = [];
    for (const q of HOSTILE) {
      await page.fill('#find-q', q); await settled(page);
      const r = await st(page);
      if (r.alien) bad.push(`${q.slice(0, 20)}: markup rendered`);
      if (!r.status && q.trim()) bad.push(`${q.slice(0, 20)}: no status`);
      if (r.rows.some((x) => x !== '#sect' && !x.href?.startsWith('/'))) bad.push(`${q.slice(0, 20)}: a link off the site`);
    }
    say(!bad.length && !errors.length, 'hostile queries are only text: no markup, no script, no error', [...bad, ...errors].slice(0, 4).join('; '));
  }

  await page.fill('#find-q', 'kurjeris'); await settled(page);
  await page.focus('#find-q');
  await page.keyboard.press('ArrowDown'); const a1 = await page.evaluate(() => document.activeElement.getAttribute('href'));
  await page.keyboard.press('ArrowDown'); const a2 = await page.evaluate(() => document.activeElement.getAttribute('href'));
  await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowUp');
  s = await st(page);
  const hrefs = (await st(page)).rows.filter((r) => r.href).map((r) => r.href);
  say(a1 === hrefs[0] && a2 === hrefs[1] && s.active === 'find-q', 'arrow keys walk the results and Up from the first goes back to the box', `${a1}, ${a2}, back on ${s.active}`);

  await page.keyboard.press('Escape');
  s = await st(page);
  say(!s.open && s.active.includes('find') && (await page.inputValue('#find-q')) === 'kurjeris', 'one Esc closes it, keeps the query, and focus goes back to the button', JSON.stringify({ open: s.open, active: s.active }));
  await page.evaluate(() => document.querySelector('[data-find-dialog]').close());

  await page.click('.find');
  s = await st(page);
  say(indexLoads.length === 1, 'the index is fetched once, however often the search opens', `${indexLoads.length} requests`);
  say(s.open && (await page.inputValue('#find-q')) === 'kurjeris' && s.rows.length > 0, 'reopened, it keeps the last query and its results', JSON.stringify({ open: s.open, n: s.rows.length }));

  await page.click('[data-find-close]');
  say(!(await st(page)).open, 'the close button closes it');

  await page.click('.find');
  await page.mouse.click(4, 790);
  say(!(await st(page)).open, 'a click beside the card closes it');

  await page.click('.find');
  await page.evaluate(() => { const a = document.querySelector('[data-find-list] a'); a.href = `${location.pathname}#main`; a.click(); });
  say(!(await st(page)).open, 'a result on the page already open closes the search');

  await page.click('.find');
  await page.fill('#find-q', 'kurjeris'); await settled(page);
  const target = (await st(page)).rows[0].href;
  await page.press('#find-q', 'Enter');
  await page.waitForURL((u) => u.pathname + u.hash === target, { timeout: 5000 }).catch(() => {});
  say(new URL(page.url()).pathname + new URL(page.url()).hash === target, 'Enter opens the first result', `${page.url()} vs ${target}`);
  await ctx.close();

  /* The phone: the search heads the Meniu sheet. */
  {
    const { ctx, page } = await open({ width: 375, height: 812 }, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(BASE + PAGE);
    await page.click('.menu summary');
    await page.click('.menu__find');
    let s = await st(page);
    const fit = await page.evaluate(() => { const d = document.querySelector('[data-find-dialog]'); const r = d.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && d.scrollWidth <= d.clientWidth; });
    say(s.open && fit, 'phone: the Meniu opens the search, and it fits the screen', JSON.stringify({ open: s.open, fit }));
    await page.fill('#find-q', 'policija'); await settled(page);
    const wide = await page.evaluate(() => [...document.querySelectorAll('[data-find-dialog] *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).map((e) => e.className || e.tagName).slice(0, 3));
    say(!wide.length, 'phone: no result runs past the edge', wide.join(', '));
    await page.click('[data-find-close]');
    s = await st(page);
    say(!s.open && (await page.evaluate(() => document.activeElement?.matches('.menu summary'))), 'phone: closed, focus goes back to Meniu', s.active);
    await ctx.close();
  }

  /* A failed index, then a retry on the next open. */
  {
    const { ctx, page } = await open();
    const before = errors.length;
    await page.route('**/paieska.json', (r) => r.abort());
    await page.goto(BASE + PAGE);
    await page.click('.find');
    await page.fill('#find-q', 'kurjeris'); await settled(page);
    const s1 = await st(page);
    await page.unroute('**/paieska.json');
    await page.keyboard.press('Escape');
    await page.click('.find'); await settled(page);
    const s2 = await st(page);
    say(/neveikia/.test(s1.status) && s2.rows.length > 0, 'a failed index says so, and the next open tries again', `„${s1.status}", then ${s2.rows.length} rows`);
    await ctx.close();
    // The refused request is this test's own doing.
    errors.splice(before, Infinity, ...errors.slice(before).filter((e) => !e.includes('net::ERR_FAILED')));
  }

  /* A slow index: „Kraunama…" while it comes, then the results for what was typed. */
  {
    const { ctx, page } = await open();
    await page.route('**/paieska.json', async (r) => { await new Promise((d) => setTimeout(d, 1500)); r.continue(); });
    await page.goto(BASE + PAGE);
    await page.click('.find');
    await page.fill('#find-q', 'policija');
    const s1 = await st(page);
    await settled(page);
    const s2 = await st(page);
    say(s1.status === 'Kraunama…' && s2.rows.length > 0 && s2.marks.some((m) => fold(m).startsWith('polic')), 'a slow index says Kraunama…, then shows what was typed', `„${s1.status}", then ${s2.rows.length} rows`);
    await ctx.close();
  }

  /* Typing fast: the results are those of the last query. */
  {
    const { ctx, page } = await open();
    await page.goto(BASE + PAGE);
    await page.click('.find'); await page.fill('#find-q', 'x'); await settled(page);
    await page.fill('#find-q', '');
    await page.keyboard.type('investicijos', { delay: 0 });
    await settled(page);
    const s = await st(page);
    say(s.rows.length > 0 && s.marks.length > 0 && s.marks.every((m) => fold(m).startsWith('invest')), 'typing fast leaves the results of the whole word', JSON.stringify(s.marks.slice(0, 4)));
    await ctx.close();
  }

  /* JavaScript off: the button is a plain link to the map. */
  {
    const { ctx, page } = await open({ width: 1280, height: 800 }, { javaScriptEnabled: false });
    await page.goto(BASE + PAGE);
    await page.click('.find');
    await page.waitForURL('**/turinys/', { timeout: 5000 }).catch(() => {});
    say(new URL(page.url()).pathname === '/turinys/', 'with JavaScript off the button opens /turinys/', page.url());
    await ctx.close();
  }

  say(!errors.length, 'no page error, no console error, nothing the CSP refused', errors.slice(0, 4).join('; '));

  if (PERF) {
    const json = await readFile(path.join(ROOT, 'paieska.json'));
    console.log(`perf index: ${(json.length / 1024).toFixed(0)} KB, gzip ${(gzipSync(json, { level: 6 }).length / 1024).toFixed(0)} KB, brotli ${(brotliCompressSync(json).length / 1024).toFixed(0)} KB`);
    const { ctx, page } = await open();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.goto(BASE + PAGE);
    await page.evaluate(() => { window.__long = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__long.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: false }); });
    const t0 = Date.now();
    await page.click('.find');
    await page.fill('#find-q', 'kurjeris'); await settled(page);
    const first = Date.now() - t0;
    const long = await page.evaluate(() => window.__long);
    console.log(`perf first open to first results, CPU 4x slower: ${first} ms; long tasks ${JSON.stringify(long)}`);
    // The usual path: the pointer rests on the button a moment (the prefetch) before the click.
    await page.goto(BASE + PAGE);
    await page.hover('.find'); await page.waitForTimeout(800);
    const t1 = Date.now();
    await page.click('.find');
    await page.fill('#find-q', 'kurjeris'); await settled(page);
    console.log(`perf first open after 800 ms of hover, CPU 4x slower: ${Date.now() - t1} ms`);
    const per = await page.evaluate(async () => {
      const input = document.getElementById('find-q');
      const out = {};
      for (const q of ['k', 'ku', 'kur', 'kurjeris', 'sukciai', 'kai', 'smart id', 'a', 'pinigai bankas kodas', 'sukčiai skambina iš banko']) {
        const ts = [];
        for (let i = 0; i < 5; i++) { input.value = ''; input.dispatchEvent(new Event('input')); const t = performance.now(); input.value = q; input.dispatchEvent(new Event('input')); ts.push(performance.now() - t); }
        ts.sort((a, b) => a - b);
        out[q] = Math.round(ts[2]);
      }
      return out;
    });
    console.log(`perf one keystroke (search and render, median of 5), CPU 4x slower, ms: ${JSON.stringify(per)}`);
    const heap = await cdp.send('Runtime.getHeapUsage');
    console.log(`perf JS heap with the index loaded: ${(heap.usedSize / 1048576).toFixed(1)} MB`);
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(failures ? `${failures} case(s) failed` : 'every case passed');
process.exit(failures ? 1 : 0);
