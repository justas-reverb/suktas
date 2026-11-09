/**
 * The day each page's own words last changed, for the sitemap's <lastmod>.
 *
 * Search engines stop trusting a site's dates once they prove wrong, so a date here means one
 * thing: the last commit (its day in Vilnius) that changed the words of the page itself. A
 * restyle, a class or markup change, and the shared chrome (header, footer, the components and
 * layouts every page uses) never move it. The words are the text the page's index.astro holds:
 * its text between tags, its strings (the frontmatter's arrays of copy included) and the
 * attributes that carry words (alt, title, a component's lead or description). Imports, tag and
 * attribute names, class, id, href and src, comments, styles, scripts and strings that read as an
 * identifier or a path are left out. A file the page reads its copy from (readFileSync, as
 * /saltiniai/ reads docs/copy/saltiniai.md) counts too, without its comments.
 *
 * The VPS builds from `git archive`, with no history, so the dates are worked out here and
 * committed in src/data/page-dates.json. A page whose words changed and are not committed yet
 * gets today: run this, then commit the page and the file together.
 *
 *   node tools/page-dates.mjs              write src/data/page-dates.json from git
 *   node tools/page-dates.mjs --check      exit 1 when the file disagrees with git
 *   node tools/page-dates.mjs --self-test  prove the rules on a throwaway repository
 *
 * It also runs in every `astro build`: the check at the start (skipped, with a warning, where
 * there is no git history, as on the VPS), and at the end dist/sitemap.xml must carry exactly
 * the file's dates, none where it has none.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parse } from '@astrojs/compiler-rs';

const OUT = 'src/data/page-dates.json';
const SKIP_ATTR = /^(class|class:list|style|id|href|src|srcset|sizes|rel|data-.*)$/;
// shortcut: a lone lower-case ASCII word in a string reads as code and is skipped; widen it if copy ever is one.
const CODE_LIKE = /^[a-z0-9_\-\/#.:?=&%+@~]*$/;

export const vilniusDay = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vilnius' }).format(new Date(d));

const clean = (s) => s
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
  .replace(/&nbsp;| /g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

/** The words of one file, and the files it reads its copy from. null when it does not parse. */
export function wordsOf(source, file) {
  if (!file.endsWith('.astro')) return { text: clean(source), reads: [] };
  const { ast, diagnostics } = parse(source);
  if (diagnostics.some((d) => d.severity === 'error' || d.severity === 1)) return null;
  const words = [];
  const reads = [];
  const add = (s) => {
    const t = clean(String(s));
    if (/\p{L}/u.test(t) && !CODE_LIKE.test(t)) words.push(t);
  };
  (function walk(n) {
    if (Array.isArray(n)) return n.forEach(walk);
    if (!n || typeof n !== 'object') return;
    const t = n.type || '';
    if (t === 'AstroScript' || t.startsWith('TS')) return;
    if (t === 'JSXElement' && ['style', 'script'].includes(n.openingElement.name.name)) return;
    if (t === 'JSXAttribute') {
      const name = n.name.namespace ? `${n.name.namespace.name}:${n.name.name.name}` : n.name.name;
      if (SKIP_ATTR.test(name)) return;
    }
    if (t === 'CallExpression' && (n.callee.property?.name ?? n.callee.name) === 'readFileSync'
      && typeof n.arguments[0]?.value === 'string') reads.push(n.arguments[0].value);
    if (t === 'Literal' && typeof n.value === 'string') add(n.value);
    if (t === 'TemplateElement') add(n.value.cooked ?? n.value.raw);
    if (t === 'JSXText') add(n.value);
    for (const k of Object.keys(n)) if (!['type', 'start', 'end', 'raw', 'comments', 'source'].includes(k)) walk(n[k]);
  })(ast);
  return { text: words.join('\n'), reads };
}

