/**
 * Writes dist/paieska.json, the index the header's search reads (src/lib/find.js): every page in the
 * sitemap with its title, description, headings (with their ids, so a hit can land on its section) and
 * the words of its <main>, read from the built pages; then every entry of Šaltiniai (docs/copy/saltiniai.md),
 * each linking to its own line on /saltiniai/. The index is fetched from suktas.lt itself, only when the
 * reader opens the search, and nothing of what they type leaves their browser.
 *
 * It runs on `astro:build:done` after llms.txt and before the strip and the gates. The privacy gate
 * fails any URL in a .json off suktas.lt, so the index carries no scheme or `//` at all: a source is
 * named by its host, and its link is on /saltiniai/.
 *
 *   node tools/search-index.mjs --self-test
 */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { readSources } from '../src/lib/saltiniai.js';
import { search, prepare } from '../src/lib/find.js';

const decode = (s) =>
  s.replace(/&(#x[\da-f]+|#\d+|amp|quot|lt|gt|apos|nbsp);/gi, (_, e) => {
    const named = { amp: '&', quot: '"', lt: '<', gt: '>', apos: "'", nbsp: ' ' };
    if (named[e.toLowerCase()]) return named[e.toLowerCase()];
    return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  });
/** Markup to plain words; `//` goes too, so no line of the index reads as a URL to the privacy gate. */
const text = (html) =>
  decode(html.replace(/<[^>]+>/g, ' '))
    .replace(/(?:\b[a-z][a-z0-9+.-]*:)?\/\//gi, '')
    .replace(/\s+/g, ' ')
    .trim();

/* What kind of page a path is, as the result says it. First match wins. */
const KINDS = [
  ['/scenarijai/', 'Apgaulė'],
  ['/zodynas/', 'Žodynas'],
  ['/temos/', 'Tema'],
  ['/jei-apgavo/', 'Jei apgavo'],
  ['/sustok/', 'Įpročiai'],
  ['/patikra/', 'Patikra'],
  ['/treniruote/', 'Treniruotė'],
  ['/irankiai/', 'Įrankiai'],
  ['/seima/', 'Šeimai'],
  ['/saltiniai/', 'Šaltiniai'],
];
const kindOf = (p) => KINDS.find(([at]) => p.startsWith(at))?.[1] || 'Puslapis';
/* Pages indexed by title and description only: Šaltiniai's entries are indexed one by one below, and the
   changelog and the map only repeat other pages' names (together they were a third of the index). */
const NO_BODY = new Set(['/saltiniai/', '/kas-pasikeite/', '/turinys/']);

export function pageItem(path, html) {
  const title = text(html.match(/<title>([^<]*)<\/title>/)?.[1] || '').replace(/ – Suktas$/, '');
  const d = text(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '');
  // The main column without the "where you are" trail and the "what next" box, which name other pages.
  const main = (html.match(/<main\b[^>]*>([\s\S]*)<\/main>/)?.[1] || '')
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    // The title again and the scenario's meta line (Kanalas, Skaitymo laikas…) make a poor snippet.
    .replace(/<h1\b[\s\S]*?<\/h1>/gi, ' ')
    .replace(/<dl class="meta"[\s\S]*?<\/dl>/gi, ' ')
    .replace(/<section class="up"[\s\S]*?<\/section>/gi, ' ');
  const h = [...main.matchAll(/<h([2-3])\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => [text(m[3]), m[2]]).filter(([t]) => t);
  const k = kindOf(path);
  // „…per „Smart-ID"? Treniruotė": the result already says what kind of page it is.
  const t = title.endsWith(` ${k}`) && /[?!.]$/.test(title.slice(0, -k.length - 1)) ? title.slice(0, -k.length - 1) : title;
  if (NO_BODY.has(path)) return { u: path, k, t, d, h: [], x: '' };
  return { u: path, k, t, d, h, x: text(main) };
}

export function sourceItems(raw) {
  return readSources(raw).entries.map((e) => ({
    u: `/saltiniai/#${e.id}`,
    k: 'Šaltinis',
    t: e.srcName,
    d: text(e.claim),
    h: [],
    x: `${e.id} ${e.kind} ${new URL(e.srcUrl).host}`,
  }));
}

export function build(sitemap, readPage, saltiniai) {
  const bad = [];
  const items = [];
  for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const p = new URL(loc).pathname;
    const html = readPage(p);
    if (!html) { bad.push(`${loc}: no built page`); continue; }
    const it = pageItem(p, html);
    if (!it.t) bad.push(`${loc}: no title`);
    else items.push(it);
  }
  items.push(...sourceItems(saltiniai));
  return { bad, items };
}

export default function searchIndex() {
  return {
    name: 'search-index',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const readPage = (p) => {
          try { return fs.readFileSync(`${root}${p.replace(/^\//, '')}index.html`, 'utf8'); } catch { return null; }
        };
        const { bad, items } = build(fs.readFileSync(`${root}sitemap.xml`, 'utf8'), readPage, fs.readFileSync('docs/copy/saltiniai.md', 'utf8'));
        if (bad.length) {
          for (const b of bad) logger.error(b);
          throw new Error(`paieska.json: ${bad.length} page(s) could not be indexed`);
        }
        const json = JSON.stringify(items);
        fs.writeFileSync(`${root}paieska.json`, json);
        logger.info(`paieska.json: ${items.length} entries, ${Math.round(json.length / 1024)} KB`);
      },
    },
  };
}

