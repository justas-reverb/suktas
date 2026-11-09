/**
 * Proves the checks can fail. A check that has never gone red proves nothing, so each
 * thing a check guards is broken on purpose in a copy of dist/, and the check must go
 * red for the right reason. A clean copy must pass. tools/page-dates.mjs --self-test
 * proves the sitemap dates' rules on a throwaway repository.
 *
 *   npm run build && node tools/test-gates.mjs             the two build gates (seconds)
 *   npm run build && node tools/test-gates.mjs --browser   also shoot.mjs in Chrome: the
 *       runtime probe (pixels read back, storage), the request log and the sideways-scroll check,
 *       textscale-check.mjs (text past the edge at 1.5x system text) and find-e2e.mjs
 *       (22 breakages of the built search) and game-check.mjs (breakages of the game frame), run --workers N at a time, default 6
 *
 * Exits 1 if any mutant survives or the clean copy fails.
 */
import { cp, mkdtemp, rm, readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { spawnSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { check } from './check-privacy.mjs';
import { gate } from './strip-deploy.mjs';
import { readSources } from '../src/lib/saltiniai.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve('dist');
const TMP = await mkdtemp(path.join(os.tmpdir(), 'suktai-gates-'));

const firstOf = async (dir, ext) => {
  const f = (await readdir(path.join(dir, '_astro'))).find((n) => n.endsWith(ext));
  if (!f) throw new Error(`no ${ext} in dist/_astro; build a page with a script and a style first`);
  return `_astro/${f}`;
};
const edit = async (dir, rel, fn) => writeFile(path.join(dir, rel), fn(await readFile(path.join(dir, rel), 'utf8')));
const html = (fn) => (d) => edit(d, 'index.html', fn);
const head = (s) => html((h) => h.replace('</head>', `${s}</head>`));
const body = (s) => html((h) => h.replace('<body>', `<body>${s}`));
const css = (s) => async (d) => edit(d, await firstOf(d, '.css'), (t) => t + s);
const js = (s) => async (d) => edit(d, await firstOf(d, '.js'), (t) => t + s);
const file = (rel, s = 'x') => (d) => writeFile(path.join(d, rel), s);

/* [name, which check, how to break it, what the check must say] */
const MUTANTS = [
  ['external stylesheet', 'privacy', head('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter">'), /another server/],
  ['external preconnect', 'privacy', head('<link rel="preconnect" href="https://fonts.gstatic.com">'), /another server/],
  ['external script', 'privacy', head('<script type="module" src="https://cdn.example.com/x.js"></script>'), /another server/],
  ['protocol-relative image', 'privacy', body('<img src="//cdn.example.com/a.png" alt="">'), /another server/],
  ['external srcset', 'privacy', body('<img src="/a.png" srcset="/a.png 1x, https://cdn.example.com/a2.png 2x" alt="">'), /another server/],
  ['inline script', 'privacy', body('<script>console.log(1)</script>'), /inline script/],
  ['inline style element', 'privacy', head('<style>p{color:red}</style>'), /inline style element/],
  ['style attribute', 'privacy', body('<p style="color:red">x</p>'), /style attribute/],
  ['event-handler attribute', 'privacy', body('<button onclick="go()">x</button>'), /event-handler/],
  ['iframe', 'privacy', body('<iframe src="/x.html"></iframe>'), /embeds another document/],
  ['inline SVG', 'privacy', body('<svg width="10" height="10"></svg>'), /inline SVG/],
  ['form', 'privacy', body('<form action="/x"></form>'), /form-action/],
  ['missing CSP meta', 'privacy', html((h) => h.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, '')), /Content-Security-Policy/],
  ['loosened CSP', 'privacy', html((h) => h.replace("default-src 'none'", 'default-src *')), /Content-Security-Policy is not the site's policy/],
  ['CSP missing a directive', 'privacy', html((h) => h.replace("; form-action 'none'", '')), /Content-Security-Policy is not the site's policy/],
  ['script before the CSP meta', 'privacy', html((h) => h.replace('<meta http-equiv="Content-Security-Policy"', '<script type="module" src="/count.js"></script><meta http-equiv="Content-Security-Policy"')), /before the Content-Security-Policy/],
  ['missing referrer policy', 'privacy', html((h) => h.replace(/<meta name="referrer"[^>]*>/, '')), /no-referrer/],
  ['external share image', 'privacy', head('<meta property="og:image" content="https://cdn.example.com/share.png">'), /share image/],
  ['data: URI in CSS', 'privacy', css('a{background:url(data:image/png;base64,AAAA)}'), /data: URI/],
  ['external font in CSS', 'privacy', css('@font-face{font-family:x;src:url(https://fonts.gstatic.com/x.woff2)}'), /another server/],
  ['external @import', 'privacy', css('@import url("https://cdn.example.com/a.css");'), /another server/],
  ['external image-set in CSS', 'privacy', css('a{background-image:image-set("/a.png" 1x,"https://cdn.example.com/a2.png" 2x)}'), /another server/],
  ['meta refresh', 'privacy', head('<meta http-equiv="refresh" content="0;url=https://cdn.example.com/">'), /meta refresh/],
  ['localStorage', 'privacy', js(';localStorage.setItem("a","b");'), /localStorage/],
  ['cookie', 'privacy', js(';document.cookie="a=b";'), /cookies/],
  ['getImageData', 'privacy', js(';c.getContext("2d").getImageData(0,0,1,1);'), /getImageData/],
  ['toDataURL', 'privacy', js(';c.toDataURL();'), /toDataURL/],
  ['readPixels', 'privacy', js(';gl.readPixels(0,0,1,1,6408,5121,b);'), /readPixels/],
  ['external fetch', 'privacy', js(';fetch("https://api.example.com/x");'), /fetches from another server/],
  ['beacon outside the counter', 'privacy', js(';navigator.sendBeacon("/x","y");'), /sends a beacon/],
  ['page without the counter', 'privacy', html((h) => h.replace(/<script[^>]*src="\/count\.js"[^>]*><\/script>/, '')), /visit counter/],
  ['counter for another site', 'privacy', html((h) => h.replace('data-site="suktas.lt"', 'data-site="example.com"')), /visit counter/],
  ['counter sends elsewhere', 'privacy', (d) => edit(d, 'count.js', (t) => t.replace('https://count.sudievu.lt/e.php', 'https://collect.example.com/e')), /counter talks to another server/],
  ['counter reads pixels', 'privacy', (d) => edit(d, 'count.js', (t) => t + ';c.toDataURL();'), /toDataURL/],
  ['SVG file', 'both', file('mark.svg', '<svg/>'), /SVG/],
  ['markdown file', 'strip', file('README.md', '# notes'), /markdown/],
  ['note as .txt', 'strip', file('notes.txt', 'todo'), /licence/],
  ['note named like a licence', 'strip', file('reasoning-OFL.txt', 'todo'), /licence/],
  ['licence name outside licenses/', 'strip', file('OFL-Young-Serif.txt', 'todo'), /licence/],
  ['unknown kind of file', 'strip', file('art.psd'), /kind of file/],
  ['an Android package', 'strip', file('app.apk'), /kind of file/],
  ['comment in robots.txt', 'strip', (d) => edit(d, 'robots.txt', (t) => t + '\n# why we allow everything\n'), /comment/],
  ['comment in llms.txt', 'strip', (d) => edit(d, 'llms.txt', (t) => t + '\n<!-- reasoning -->\n'), /comment/],
  ['manifest that is not JSON', 'strip', file('site.webmanifest', '{/* why */ "name": "Suktas"}'), /not JSON/],
  ['outside link in llms.txt', 'privacy', (d) => edit(d, 'llms.txt', (t) => t + '\n- [x](https://cdn.example.com/x)\n'), /another server/],
  ['manifest icon on another server', 'privacy', file('site.webmanifest', '{"icons":[{"src":"https://cdn.example.com/i.png"}]}'), /another server/],
  ['comment in HTML', 'strip', body('<!-- remember to fix -->'), /comment/],
  ['comment in CSS', 'strip', css('/* why this colour */'), /comment/],
  ['comment in JS', 'strip', js('\n// reasoning\n'), /comment/],
];

let failures = 0;
const say = (ok, msg) => { if (!ok) failures++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); };
const run = async (dir, which) => [
  ...(which !== 'strip' ? await check(dir) : []),
  ...(which !== 'privacy' ? await gate(dir) : []),
];

try {
  const clean = path.join(TMP, 'clean');
  await cp(DIST, clean, { recursive: true });
  const cleanProblems = await run(clean, 'both');
  say(cleanProblems.length === 0, `clean copy passes both gates${cleanProblems.length ? ': ' + cleanProblems.join(' | ') : ''}`);

  for (const [i, [name, which, breakIt, expect]] of MUTANTS.entries()) {
    const d = path.join(TMP, `m${i}`);
    await cp(DIST, d, { recursive: true });
    await breakIt(d);
    const problems = await run(d, which);
    const caught = problems.some((p) => expect.test(p));
    say(caught, `${which} gate catches: ${name}${caught ? '' : ` (said: ${problems.join(' | ') || 'nothing'})`}`);
  }

  /* The Šaltiniai page writes each source and page link from the copy into an href as it is. */
  {
    const raw = await readFile(path.resolve('docs/copy/saltiniai.md'), 'utf8');
    let err = null;
    try { readSources(raw); } catch (e) { err = e.message; }
    say(err === null, `saltiniai.md reads clean${err ? `: ${err}` : ''}`);
    const SOURCES = [
      ['an http: source', (t) => t.replace('](https://rrt.lt/', '](http://rrt.lt/'), /not an https: link/],
      ['a javascript: source', (t) => t.replace('](https://rrt.lt/', '](javascript:alert(1)//rrt.lt/'), /not an https: link/],
      ['a page link to another server', (t) => t.replace('](/scenarijai/', '](https://cdn.example.com/scenarijai/'), /not on this site/],
      ['a protocol-relative page link', (t) => t.replace('](/scenarijai/', '](//cdn.example.com/scenarijai/'), /not on this site/],
      ['two source links in one entry', (t) => t.replace(' Šaltinis: [', ' Šaltinis: [Kitas](https://example.lt/) ir ['), /more than one source link/],
    ];
    for (const [name, breakIt, expect] of SOURCES) {
      const broken = breakIt(raw);
      let said = 'nothing';
      if (broken !== raw) try { readSources(broken); } catch (e) { said = e.message; }
      say(expect.test(said), `saltiniai.md refuses ${name}${expect.test(said) ? '' : ` (said: ${said})`}`);
    }
  }

  {
    const r = spawnSync(process.execPath, [path.join(HERE, 'page-dates.mjs'), '--self-test'], { encoding: 'utf8' });
    say(r.status === 0, `page dates: every rule holds on a throwaway repository${r.status === 0 ? '' : ` (${(r.stdout.match(/^FAIL.*$/gm) || [r.stderr.trim()]).join(' | ')})`}`);
  }

  if (process.argv.includes('--browser')) {
    /* Pages without the CSP meta on purpose: here the point is that shoot.mjs itself sees
       the call or the request, not that the CSP refuses it first. example.invalid can
       never resolve, so the external case sends nothing anywhere. */
    const CASES = [
      ['clean page', 'document.body.append("ok")', 0, null],
      ['2D pixels read back', 'document.createElement("canvas").getContext("2d").getImageData(0,0,1,1)', 1, /2d\.getImageData/],
      ['WebGL pixels read back', 'const g=document.createElement("canvas").getContext("webgl");g&&g.readPixels(0,0,1,1,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array(4))', 1, /webgl\.readPixels/],
      ['canvas exported', 'document.createElement("canvas").toDataURL()', 1, /canvas\.toDataURL/],
      ['storage written', 'localStorage.setItem("a","b")', 1, /storage\.setItem/],
      ['cookie written', 'document.cookie="a=b"', 1, /document\.cookie write/],
      ['request to another server', 'new Image().src="http://example.invalid/x.png"', 1, /external: http:\/\/example\.invalid/],
      ['page scrolls sideways', 'const d=document.createElement("div");d.className="wide";document.body.append(d)', 1, /scrolls sideways/],
      ['a resource that is missing', 'new Image().src="/missing.png"', 1, /broken: 404 \/missing\.png/],
    ];
    const root = path.join(TMP, 'browser');
    await mkdir(path.join(root, 'dist'), { recursive: true });
    await writeFile(path.join(root, 'dist', 'wide.css'), '.wide{width:3000px;height:10px}');
    /* A 1x1 PNG, declared as the icon, so Chrome does not go looking for /favicon.ico. */
    await writeFile(path.join(root, 'dist', 'icon.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'));
    /* The no-JavaScript pass, once clean and once too wide: it once hung forever, because
       page.evaluate never settles with scripting off. */
    CASES.push(
      ['clean page with JavaScript off', 'document.body.append("ok")', 0, null, 'nojs'],
      ['too-wide page with JavaScript off', '', 1, /scrolls sideways/, 'nojs', '<div class="wide"></div>'],
    );
    /* A page far taller than 16,384 device pixels, red at the top, blue at the very bottom:
       a single full-page capture wraps and shows red at the bottom again (2026-10-02). */
    await writeFile(path.join(root, 'dist', 'tall.css'), '.top{height:2000px;background:#f00}.mid{height:14000px;background:#0f0}.end{height:2000px;background:#00f}');
    const tallDir = path.join(root, 'dist', 'tall');
    await mkdir(tallDir, { recursive: true });
    await writeFile(path.join(tallDir, 'index.html'), '<!doctype html><html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/icon.png"><link rel="stylesheet" href="/tall.css"><style>body{margin:0}</style></head><body><div class="top"></div><div class="mid"></div><div class="end"></div></body></html>');
    {
      const r = spawnSync(process.execPath, [path.join(HERE, 'shoot.mjs'), '--out', path.join(root, 'shots-tall'), '--pages', '/tall/', '--sizes', '400x800@2', '--modes', 'nojs', '--wait', '100'], { cwd: root, encoding: 'utf8', timeout: 180000 });
      const { default: sharp } = await import('sharp');
      const img = sharp(path.join(root, 'shots-tall', 'tall-400x800-nojs.png'));
      const meta = await img.metadata();
      const px = await img.extract({ left: 10, top: meta.height - 20, width: 1, height: 1 }).raw().toBuffer().catch(() => Buffer.from([0, 0, 0]));
      const ok = r.status === 0 && meta.width === 800 && meta.height === 36000 && px[2] > 200 && px[0] < 50;
      say(ok, `shoot.mjs keeps a 36,000 px page whole to its foot (got ${meta.width}x${meta.height}, bottom rgb ${[...px.subarray(0, 3)]})`);
    }
    for (const [i, [name, code, wantExit, expect, modes = 'js', markup = '']] of CASES.entries()) {
      const dir = path.join(root, 'dist', `case${i}`);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 't.js'), code + ';');
      await writeFile(path.join(dir, 'index.html'), `<!doctype html><html lang="lt"><head><meta charset="utf-8"><link rel="icon" href="/icon.png"><link rel="stylesheet" href="/wide.css"><script type="module" src="/case${i}/t.js"></script></head><body>${markup}</body></html>`);
      const r = spawnSync(process.execPath, [path.join(HERE, 'shoot.mjs'), '--out', path.join(root, `shots${i}`), '--pages', `/case${i}/`, '--sizes', '800x600@1', '--modes', modes, '--wait', '200'], { cwd: root, encoding: 'utf8', timeout: 120000 });
      const out = (r.stdout || '') + (r.stderr || '');
      const ok = r.status === wantExit && (!expect || expect.test(out));
      say(ok, `shoot.mjs ${wantExit ? 'catches' : 'passes'}: ${name}${ok ? '' : ` (exit ${r.status}: ${out.trim().split('\n').slice(-3).join(' / ')})`}`);
    }
    /* textscale-check.mjs: a 30-letter word at 18 px monospace is 324 px, inside 375 at 1x and
       486 px at 1.5x. Its <p> stays 375 wide, so only the text's own line boxes show the spill. */
    await writeFile(path.join(root, 'dist', 'ts.css'), 'body{margin:0;font:18px/1.4 "Courier New",monospace}.any{overflow-wrap:anywhere}.rail{overflow-x:auto}');
    const word = 'm'.repeat(30);
    const TS = [
      ['a word that runs past the edge only at 1.5x', `<p>${word}</p>`, 1],
      ['the same word allowed to break', `<p class="any">${word}</p>`, 0],
      ['the same word inside a sideways scroller', `<div class="rail"><p>${word}</p></div>`, 0],
    ];
    for (const [i, [name, markup, wantExit]] of TS.entries()) {
      const dir = path.join(root, 'dist', `ts${i}`);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), `<!doctype html><html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/icon.png"><link rel="stylesheet" href="/ts.css"></head><body>${markup}</body></html>`);
      const r = spawnSync(process.execPath, [path.join(HERE, 'textscale-check.mjs'), '--pages', `/ts${i}/`, '--workers', '1'], { cwd: root, encoding: 'utf8', timeout: 120000 });
      const out = (r.stdout || '') + (r.stderr || '');
      const ok = r.status === wantExit && (!wantExit || out.includes(`/ts${i}/`));
      say(ok, `textscale-check.mjs ${wantExit ? 'catches' : 'passes'}: ${name}${ok ? '' : ` (exit ${r.status}: ${out.trim().split('\n').slice(-3).join(' / ')})`}`);
    }

    /* hover-check.mjs: a card that lifts 3px on hover flickers under a pointer resting on its bottom edge,
       unless a hovered ::after covers the strip it left; one that does not move cannot flicker. */
    await writeFile(path.join(root, 'dist', 'hv.css'), 'body{margin:0;padding:80px}.c{position:relative;display:block;width:240px;padding:20px;border:1px solid #000;transition:transform .18s ease-out}.up:hover{transform:translateY(-3px)}.fix:hover::after{content:"";position:absolute;top:100%;left:0;right:0;height:4px}');
    const HV = [
      ['a card that lifts on hover with nothing under it', '<a class="c up" href="#">card</a>', 1],
      ['the same card covering the strip it left', '<a class="c up fix" href="#">card</a>', 0],
      ['a card that does not move', '<a class="c" href="#">card</a>', 0],
    ];
    for (const [i, [name, markup, wantExit]] of HV.entries()) {
      const dir = path.join(root, 'dist', `hv${i}`);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), `<!doctype html><html lang="lt"><head><meta charset="utf-8"><link rel="icon" href="/icon.png"><link rel="stylesheet" href="/hv.css"></head><body>${markup}</body></html>`);
      const r = spawnSync(process.execPath, [path.join(HERE, 'hover-check.mjs'), '--pages', `/hv${i}/`, '--workers', '1'], { cwd: root, encoding: 'utf8', timeout: 120000 });
      const out = (r.stdout || '') + (r.stderr || '');
      const ok = r.status === wantExit && (!wantExit || /\/hv\d\/ .*flickers: bottom/.test(out));
      say(ok, `hover-check.mjs ${wantExit ? 'catches' : 'passes'}: ${name}${ok ? '' : ` (exit ${r.status}: ${out.trim().split('\n').slice(-3).join(' / ')})`}`);
    }

    /* find-e2e.mjs: the built search broken on purpose, each in its own copy of dist/; the case named
       must go red. A pattern that no longer matches the minified bundle fails here, not silently. */
    const bundle = async (d) => `_astro/${(await readdir(path.join(d, '_astro'))).find((n) => n.endsWith('.js') && readFileSync(path.join(d, '_astro', n), 'utf8').includes('paieska.json'))}`;
    const sub = (re, to, where = bundle) => async (d) => {
      const rel = await where(d);
      const t = await readFile(path.join(d, rel), 'utf8');
      if (!re.test(t)) throw new Error(`pattern ${re} not in ${rel}`);
      await writeFile(path.join(d, rel), t.replace(re, to));
    };
    const cssAll = (s) => async (d) => { for (const n of await readdir(path.join(d, '_astro'))) if (n.endsWith('.css')) await writeFile(path.join(d, '_astro', n), (await readFile(path.join(d, '_astro', n), 'utf8')) + s); };
    const add = (s) => async (d) => { const rel = await bundle(d); await writeFile(path.join(d, rel), (await readFile(path.join(d, rel), 'utf8')) + s); };
    const FIND = [
      ['the index fetched on every page load', add(';fetch("/paieska.json")'), 'nothing is fetched before'],
      ['no prefetch on hover or focus', sub(/\w\.addEventListener\(`pointerenter`,\w\),\w\.addEventListener\(`focus`,\w\),/, ''), 'starts loading the index before the click'],
      ['the index fetched on every open', sub(/(\w)\?\?=fetch\(/, '$1=fetch('), 'fetched once'],
      ['a failed load never retried', sub(/\.catch\(\(\)=>\{\w=null\}\)/, '.catch(()=>{})'), 'next open tries again'],
      ['no Kraunama while it loads', sub(/Kraunama…/, 'Palauk'), 'slow index'],
      ['marks not folded', sub(/\.replace\(\/\\p\{M\}\/gu,``\)/, ''), 'without marks'],
      ['no stem for other endings', sub(/\.length>4\?/, '.length>99?'), 'another ending'],
      ['short words not whole', sub(/\.length<=2\?` `:``/, '.length<=0?` `:``'), 'two-letter'],
      ['sources mixed in with pages', sub(/(return\[\.\.\.\w\.slice\(0,\w-\w\),\.\.\.\w\.slice\(0,\w\)\])/, '$1.sort((a,b)=>b.score-a.score)'), 'pages come first'],
      ['sources pushed off by many pages', sub(/Math\.max\((\w)-(\w)\.length,\w\)/, 'Math.max($1-$2.length,0)'), 'pages come first'],
      ['no cap at 30', sub(/(function \w\(\w,\w,\w=)30\)/, '$1300)'), 'best 30'],
      ['matches not marked', sub(/createElement\(`mark`\)/, 'createElement(`span`)'), 'marks the whole word'],
      ['a section hit links only to the page', sub(/`\$\{(\w)\.u\}#\$\{\1\.h\[\w\]\[1\]\}`/, '`${$1.u}`'), 'section links to it'],
      ['the query rendered as markup', add(';document.addEventListener("input",e=>{e.target.id==="find-q"&&document.querySelector("[data-find-list]").insertAdjacentHTML("beforeend",e.target.value)})'), 'hostile queries'],
      ['arrow keys skip a result', sub(/`ArrowDown`\?1:-1/, '`ArrowDown`?2:-1'), 'arrow keys'],
      ['Esc left to the search box', sub(/(\w)\.key===`Escape`&&\(/, '$1.key===`Esc_`&&('), 'one Esc'],
      ['focus lost after the Meniu', sub(/&&!(\w)\.checkVisibility\(\)&&/, '&&!1&&'), 'back to Meniu'],
      ['a click beside the card ignored', sub(/(\w)\.target===(\w)&&\2\.close\(\)/, '!1'), 'beside the card'],
      ['a same-page result leaves it open', sub(/(\.target\.closest\(`a`\))&&\w\.close\(\)/, '$1&&0'), 'already open closes'],
      ['no link with JavaScript off', sub(/<a class="find" href="\/turinys\/"/, '<a class="find" href="#"', () => 'scenarijai/index.html'), 'JavaScript off'],
      ['a dead link in the index', sub(/"u":"\/[^"#]+\/"/, '"u":"/nera-tokio/"', () => 'paieska.json'), 'every link in the index'],
      ['the sheet wider than a phone', cssAll('.find__dlg{min-width:420px}'), 'fits the screen'],
      ['the page scrolls behind it', cssAll('html:has(.find__dlg[open]){overflow:visible!important}'), 'does not scroll'],
    ];
    /* game-check.mjs: the built game frame broken the same way. */
    const gameJs = async (d) => `_astro/${(await readdir(path.join(d, '_astro'))).find((n) => n.endsWith('.js') && readFileSync(path.join(d, '_astro', n), 'utf8').includes('data-gs-title'))}`;
    const gameHtml = () => 'treniruote/diena-su-telefonu/index.html';
    const gsub = (re, to) => sub(re, to, gameJs);
    const gadd = (s) => async (d) => { const rel = await gameJs(d); await writeFile(path.join(d, rel), (await readFile(path.join(d, rel), 'utf8')) + s); };
    const GAME = [
      ['a second choice charged again', gsub(/!\w\.picks\.has\(\w\)&&\(/, '('), 'a second choice in the step costs nothing'],
      ['the middle ending too generous', gsub(/\*2>=/, '*9>='), 'under half left is the last ending'],
      ['next shown before a choice', gsub(/(\w)\.hidden=!0,(\w)\.classList\.remove\(`is-live`\)/, '$1.hidden=!1,$2.classList.remove(`is-live`)'), 'no next button before a choice'],
      ['next not guarded', gsub(/function (\w)\(\)\{\w\.picks\.has\(\w\[\w\]\.dataset\.step\)&&\(/, 'function $1(){('), 'cannot be skipped'],
      ['two history entries on open', gsub(/history\.pushState\(\{gameShell:1\},``\)/, 'history.pushState({gameShell:1},``),history.pushState({gameShell:2},``)'), 'one history entry'],
      ['popstate does not close it', gsub(/addEventListener\(`popstate`,/, 'addEventListener(`popstate_`,'), 'Esc closes'],
      ["the page's score counts the frame", gsub(/\w\.hasAttribute\(`data-round`\)&&/, '!1&&'), "the page's score does not count"],
      ['focus left behind on a new step', gsub(/,\w\.focus\(\{preventScroll:!0\}\)\}function (\w)\(\w,\w\)/, '}function $1(e,n)'), 'focus returns to the new step heading'],
      ['the sheet cannot fold', gsub(/(\w)\.classList\.toggle\(`is-folded`\)/, '$1.classList.contains(`is-folded`)'), 'the sheet folds'],
      ['something stored', gadd(';localStorage.setItem("x","1")'), 'nothing stored'],
      ['the opener drawn with no showModal check', gsub(/&&typeof \w\.showModal==`function`/, ''), 'no showModal'],
      ['the opener drawn with JavaScript off', sub(/data-game-start hidden/, 'data-game-start', gameHtml), 'JavaScript off: no opener'],
      ['a field in the frame', sub(/<header class="gs__bar"/, '<input><header class="gs__bar"', gameHtml), 'nothing typed'],
      ['a green choice', cssAll('.gs .opt{background:#2e9e4f}'), 'no red or green'],
      ['the stamp gone', cssAll('.gs .stamp{display:none}'), 'is stamped'],
      ['wider than a phone', cssAll('.gs__dock{min-width:700px}'), 'nothing runs sideways at 320x640'],
      ['the page scrolls behind it', cssAll('html:has(.gs[open]){overflow:visible!important}'), 'does not scroll'],
      ['motion under reduced motion', cssAll('@media (prefers-reduced-motion:reduce){.gs__side[data-live]{animation:gs-rise 5s!important}}'), 'reduced motion: the sheet'],
      ['the move below the sheet', cssAll('@media (max-width:49rem){.gs__sidebody{max-height:6rem}}'), 'the move is in sight'],
    ];
    const findRoot = path.join(TMP, 'find');
    const runE2E = (dir, script) => new Promise((ok) => {
      const p = spawn(process.execPath, [path.join(HERE, script), '--root', dir], { stdio: ['ignore', 'pipe', 'pipe'] });
      let out = '';
      p.stdout.on('data', (b) => { out += b; }); p.stderr.on('data', (b) => { out += b; });
      const kill = setTimeout(() => p.kill(), 240000);
      p.on('close', (code) => { clearTimeout(kill); ok({ code, out }); });
    });
    const e2eJobs = (script, list) => [['clean copy', null, null], ...list].map(([name, breakIt, expect], i) => async () => {
      const d = path.join(findRoot, `${script}-${i}`);
      await cp(DIST, d, { recursive: true });
      try { if (breakIt) await breakIt(d); } catch (e) { return say(false, `${script} catches: ${name} (${e.message})`); }
      const { code, out } = await runE2E(d, script);
      if (!breakIt) return say(code === 0, `${script} passes: the clean copy${code === 0 ? '' : ` (${out.split('\n').filter((l) => /^FAIL|Error/.test(l)).slice(0, 3).join(' / ')})`}`);
      const caught = code === 1 && out.split('\n').some((l) => l.startsWith('FAIL') && l.includes(expect));
      say(caught, `${script} catches: ${name}${caught ? '' : ` (exit ${code}; ${out.split('\n').filter((l) => /^FAIL|Error/.test(l)).slice(0, 3).join(' / ') || 'nothing failed'})`}`);
    });
    const jobs = [...e2eJobs('find-e2e.mjs', FIND), ...e2eJobs('game-check.mjs', GAME)];
    const width = Math.max(1, Number(process.argv[process.argv.indexOf('--workers') + 1]) || 6);
    await Promise.all(Array.from({ length: width }, async () => { while (jobs.length) await jobs.shift()(); }));
  }
} finally {
  await rm(TMP, { recursive: true, force: true });
}

console.log(failures ? `${failures} check(s) failed` : 'every mutant caught, and the clean copy passes');
process.exit(failures ? 1 : 0);