const git = (root, args) => {
  const r = spawnSync('git', ['-c', 'core.quotepath=off', ...args], { cwd: root, encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error(`git ${args.join(' ')}: ${(r.stderr || r.error || '').toString().trim()}`);
  return r.stdout;
};

/** True only where this folder is the top of a full git checkout (not the VPS's archive). */
export function hasHistory(root) {
  const r = spawnSync('git', ['rev-parse', '--show-toplevel', '--is-shallow-repository'], { cwd: root, encoding: 'utf8' });
  if (r.status !== 0) return false;
  const [top, shallow] = r.stdout.trim().split('\n');
  return path.resolve(top) === path.resolve(root) && shallow === 'false';
}

/** The day the words of one file last changed: today if they differ from HEAD, null if it does not exist. */
function lastChange(root, file, today) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) return null;
  const now = wordsOf(fs.readFileSync(abs, 'utf8'), file)?.text;
  // --follow alone leaves out every merge, so words first made by a merge would match no version.
  // shortcut: words a merge took from one side, past a newer side commit with other words, get the merge's day; walk parents if that ever matters.
  const versions = git(root, ['log', '--follow', '-m', '--format=%x01%H %cI', '--name-only', '--', file])
    .split('\x01').slice(1).map((c) => {
      const [head, ...rest] = c.trim().split('\n');
      const [sha, date] = head.split(' ');
      return { sha, date, at: rest.filter(Boolean).pop() };
    });
  const at = (v) => {
    try { return wordsOf(git(root, ['show', `${v.sha}:${v.at}`]), v.at)?.text; } catch { return undefined; }
  };
  if (now === undefined || !versions.length || at(versions[0]) !== now) return today;
  let date = versions[0].date;
  for (const v of versions.slice(1)) {
    if (at(v) !== now) break;
    date = v.date;
  }
  return vilniusDay(date);
}

export function listPages(root) {
  const found = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.name.startsWith('_')) continue;
      if (e.isDirectory()) walk(rel);
      else if (e.name === 'index.astro') found.push(rel);
    }
  })('src/pages');
  return found.map((file) => ({ url: file.slice('src/pages'.length, -'index.astro'.length), file }));
}

/** { '/path/': 'YYYY-MM-DD' } for every page, from git and the working tree. */
export function compute(root, today = vilniusDay(Date.now())) {
  const dates = {};
  for (const { url, file } of listPages(root).sort((a, b) => a.url.localeCompare(b.url))) {
    const reads = wordsOf(fs.readFileSync(path.join(root, file), 'utf8'), file)?.reads ?? [];
    const days = [file, ...reads].map((f) => lastChange(root, f, today));
    if (days.includes(null)) throw new Error(`${file} reads a file that does not exist: ${reads.join(', ')}`);
    dates[url] = days.sort().pop();
  }
  return dates;
}

const read = (root) => {
  try { return JSON.parse(fs.readFileSync(path.join(root, OUT), 'utf8')); } catch { return {}; }
};

/** Every way the committed file disagrees with git, as sentences. */
export function check(root, today) {
  const want = compute(root, today);
  const have = read(root);
  return [...new Set([...Object.keys(want), ...Object.keys(have)])].sort()
    .filter((u) => want[u] !== have[u])
    .map((u) => `${u}: ${OUT} says ${have[u] ?? 'nothing'}, its words last changed ${want[u] ?? 'never (no such page)'}`);
}

/** Every way a built sitemap differs from the dates: a <lastmod> must be the file's date, and absent where it has none. */
export function checkSitemap(xml, dates) {
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  if (!urls.length) return ['the sitemap lists no pages'];
  return urls.flatMap((u) => {
    const loc = new URL(u.match(/<loc>([^<]+)<\/loc>/)[1]).pathname;
    const got = u.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1];
    return got === dates[loc] ? [] : [`sitemap ${loc}: <lastmod> ${got ?? 'missing'}, ${OUT} says ${dates[loc] ?? 'nothing'}`];
  });
}

export default function pageDates() {
  const root = process.cwd();
  return {
    name: 'page-dates',
    hooks: {
      'astro:build:start': ({ logger }) => {
        if (!hasHistory(root)) return logger.warn('page dates: no git history here, so the committed dates are used unchecked');
        const bad = check(root);
        if (bad.length) {
          for (const b of bad) logger.error(b);
          throw new Error(`page dates: ${bad.length} page(s) out of date; run node tools/page-dates.mjs and commit ${OUT}`);
        }
        logger.info('page dates: every page carries the day its words last changed');
      },
      'astro:build:done': ({ dir, logger }) => {
        const bad = checkSitemap(fs.readFileSync(new URL('sitemap.xml', dir), 'utf8'), read(root));
        if (bad.length) {
          for (const b of bad) logger.error(b);
          throw new Error(`page dates: the sitemap's <lastmod> disagrees with ${OUT}`);
        }
        logger.info('page dates: the sitemap carries exactly the committed dates');
      },
    },
  };
}

