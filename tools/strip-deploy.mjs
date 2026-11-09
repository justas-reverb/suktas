/**
 * What reaches the server is the site, and nothing else.
 *
 * The standing rule for every site we deploy: no
 * markdown, no notes and no reasoning comments on the server, ever. Adapted from the
 * Portfolio's tools/strip-deploy.mjs (its D231), without the PHP half, which this site
 * does not have, and with SVG refused outright (visual-design.md: nothing drawn is SVG).
 *
 * It runs on `astro:build:done`, so every build is what ships:
 *
 * - `.js`, `.mjs`, `.css` outside `_astro/`: esbuild's transform drops every comment,
 *   legal ones included, and prints the code back with its whitespace minified.
 *   `_astro/` is the bundler's own output; the gate checks it rather than trusting it.
 * - `.html`: the same for each inline script or style, and the markup's comments removed.
 * - `.xml`: comments removed.
 * - `.htaccess`: comment lines dropped.
 *
 * Then the gate. A markdown file anywhere, a file of a kind this does not know, a `.txt`
 * that is not a licence, robots.txt or llms.txt, a `.json` or `.webmanifest` that does not
 * parse, or a comment left in anything it can read (`.txt` included), fails the build, so a
 * slip stops the deploy rather than reaching the server.
 *
 *   node tools/strip-deploy.mjs <dir>          strip a tree in place, then gate it
 *   node tools/strip-deploy.mjs --gate <dir>   only the gate
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

/* Every kind of file the server is meant to hold. A kind that is not here fails the
   gate: the list is what makes "nothing else" something a build can check. */
const TEXT = new Set(['.html', '.js', '.mjs', '.css', '.xml', '.json', '.webmanifest', '.txt']);
const BINARY = new Set(['.woff2', '.woff', '.ttf', '.otf', '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.ico', '.mp4']);
/* A .txt could be a note. These are the ones that are not: robots.txt, llms.txt (tools/llms-txt.mjs), and each font's
   licence, which has to travel with the font. Exact paths, so a note cannot pass by being named like a licence;
   a new font adds its licence here. */
const TXT_OK = new Set([
  'robots.txt',
  'llms.txt',
  'licenses/OFL-Atkinson-Hyperlegible-Next.txt',
  'licenses/OFL-Young-Serif.txt',
]);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const kindOf = (file) => (path.basename(file) === '.htaccess' ? '.htaccess' : path.extname(file).toLowerCase());
const inBundle = (rel) => rel.split('/')[0] === '_astro';

async function js(code) {
  return (await transform(code, { loader: 'js', legalComments: 'none', charset: 'utf8', minifyWhitespace: true })).code.trimEnd();
}
async function css(code) {
  return (await transform(code, { loader: 'css', legalComments: 'none', charset: 'utf8', minifyWhitespace: true })).code.trimEnd();
}