function selfTest() {
  const page = (title, body, desc = 'Aprašas.') =>
    `<title>${title} – Suktas</title><meta name="description" content="${desc}"><main><nav>Kita: Slaptažodžiai</nav><h1>${title}</h1><dl class="meta"><dt>Kanalas</dt><dd>skambutis</dd></dl><h2 id="ka-daryti">Ką daryti</h2><p>${body} https://www.example.lt/x</p></main>`;
  const items = [
    pageItem('/scenarijai/kurjeris/', page('Netikras kurjeris', 'Žinutė apie siuntinį ir mokestį.')),
    pageItem('/temos/slaptazodziai/', page('Slaptažodžiai', 'Tvarkyklė ir prieigos raktai.', 'Kaip kurti slaptažodžius.')),
    pageItem('/zodynas/phishing/', page('Phishing', 'Apgaulingas laiškas.')),
  ].map(prepare);
  const sources = sourceItems(fs.readFileSync('docs/copy/saltiniai.md', 'utf8')).map(prepare);
  const all = [...items, ...sources];
  const eq = (a, b, what) => { if (a !== b) throw new Error(`${what}: got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`); };

  eq(items[0].k, 'Apgaulė', 'kind from path');
  eq(pageItem('/treniruote/x/', page('Ką tvirtini? Treniruotė', 'T.')).t, 'Ką tvirtini?', 'a title does not repeat its kind');
  eq(/\/\//.test(JSON.stringify(items)), false, 'no // left in the index');
  eq(items[0].x.includes('Kita:'), false, 'nav dropped from the text');
  eq(/Kanalas|Netikras kurjeris/.test(items[0].x), false, 'the h1 and the meta line are not in the text');
  eq(search(all, 'slaptazodziu')[0]?.it.u, '/temos/slaptazodziai/', 'no marks and another ending still find the page');
  eq(search(all, 'Ką daryti siuntinį')[0]?.href, '/scenarijai/kurjeris/#ka-daryti', 'a heading hit lands on its section');
  eq(search(all, 'kurjeris zuvis').length, 0, 'every word must match');
  eq(search(all, '  ').length, 0, 'an empty query finds nothing');
  eq(search(all, 'F1')[0]?.it.u.startsWith('/saltiniai/#F1'), true, 'a source is found by its number');
  eq(sources.length >= 80, true, 'every source is indexed');
  const smart = search([...sources, prepare(pageItem('/scenarijai/smart-id/', page('Smart-ID sukčiai', 'Tekstas.')))], 'smart id');
  eq(smart[0]?.it.u, '/scenarijai/smart-id/', 'a page comes before the sources that back it up');
  eq(search([prepare(pageItem('/x/', page('Įdiegti programėlę', 'Tekstas.')))], 'id').length, 0, 'a two-letter word matches whole words only');
  eq(smart.length > 1 && smart.slice(1).every((h) => h.it.k === 'Šaltinis'), true, 'the sources follow it');
  const many = Array.from({ length: 40 }, (_, i) => prepare(pageItem(`/scenarijai/s${i}/`, page(`Smart-ID ${i}`, 'Tekstas.'))));
  const crowd = search([...sources, ...many], 'smart id');
  eq(crowd.length, 30, 'forty matching pages still fill the list to thirty');
  eq(crowd.slice(0, 25).every((h) => h.it.k !== 'Šaltinis') && crowd.slice(25).every((h) => h.it.k === 'Šaltinis'), true, 'forty matching pages leave the last five places to sources');
  console.log(`search-index self-test: ok (${all.length} entries)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1] && process.argv.includes('--self-test')) selfTest();