function selfTest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'suktas-dates-'));
  let failures = 0;
  const say = (ok, msg) => { if (!ok) failures++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); };
  const g = (args, date) => {
    const env = { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date };
    const r = spawnSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@example.com', '-c', 'commit.gpgsign=false', ...args], { cwd: dir, env, encoding: 'utf8' });
    if (r.status !== 0) throw new Error(r.stderr);
  };
  const put = (rel, s) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), s); };
  const commit = (date) => { g(['add', '-A']); g(['commit', '-q', '-m', date], date); };
  const page = (cls, copy, extra = '') => `---\nimport Page from '../../layouts/Page.astro';\n${extra}const items = [${copy.map((c) => `'${c}'`).join(', ')}];\n---\n<Page title="Puslapis – Suktas" description="Apie ką puslapis.">\n  <section class="${cls}" id="pirmas">\n    <h1>Antraštė</h1>\n    <img src="/a.webp" alt="Ragelis ant stalo" />\n    {items.map((i) => <p class="${cls}__p">{i}</p>)}\n  </section>\n</Page>\n<style>p { color: red; }</style>\n`;
  try {
    g(['init', '-q']);
    put('src/layouts/Page.astro', '<slot />');
    put('src/pages/a/index.astro', page('wrap', ['Pirmas sakinys.', 'Antras sakinys.']));
    put('src/pages/b/index.astro', "---\nimport fs from 'node:fs';\nconst raw = fs.readFileSync('docs/b.md', 'utf8');\n---\n<p>{raw}</p>\n");
    put('docs/b.md', '# Šaltiniai\n\n- Teiginys. <!-- F1 -->\n');
    put('src/pages/_seni/index.astro', '<p>Senas.</p>');
    commit('2026-01-01T10:00:00+02:00');
    say(compute(dir, 'TODAY')['/a/'] === '2026-01-01', 'a new page gets the day of its first commit');
    say(!('/_seni/' in compute(dir, 'TODAY')), 'a page Astro does not route is left out');

    put('src/pages/a/index.astro', page('wrap wrap--wide', ['Pirmas sakinys.', 'Antras sakinys.'], "import '../../styles/a.css';\n// why\n").replace('id="pirmas"', 'id="kitas"').replace('/a.webp', '/b.webp').replace('color: red', 'color: blue').replace('<h1>', '<!-- note -->\n<h1 class="big">'));
    put('src/layouts/Page.astro', '<header>Nauja antraštė visiems</header><slot />');
    commit('2026-02-01T10:00:00+02:00');
    say(compute(dir, 'TODAY')['/a/'] === '2026-01-01', 'classes, ids, src, imports, comments, styles and the shared layout move nothing');

    put('src/pages/a/index.astro', page('wrap wrap--wide', ['Pirmas sakinys.', 'Pakeistas sakinys.'], "import '../../styles/a.css';\n// why\n").replace('id="pirmas"', 'id="kitas"').replace('/a.webp', '/b.webp').replace('color: red', 'color: blue').replace('<h1>', '<!-- note -->\n<h1 class="big">'));
    commit('2026-03-01T23:30:00Z');
    say(compute(dir, 'TODAY')['/a/'] === '2026-03-02', 'a changed string in the frontmatter moves it, to the day in Vilnius (23:30 UTC is the next day)');

    put('docs/b.md', '# Šaltiniai\n\n- Teiginys pakeistas. <!-- F1 -->\n');
    commit('2026-04-01T10:00:00+03:00');
    put('docs/b.md', '# Šaltiniai\n\n- Teiginys pakeistas.   <!-- F1 F2 -->\n');
    commit('2026-05-01T10:00:00+03:00');
    say(compute(dir, 'TODAY')['/b/'] === '2026-04-01', 'the file a page reads its copy from counts, its comments and spacing do not');

    g(['mv', 'src/pages/a', 'src/pages/c']);
    commit('2026-06-01T10:00:00+03:00');
    say(compute(dir, 'TODAY')['/c/'] === '2026-03-02', 'a moved page keeps the day of its words');

    put('src/pages/c/index.astro', fs.readFileSync(path.join(dir, 'src/pages/c/index.astro'), 'utf8').replace('Ragelis ant stalo', 'Telefonas ant stalo'));
    say(compute(dir, 'TODAY')['/c/'] === 'TODAY', 'an uncommitted change of words (an alt text) gets today');
    g(['checkout', '-q', '--', 'src/pages/c/index.astro']);
    put('src/pages/c/index.astro', fs.readFileSync(path.join(dir, 'src/pages/c/index.astro'), 'utf8').replace('wrap wrap--wide', 'wrap'));
    say(compute(dir, 'TODAY')['/c/'] === '2026-03-02', 'an uncommitted class change does not');
    put('src/pages/d/index.astro', '<h1>Naujas puslapis</h1>');
    say(compute(dir, 'TODAY')['/d/'] === 'TODAY', 'a page not committed yet gets today');

    fs.rmSync(path.join(dir, 'src/pages/d'), { recursive: true });
    put(OUT, JSON.stringify(compute(dir, 'TODAY')));
    say(check(dir, 'TODAY').length === 0, 'the check passes on the file it wrote');
    put('src/pages/b/index.astro', "---\nimport fs from 'node:fs';\nconst raw = fs.readFileSync('docs/b.md', 'utf8');\n---\n<p>Įžanga.</p><p>{raw}</p>\n");
    commit('2026-07-01T10:00:00+03:00');
    say(check(dir, 'TODAY').some((b) => b.startsWith('/b/:')), 'the check fails when a page\'s words changed and the file was not refreshed');

    const lines = (a, b) => `<p>${a}</p>\n<p>Vidurys.</p>\n<p>Tarpas.</p>\n<p>Dar tarpas.</p>\n<p>${b}</p>\n`;
    put('src/pages/e/index.astro', lines('Pirma.', 'Paskutinė.'));
    commit('2026-08-01T10:00:00+03:00');
    g(['checkout', '-q', '-b', 'side']);
    put('src/pages/e/index.astro', lines('Pirma iš šalies.', 'Paskutinė.'));
    commit('2026-08-02T10:00:00+03:00');
    g(['checkout', '-q', '-']);
    put('src/pages/e/index.astro', lines('Pirma.', 'Paskutinė pagrindinėje.'));
    commit('2026-08-03T10:00:00+03:00');
    g(['merge', '-q', '--no-ff', '-m', 'merge', 'side'], '2026-08-04T10:00:00+03:00');
    say(compute(dir, 'TODAY')['/e/'] === '2026-08-04', 'words first made by a merge, unlike either parent, get the merge\'s day, not today');

    put('src/pages/f/index.astro', '<p>Senas sakinys.</p>\n');
    commit('2026-09-01T10:00:00+03:00');
    g(['checkout', '-q', '-b', 'side2']);
    put('src/pages/f/index.astro', '<p>Naujas sakinys.</p>\n');
    commit('2026-09-02T10:00:00+03:00');
    g(['checkout', '-q', '-']);
    put('src/pages/g/index.astro', '<p>Kitas puslapis.</p>\n');
    commit('2026-09-03T10:00:00+03:00');
    g(['merge', '-q', '--no-ff', '-m', 'merge', 'side2'], '2026-09-04T10:00:00+03:00');
    say(compute(dir, 'TODAY')['/f/'] === '2026-09-02', 'words a merge only carried over keep the day of the commit that wrote them');

    const xml = (lm) => `<urlset><url><loc>https://suktas.lt/</loc>${lm}</url></urlset>`;
    say(checkSitemap(xml('<lastmod>2026-01-01</lastmod>'), { '/': '2026-01-01' }).length === 0, 'the sitemap check passes on matching dates');
    say(checkSitemap(xml('<lastmod>2026-10-26</lastmod>'), {}).length === 1, 'the sitemap check fails on a date where the file has none (no falling back to today)');
    say(checkSitemap(xml(''), { '/': '2026-01-01' }).length === 1, 'the sitemap check fails on a missing date');
    say(checkSitemap(xml('<lastmod>2026-01-02</lastmod>'), { '/': '2026-01-01' }).length === 1, 'the sitemap check fails on a wrong date');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  console.log(failures ? `page dates self-test: ${failures} failed` : 'page dates self-test: every rule holds');
  return failures;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.cwd();
  if (process.argv.includes('--self-test')) process.exit(selfTest() ? 1 : 0);
  if (process.argv.includes('--check')) {
    const bad = check(root);
    for (const b of bad) console.error(b);
    console.log(bad.length ? `page dates: ${bad.length} page(s) out of date; run node tools/page-dates.mjs` : 'page dates: in step with git');
    process.exit(bad.length ? 1 : 0);
  }
  const dates = compute(root);
  fs.mkdirSync(path.dirname(path.join(root, OUT)), { recursive: true });
  fs.writeFileSync(path.join(root, OUT), JSON.stringify(dates, null, 2) + '\n');
  console.log(`page dates: ${Object.keys(dates).length} pages written to ${OUT}`);
}