const JS_TYPES = /^(|module|text\/javascript|application\/javascript)$/i;
async function html(t) {
  const out = [];
  let at = 0;
  for (const m of t.matchAll(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    out.push(t.slice(at, m.index).replace(/<!--[\s\S]*?-->/g, ''));
    const [whole, tag, attrs, body] = m;
    let inner = body;
    if (body.trim()) {
      if (tag.toLowerCase() === 'style') inner = await css(body);
      else {
        const type = (/\btype\s*=\s*["']?([^"'\s>]*)/i.exec(attrs) || [])[1] || '';
        if (JS_TYPES.test(type)) inner = await js(body);
      }
    }
    out.push(`<${tag}${attrs}>${inner}</${tag}>`);
    at = m.index + whole.length;
  }
  out.push(t.slice(at).replace(/<!--[\s\S]*?-->/g, ''));
  return out.join('');
}

/** Strip one tree in place. Returns [files changed, bytes before, bytes after]. */
export async function strip(root) {
  let changed = 0, before = 0, after = 0;
  for (const file of await walk(root)) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const kind = kindOf(file);
    if (inBundle(rel) && kind !== '.html') continue;
    if (!TEXT.has(kind) && kind !== '.htaccess') continue;
    const t = await readFile(file, 'utf8');
    let next = null;
    if (kind === '.js' || kind === '.mjs') next = (await js(t)) + '\n';
    else if (kind === '.css') next = (await css(t)) + '\n';
    else if (kind === '.html') next = await html(t);
    else if (kind === '.xml') next = t.replace(/<!--[\s\S]*?-->/g, '');
    else if (kind === '.htaccess') {
      next = t.replace(/\r\n/g, '\n').split('\n').filter((l) => !/^\s*#/.test(l)).join('\n').replace(/\n{3,}/g, '\n\n');
    }
    if (next !== null && next !== t) {
      await writeFile(file, next, 'utf8');
      changed++;
      before += Buffer.byteLength(t);
      after += Buffer.byteLength(next);
    }
  }
  return [changed, before, after];
}

/* What the gate reads as a comment, per kind. Deliberately simpler than the strip: a
   second, independent reading, so the gate is not the strip agreeing with itself. A
   `//` counts only after whitespace or punctuation, which keeps `https://` out. */
const BLOCK = /\/\*[\s\S]*?\*\//g;
const MARKUP = /<!--[\s\S]*?-->/g;
const LINE = /(^|[\s;{}(),])\/\/[^\n]*/g;
function commentsIn(kind, t, rel) {
  const found = [];
  const add = (re) => { for (const m of t.matchAll(re)) found.push(m[0].trim().slice(0, 80)); };
  if (kind === '.html') {
    add(MARKUP);
    for (const m of t.matchAll(/<(script|style)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
      for (const c of m[2].matchAll(BLOCK)) found.push(c[0].slice(0, 80));
      if (m[1].toLowerCase() === 'script') for (const c of m[2].matchAll(LINE)) found.push(c[0].trim().slice(0, 80));
    }
  } else if (kind === '.js' || kind === '.mjs') { add(BLOCK); add(LINE); }
  else if (kind === '.css') add(BLOCK);
  else if (kind === '.xml') add(MARKUP);
  else if (kind === '.htaccess') { for (const m of t.matchAll(/^\s*#.*$/gm)) found.push(m[0].trim().slice(0, 80)); }
  else if (kind === '.txt') { add(MARKUP); if (rel === 'robots.txt') for (const m of t.matchAll(/^\s*#.*$/gm)) found.push(m[0].trim().slice(0, 80)); }
  return found;
}

/** The gate. Returns a list of reasons; empty means the tree may ship. */
export async function gate(root) {
  const bad = [];
  for (const file of await walk(root)) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const base = path.basename(file);
    const kind = kindOf(file);
    if (/\.(md|markdown)$/i.test(base)) { bad.push(`${rel}: markdown never goes onto the server`); continue; }
    if (kind === '.svg') { bad.push(`${rel}: an SVG; nothing drawn on this site is SVG (visual-design.md)`); continue; }
    if (kind !== '.htaccess' && !TEXT.has(kind) && !BINARY.has(kind)) { bad.push(`${rel}: a kind of file the server is not meant to hold (${kind || 'no extension'})`); continue; }
    if (kind === '.txt' && !TXT_OK.has(rel)) { bad.push(`${rel}: a .txt that is not robots.txt, llms.txt or a listed font licence (a note?)`); continue; }
    if (BINARY.has(kind)) continue;
    const t = await readFile(file, 'utf8');
    if (kind === '.json' || kind === '.webmanifest') {
      try { JSON.parse(t); } catch { bad.push(`${rel}: not JSON, which has no comments, so a slip shows up here`); }
      continue;
    }
    const found = commentsIn(kind, t, rel);
    if (found.length) bad.push(`${rel}: ${found.length} comment(s) left, first ${JSON.stringify(found[0])}`);
  }
  return bad;
}

export default function stripForServer() {
  return {
    name: 'strip-for-server',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const [n, before, after] = await strip(root);
        logger.info(`${n} files stripped of comments, ${before} -> ${after} bytes`);
        const bad = await gate(root);
        if (bad.length) {
          for (const b of bad) logger.error(b);
          throw new Error(`strip-deploy gate: ${bad.length} file(s) must not reach the server`);
        }
        logger.info('strip-deploy gate: nothing but the site');
      },
    },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const gateOnly = args[0] === '--gate';
  const dir = path.resolve(args[gateOnly ? 1 : 0] || 'dist');
  if (!gateOnly) {
    const [n, before, after] = await strip(dir);
    console.log(`${n} files stripped of comments, ${before} -> ${after} bytes`);
  }
  const bad = await gate(dir);
  for (const b of bad) console.error(b);
  console.log(bad.length ? `strip-deploy gate: ${bad.length} problem(s)` : 'strip-deploy gate: nothing but the site');
  process.exit(bad.length ? 1 : 0);
}
