/**
 * The site's promise, checked against what ships.
 *
 * A privacy guide that tracks its readers, or makes their browser call another server,
 * has lost the argument before it starts, and privacy-minded readers do open the network
 * tab. So the built tree must hold to five things:
 *
 * 1. Nothing is loaded from another server: no font, script, style, image or frame.
 *    Links to other sites are fine; following one is the reader's choice.
 * 2. Nothing is stored in the reader's browser: no cookie, no localStorage, no
 *    IndexedDB, no service worker. That is why the site needs no cookie banner.
 *    The one exception is the shared visit counter, /count.js (Panel count/public/c.js):
 *    every page must load it, and it alone may send a beacon (to https://count.sudievu.lt,
 *    nowhere else) and keep its one localStorage key, which only a visit with ?notrack sets.
 *    The privacy notice says so (docs/copy/privatumo-pranesimas.md).
 * 3. The art never reads its pixels back (getImageData, toDataURL, toBlob, readPixels,
 *    convertToBlob, captureStream). Tor Browser, Mullvad Browser and Firefox with
 *    resistFingerprinting treat that as fingerprinting and prompt the reader or poison
 *    the result. tools/shoot.mjs also watches for these calls at runtime.
 * 4. Nothing needs the CSP loosened: no inline script, no inline style element or
 *    attribute, no event-handler attribute, no data: URI. The CSP in src/layouts/Base.astro
 *    allows only 'self', so any of these would silently break.
 * 5. No SVG anywhere (visual-design.md), and every page carries the CSP below, exactly and
 *    first in <head> after the charset, and its no-referrer policy.
 *
 *   node tools/check-privacy.mjs [dist]
 *
 * It also runs at the end of every `astro build`, after strip-deploy, so a page that
 * breaks the promise fails the build. It reads the built tree because that is what a
 * reader's browser receives.
 *
 * If a library the art uses carries one of the forbidden names in a code path the site
 * never calls, the file can be listed in ALLOW with a reason. The runtime probe in
 * tools/shoot.mjs then stays the proof that the call never happens.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://suktas.lt';

/** The policy every page's CSP meta must carry, directive for directive. A second copy of
 *  Base.astro's on purpose: loosening the policy there must fail the build until it is
 *  loosened here too, by someone who meant it. */
const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://count.sudievu.lt",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
];

/** Built files (paths relative to dist, as globs on the file name) exempt from the JS
 *  name scan, each with its reason. Empty on purpose. */
const ALLOW = [];

/** The visit counter: what it alone may do, and the one server it may talk to. */
const COUNTER = 'count.js';
const COUNTER_MAY = new Set(['uses localStorage', 'sends a beacon']);
const COUNTER_HOST = 'https://count.sudievu.lt/';

