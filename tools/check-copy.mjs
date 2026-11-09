/**
 * Checks that a page's copy reaches the built page word for word.
 *
 *   node tools/check-copy.mjs [--dist dist] [docs/copy/<page>.md ...]
 *
 * With no files it checks every copy file whose page is built (docs/copy/x/y.md is /x/y/,
 * an index.md is its folder, pradzia.md is /, 404.md is /404.html). The copy is read after its
 * first "---" line. Comments, [tikrinti: …] markers, heading numbers, {#anchors}, link targets
 * and the "Main:"/"Second:" labels are dropped. What is left is cut into fragments at sentence
 * ends, bold and link edges, " · ", " – " and table cells, and each fragment must appear in the
 * page's text (title and description included), with no-break spaces read as spaces and no
 * fragment allowed to span two blocks. A fragment of 60 characters or more may not appear on the page
 * more often than in the copy, and no run of lines may stand twice in a row in the copy. Exits 1 and
 * lists every missing or repeated fragment.
 */
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
let dist = 'dist';
const files = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--dist') dist = argv[++i];
  else files.push(argv[i]);
}

const COPY = 'docs/copy';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.md') ? [path.join(d, e.name)] : []));

function builtFile(copyFile) {
  const rel = path.relative(COPY, copyFile).replace(/\\/g, '/').replace(/\.md$/, '');
  if (rel === 'pradzia') return path.join(dist, 'index.html');
  if (rel === '404') return path.join(dist, '404.html');
  return path.join(dist, rel.replace(/(^|\/)index$/, ''), 'index.html');
}

const SEP = '\u0001';

export function fragments(md) {
  const body = md.slice(md.indexOf('\n---\n') + 5);
  const out = [];
  for (let line of body.split('\n')) {
    line = line
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/\[tikrinti:[^\]]*\]/g, ' ')
      .replace(/\{#[^}]+\}/g, '')
      .trim();
    if (!line || /^\|?\s*-{3,}/.test(line) || /^\*\*Mygtukai\*\*$/.test(line)) continue;
    line = line
      .replace(/^#+\s*(\d+\.\s+)?/, '')
      .replace(/^[-*]\s+(Main|Second):\s*/, '')
      .replace(/^([-*]|\d+\.)\s+/, '')
      .replace(/\s*→\s*\S+\s*$/, '')
      .replace(/^\*\*(Puslapio pavadinimas|Aprašas \(meta\)):\*\*\s*/, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, `${SEP}$1${SEP}`)
      .replace(/\*\*/g, SEP)
      .replace(/\*\(|\)\*/g, SEP)
      .replace(/\*/g, '')
      .replace(/\|/g, SEP)
      .replace(/ · /g, SEP)
      .replace(/ – /g, SEP)
      .replace(/(?<=[.!?…:;])\s+/g, SEP);
    for (const f of line.split(SEP)) {
      const t = f.replace(/\s+/g, ' ').trim().replace(/^[,;:–]\s*/, '').replace(/[\s:;,]+$/, '');
      if (/[\p{L}\p{N}]{2}/u.test(t)) out.push(t);
    }
  }
  return out;
}

const INLINE = /^(a|strong|em|b|i|span|abbr|code|small|mark|time|kbd|sup|sub)$/i;
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function pageText(html) {
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const body = html
    .replace(/<(script|style|head)\b[\s\S]*?<\/\1>/gi, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?([a-z0-9]+)\b[^>]*>/gi, (m, tag) => (INLINE.test(tag) ? '' : tag.toLowerCase() === 'br' ? ' ' : '\n'));
  return [title, desc, body].join('\n')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => (e[0] === '#'
      ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : +e.slice(1))
      : ENT[e.toLowerCase()] ?? m))
    .replace(/[  ]/g, ' ')
    .split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
}

// Runs of up to four non-blank lines followed at once by the same run, as a rerun insertion leaves them.
export function doubledRuns(md) {
  const ls = md.slice(md.indexOf('\n---\n') + 5).split('\n').filter((l) => l.trim());
  const out = [];
  for (let k = 1; k <= 4; k++) {
    for (let i = 0; i + 2 * k <= ls.length; i++) {
      if (ls.slice(i, i + k).join('\n') === ls.slice(i + k, i + 2 * k).join('\n')) out.push(ls[i]);
    }
  }
  return out;
}

const list = files.length ? files : walk(COPY);
let bad = 0;
let checked = 0;
for (const f of list) {
  const built = builtFile(f);
  if (!fs.existsSync(built)) { if (files.length) { console.log(`NOT BUILT  ${f} (${built})`); bad++; } continue; }
  checked++;
  const text = pageText(fs.readFileSync(built, 'utf8'));
  const md = fs.readFileSync(f, 'utf8');
  const frags = fragments(md);
  const missing = frags.filter((x) => !text.includes(x));
  // a block inserted twice (an edit script rerun) still passes the check above; counted as substrings on
  // both sides, since a clause the copy repeats inside a longer sentence is on the page as often
  const all = frags.join('\n');
  const repeated = [...new Set(frags.filter((x) => x.length >= 60))].filter((x) => text.split(x).length > all.split(x).length);
  const twice = doubledRuns(md);
  if (missing.length || repeated.length || twice.length) {
    bad++;
    if (missing.length) console.log(`MISSING    ${f} (${missing.length})`);
    for (const m of missing) console.log(`    ${m}`);
    if (repeated.length) console.log(`REPEATED   ${f} (${repeated.length}, more often on the page than in the copy)`);
    for (const m of repeated) console.log(`    ${m}`);
    for (const m of twice) console.log(`TWICE      ${f}: the same lines twice in a row, from „${m.slice(0, 70)}"`);
  } else console.log(`ok         ${f}`);
}
console.log(`${checked} pages checked, ${bad} with problems`);
process.exit(bad ? 1 : 0);
