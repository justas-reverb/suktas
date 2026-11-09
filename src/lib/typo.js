/**
 * Lithuanian typesetting, applied to the page's copy at build time.
 *
 * - A short word (a, o, ir, į, iš, už, su, ar, be, po, ne, nuo, per, prie ...) never ends a
 *   line: a no-break space follows it.
 * - A spaced en dash is glued to the word before it, so a line never starts with a dash.
 * - A number keeps its unit (15 min., 2026 m.) on the same line, and its digit groups (150 000) together.
 * - A name of two or three words (uBlock Origin, Google Play) is not split across lines.
 *
 * `nbHtml` leaves the tags alone and touches only the text between them.
 */
const NB = ' ';

const SHORT = [
  'a', 'o', 'ir', 'į', 'iš', 'už', 'su', 'ar', 'be', 'po', 'ne', 'nuo', 'per', 'prie', 'apie',
  'tu', 'jį', 'ją', 'kad', 'kai', 'tai', 'yra', 'kaip', 'jei', 'bet', 'čia', 'ten', 'vis', 'tik', 'jau',
];
const SHORT_RE = new RegExp(`(?<=^|[\\s(„“"])(${SHORT.join('|')})\\s+(?=\\S)`, 'giu');
const UNIT_RE = /(\d)\s+(min\.|val\.|d\.|m\.|proc\.|€|%|km|kg|mėn\.)/gu;
const NAMES = ['uBlock Origin Lite', 'uBlock Origin', 'Brave Search', 'Google Play', 'Google TV', 'Android TV', 'Roku TV', 'Organic Maps', 'Accounts Center', 'Location Services', 'Chrome 138', 'Manifest V3', 'Spot marker', 'TV Remote', 'Šiaulių bankas', 'Iki galo'];
const NAMES_RE = new RegExp(NAMES.map((n) => n.replace(/ /g, '[ ]')).join('|'), 'gu');

export function nb(text) {
  return text
    .replace(NAMES_RE, (m) => m.replace(/ /g, NB))
    .replace(/ – /g, `${NB}– `)
    .replace(UNIT_RE, `$1${NB}$2`)
    .replace(/(\d) (?=\d{3}\b)/gu, `$1${NB}`)
    .replace(SHORT_RE, `$1${NB}`);
}

/*
 * Syntax colouring (scheme B, chosen 2026-11-02): `nbHtml` also wraps what a reader must not miss in
 * <span class="tk tk--<kind>">, styled by src/styles/syntax.css. The words stay exactly as written.
 * The first PIN1, PIN2 or "phishing" on a page then links to the page that explains it; that is done on
 * the built page by tools/term-links.mjs (`linkTerms` below), since only the whole page knows "first".
 * Addresses are coloured, never linked: many are a scammer's sender shown as an example.
 */
const S = '[ \u00a0]';
const TOKENS = [
  ['mail', /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/],
  ['web', /\b(?:[a-z0-9-]+\.)+(?:lt|com|eu|org|net)\b(?:\/[^\s<,;)]*)?/],
  ['money', new RegExp(`(?<!\\d)(?:\\d+(?:${S}\\d{3})*(?:,\\d+)?–)?\\d+(?:${S}\\d{3})*(?:,\\d+)?${S}?(?:eurų|eurai|euro|eurus|€)`)],
  ['num', new RegExp(`(?<!\\d)(?:\\d+(?:,\\d+)?–)?\\d+(?:,\\d+)?${S}?(?:proc\\.|%)`)],
  ['date', new RegExp(`\\d{4}-\\d{2}-\\d{2}|(?:\\d{4}–)?\\d{4}${S}m\\.`)],
  ['code', new RegExp(`\\bPIN[12]?\\b|\\bPUK\\b|\\bSMS(?=${S}kod)`)],
  ['phone', new RegExp(`(?<!\\d)112(?!\\d)|\\+370(?:${S}?\\d){8}`)],
  ['term', /\b[Pp]hishing\w*/],
  ['str', /„[^„“<]{1,60}“/],
];
const TOKEN_RE = new RegExp(TOKENS.map(([k, re]) => `(?<${k}>${re.source})`).join('|'), 'gu');
/* A term with a page that says what it means: [kind, text test, page]. */
export const TERMS = [
  ['code', /^PIN[12]?$/, '/sustok/kodai-ir-pin/'],
  ['term', /^phishing/i, '/zodynas/phishing/'],
];

const colour = (text) => text.replace(TOKEN_RE, (m, ...args) => {
  const kind = Object.entries(args.at(-1)).find(([, v]) => v !== undefined)[0];
  return `<span class="${kind === 'date' ? 'nw ' : ''}tk tk--${kind}">${m}</span>`;
});
const textOnly = (html, fn) => html.split(/(<[^>]+>)/).map((part) => (part.startsWith('<') ? part : fn(part))).join('');

export function nbHtml(html) {
  return textOnly(html, (text) => colour(nb(text)));
}

/*
 * A source line ("Lietuvos bankas (lb.lt, 2024-10-25): …") with its source's name in bold: the text before its
 * first ":" outside quotes and brackets, cut at a ", " that starts a date or a topic; failing that, a leading
 * „name“ or acronym. The bracketed outlet and date stay plain.
 */
const SRC_LEAD = /^(?:\([^)]*\)|„[^“]*“|[^:(„<])+?(?=, [\d\p{Ll}]|:)|^(?:„[^“]*“|\p{Lu}{2,}\b)/u;
const NOT_NAMES = ['Prašymas']; // lines that go on from the line above and name no source of their own
export function sourceName(line) {
  const lead = line.match(SRC_LEAD)?.[0] ?? '';
  if (NOT_NAMES.includes(lead)) return line;
  const bold = lead.split(/(\([^)]*\))/).map((p) => (p.startsWith('(') ? p
    : p.replace(/^([\s,;]*(?:ir )?)(.*?)(\s*)$/s, (m, a, b, c) => (b ? `${a}<b class="src-name">${b}</b>${c}` : m)))).join('');
  return bold + line.slice(lead.length);
}
export const sourceHtml = (line) => nbHtml(sourceName(line));

/** Colours the tokens in every heading still without any; headings take their text from many components, so this runs on the built page. */
export function colourHeadings(html) {
  return html.replace(/(<h[1-6]\b[^>]*>)([\s\S]*?)(<\/h[1-6]>)/g, (m, open, inner, close) =>
    (inner.includes('tk--') ? m : open + textOnly(inner, colour) + close));
}

/** Wraps the first token of each term inside <main>, outside any link, in a link to its page (unless this is that page). */
export function linkTerms(html, pathname) {
  const start = html.indexOf('<main');
  const end = html.lastIndexOf('</main>');
  if (start < 0 || end < 0) return html;
  const seen = new Set();
  let depth = 0;
  const body = html.slice(start, end).replace(/<a[\s>]|<\/a>|<span class="tk tk--(\w+)">([^<]*)<\/span>/g, (m, kind, text) => {
    if (!kind) { depth += m[1] === '/' ? -1 : 1; return m; }
    const term = TERMS.find(([k, re]) => k === kind && re.test(text));
    if (!term || depth || term[2] === pathname || seen.has(term[2] + text)) return m;
    seen.add(term[2] + text);
    return `<a class="tk-term" href="${term[2]}">${m}</a>`;
  });
  return html.slice(0, start) + body + html.slice(end);
}