const JS_FORBIDDEN = [
  [/\bdocument\.cookie\b/, 'touches cookies'],
  [/\blocalStorage\b/, 'uses localStorage'],
  [/\bsessionStorage\b/, 'uses sessionStorage'],
  [/\bindexedDB\b/, 'uses IndexedDB'],
  [/\bserviceWorker\b/, 'registers a service worker'],
  [/\bsendBeacon\b/, 'sends a beacon'],
  [/\bXMLHttpRequest\b/, 'uses XMLHttpRequest'],
  [/\bWebSocket\b/, 'opens a WebSocket'],
  [/\bEventSource\b/, 'opens an EventSource'],
  [/\bRTCPeerConnection\b/, "opens WebRTC, which exposes the reader's addresses"],
  [/\bgetImageData\b/, 'reads canvas pixels back (getImageData)'],
  [/\btoDataURL\b/, 'reads canvas pixels back (toDataURL)'],
  [/\btoBlob\b/, 'reads canvas pixels back (toBlob)'],
  [/\breadPixels\b/, 'reads WebGL pixels back (readPixels)'],
  [/\bconvertToBlob\b/, 'reads canvas pixels back (convertToBlob)'],
  [/\bcaptureStream\b/, 'captures the canvas as a stream'],
  [/\bfetch\s*\(\s*[`'"](?:https?:)?\/\//, 'fetches from another server'],
  [/\bimport\s*\(\s*[`'"](?:https?:)?\/\//, 'imports code from another server'],
];

/* link rel values that make the browser fetch something. */
const FETCHING_RELS = new Set(['stylesheet', 'preload', 'modulepreload', 'prefetch', 'preconnect', 'dns-prefetch', 'prerender', 'icon', 'apple-touch-icon', 'mask-icon', 'manifest']);
const FRAMES = new Set(['iframe', 'frame', 'object', 'embed', 'applet', 'portal']);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

/** What is wrong with a URL the browser would fetch, or null if nothing is. */
function urlProblem(u) {
  const v = u.trim().replace(/^['"]|['"]$/g, '');
  if (!v) return null;
  if (/^data:/i.test(v)) return `a data: URI, which the CSP refuses (${v.slice(0, 40)}…)`;
  if (v.startsWith('//')) return `loads from another server: ${v}`;
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) {
    if (v === SITE || v.startsWith(SITE + '/')) return null;
    return `loads from another server: ${v}`;
  }
  return null;
}

function attrsOf(s) {
  const out = new Map();
  for (const m of s.matchAll(/([^\s=/>]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g)) {
    out.set(m[1].toLowerCase(), m[2] === undefined ? '' : m[2].replace(/^['"]|['"]$/g, ''));
  }
  return out;
}

function checkHtml(rel, t) {
  const bad = [];
  if (!/<html\b[^>]*\blang\s*=\s*["']?[a-z]{2}/i.test(t)) bad.push(`${rel}: <html> has no lang`);
  const csp = t.match(/<head\b[^>]*>([\s\S]*?)<meta\b([^>]*http-equiv\s*=\s*["']?Content-Security-Policy[^>]*)>/i);
  if (!csp) bad.push(`${rel}: no Content-Security-Policy meta in <head>`);
  else {
    if (csp[1].replace(/<meta\s+charset\s*=\s*["']?[\w-]+["']?\s*\/?>/i, '').trim()) bad.push(`${rel}: something comes before the Content-Security-Policy meta, which governs only what follows it`);
    const policy = (attrsOf(csp[2]).get('content') || '').split(';').map((d) => d.trim().replace(/\s+/g, ' ')).filter(Boolean);
    if (policy.join('; ') !== CSP.join('; ')) bad.push(`${rel}: the Content-Security-Policy is not the site's policy: "${policy.join('; ')}"`);
  }
  if (!/<script\b(?=[^>]*\bsrc="\/count\.js")(?=[^>]*\bdata-site="suktas\.lt")[^>]*>/i.test(t)) bad.push(`${rel}: does not load the visit counter, /count.js with data-site="suktas.lt"`);
  if (!/<meta\b[^>]*name\s*=\s*["']?referrer["']?[^>]*content\s*=\s*["']?no-referrer\b/i.test(t)) bad.push(`${rel}: no "no-referrer" referrer policy`);

  for (const m of t.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    const tag = m[1].toLowerCase();
    const a = attrsOf(m[2]);
    const where = `${rel}: <${tag}>`;
    if (tag === 'svg') bad.push(`${where} inline SVG; nothing drawn on this site is SVG (visual-design.md)`);
    if (FRAMES.has(tag)) bad.push(`${where} embeds another document`);
    if (tag === 'base') bad.push(`${where} a <base> element`);
    if (tag === 'meta' && (a.get('http-equiv') || '').toLowerCase() === 'refresh') bad.push(`${where} a meta refresh, which can send the reader anywhere`);
    if (tag === 'form') bad.push(`${where} a form; the CSP's form-action 'none' refuses every submission`);
    if (tag === 'style') bad.push(`${where} an inline style element, which the CSP refuses`);
    if (tag === 'script') {
      const type = (a.get('type') || '').toLowerCase();
      if (a.has('src')) { const p = urlProblem(a.get('src')); if (p) bad.push(`${where} ${p}`); }
      else if (type !== 'application/ld+json') bad.push(`${where} an inline script, which the CSP refuses`);
    }
    for (const [name, value] of a) {
      if (/^on[a-z]+$/.test(name)) bad.push(`${where} an event-handler attribute (${name}), which the CSP refuses`);
      if (name === 'style') bad.push(`${where} a style attribute, which the CSP refuses: ${JSON.stringify(value.slice(0, 60))}`);
    }
    const fetched = [];
    if (tag === 'link') {
      const rels = (a.get('rel') || '').toLowerCase().split(/\s+/);
      if (rels.some((r) => FETCHING_RELS.has(r))) fetched.push(a.get('href') || '');
      if (a.has('imagesrcset')) fetched.push(...a.get('imagesrcset').split(',').map((s) => s.trim().split(/\s+/)[0]));
    } else if (tag !== 'a' && tag !== 'area') {
      for (const name of ['src', 'poster', 'data', 'background', 'action', 'formaction']) if (a.has(name)) fetched.push(a.get(name));
      if (a.has('srcset')) fetched.push(...a.get('srcset').split(',').map((s) => s.trim().split(/\s+/)[0]));
    }
    if (tag === 'meta' && /^og:|^twitter:/i.test(a.get('property') || a.get('name') || '') && /^https?:/i.test(a.get('content') || '')) {
      const c = a.get('content');
      if (!(c === SITE || c.startsWith(SITE + '/'))) bad.push(`${where} a share image or URL on another server: ${c}`);
    }
    for (const u of fetched) { const p = urlProblem(u); if (p) bad.push(`${where} ${p}`); }
  }
  return bad;
}

function checkCss(rel, t) {
  const bad = [];
  for (const m of t.matchAll(/url\(\s*([^)]*?)\s*\)/gi)) { const p = urlProblem(m[1]); if (p) bad.push(`${rel}: url() ${p}`); }
  for (const m of t.matchAll(/@import\s+(?:url\()?\s*(['"]?)([^'")\s;]+)\1/gi)) { const p = urlProblem(m[2]); if (p) bad.push(`${rel}: @import ${p}`); }
  /* image-set() also takes bare strings, with no url() around them. */
  for (const m of t.matchAll(/image-set\(((?:[^()]|\([^()]*\))*)\)/gi)) {
    for (const s of m[1].matchAll(/(["'])(.*?)\1/g)) { const p = urlProblem(s[2]); if (p) bad.push(`${rel}: image-set() ${p}`); }
  }
  return bad;
}

function checkJs(rel, t) {
  if (ALLOW.some(([glob]) => new RegExp('^' + glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$').test(rel))) return [];
  const bad = JS_FORBIDDEN.filter(([re]) => re.test(t)).map(([, why]) => `${rel}: ${why}`);
  if (rel !== COUNTER) return bad;
  const urls = [...t.matchAll(/(?:https?:)?\/\/[^\s'"`)]+/g)].map((m) => m[0]).filter((u) => !u.startsWith(COUNTER_HOST));
  return [
    ...bad.filter((b) => !COUNTER_MAY.has(b.slice(rel.length + 2))),
    ...urls.map((u) => `${rel}: the counter talks to another server: ${u}`),
  ];
}

/* llms.txt, robots.txt and any manifest or JSON: every absolute URL in them points at this site.
   A font licence names its authors' sites and is left alone. */
function checkText(rel, t) {
  return [...t.matchAll(/(?:\b[a-z][a-z0-9+.-]*:)?\/\/[^\s"'<>)\]]+/gi)].map((m) => urlProblem(m[0])).filter(Boolean).map((p) => `${rel}: ${p}`);
}

/** Returns a list of problems; empty means the tree keeps the promise. */
export async function check(root) {
  const bad = [];
  for (const file of await walk(root)) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const ext = path.extname(file).toLowerCase();
    if (ext === '.svg') { bad.push(`${rel}: an SVG file (visual-design.md)`); continue; }
    if (ext === '.html') bad.push(...checkHtml(rel, await readFile(file, 'utf8')));
    else if (ext === '.css') bad.push(...checkCss(rel, await readFile(file, 'utf8')));
    else if (ext === '.js' || ext === '.mjs') bad.push(...checkJs(rel, await readFile(file, 'utf8')));
    else if (ext === '.json' || ext === '.webmanifest' || (ext === '.txt' && !rel.startsWith('licenses/'))) bad.push(...checkText(rel, await readFile(file, 'utf8')));
  }
  return bad;
}

export default function privacyGate() {
  return {
    name: 'privacy-gate',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const bad = await check(fileURLToPath(dir));
        if (bad.length) {
          for (const b of bad) logger.error(b);
          throw new Error(`privacy gate: ${bad.length} problem(s); the site must keep its own promise`);
        }
        logger.info('privacy gate: nothing from other servers, nothing stored but the counter opt-out, no pixels read back, the counter on every page');
      },
    },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const bad = await check(path.resolve(process.argv[2] || 'dist'));
  for (const b of bad) console.error(b);
  console.log(bad.length ? `privacy gate: ${bad.length} problem(s)` : 'privacy gate: clean');
  process.exit(bad.length ? 1 : 0);
}
