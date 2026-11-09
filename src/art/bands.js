/**
 * The page bands' families: which scam a page is about decides the band's colours, its numbers and how they move.
 * One shader (src/art/hero/k.frag.glsl) paints them all; this file is the whole difference between families:
 * the palette per mood, the numbers at rest (what the still shows) and the clock that steers them (herodial.js
 * createBand reads `kind` and the numbers). A page is matched by the last part of its address, so a scenario, a
 * "sustok" page and a treniruote page of the same name share a family. Pages not named here get `plain`.
 */

// glyph indices of the shader's font (dots.glsl): 0-9 digits, then these
const CODE = { '+': 10, ':': 11, '.': 12, '-': 13, ' ': 14, '#': 15, '%': 16 };
export const MAIN_CELLS = 14;
export const SUB_CELLS = 16;
export const GHOST_CELLS = 14;
// where each row's glyphs start in the shader's one array: main, sub, top ghost, bottom ghost
export const BASES = [0, MAIN_CELLS, MAIN_CELLS + SUB_CELLS, MAIN_CELLS + SUB_CELLS + GHOST_CELLS];
export const TOTAL_CELLS = MAIN_CELLS + SUB_CELLS + 2 * GHOST_CELLS;

// sRGB hex, a day palette and a stage palette: ground, pool (the soft pool of tint behind the digits on a day band), ink (the lit
// dot), lamp (its halo). `d` is the main row's dot pitch (picture heights), `ghost` the two faint rows above and under the numbers:
// earlier numbers of the same kind, every one of them impossible (a caller ID starting 0, a masked code), never random digits.
const GREY = {
  day: { ground: '#f3f2fb', pool: '#dee0ec', ink: '#343e60', lamp: '#6e78a0' },
  stage: { ground: '#1b1470', ink: '#bec8f0', lamp: '#6e82d2' },
};

export const FAMILIES = {
  calls: {
    kind: 'dial', seed: 3.1, d: 0.0235,
    main: '+370 --- -----', sub: '00:00', ghost: ['+370 074 51826', '+370 031 90472'],
    day: { ground: '#f3f2fb', pool: '#cdeff0', ink: '#0b5864', lamp: '#2aa6b8' },
    stage: { ground: '#1b1470', ink: '#72eaf2', lamp: '#22bccc' },
  },
  money: {
    kind: 'count', seed: 7.7, d: 0.031,
    main: '18 450.00', sub: '-0.00', mainN: 9, subN: 10, from: 18450, ghost: ['41 200.00', '6 100.00'],
    day: { ground: '#f3f2fb', pool: '#d3efd4', ink: '#166a2c', lamp: '#3cae58' },
    stage: { ground: '#1b1470', ink: '#86f09a', lamp: '#38c860' },
  },
  shops: {
    kind: 'tick', seed: 11.3, d: 0.027, fmt: 'hms', start: 599, ticks: 8,
    main: '00:09:59', sub: '-70%', ghost: ['199.00', '149.00'],
    day: { ground: '#f3f2fb', pool: '#eed6f4', ink: '#76228a', lamp: '#b25ac4' },
    stage: { ground: '#1b1470', ink: '#ec96ff', lamp: '#c85ae6' },
  },
  codes: {
    kind: 'code', seed: 2.3, d: 0.036,
    main: '--- ---', sub: '00:30', ghost: ['--- ---', '--- ---'],
    day: { ground: '#f3f2fb', pool: '#d3e2fa', ink: '#1a46a8', lamp: '#4a86e0' },
    stage: { ground: '#1b1470', ink: '#8cbcff', lamp: '#4a90f0' },
  },
  heart: {
    kind: 'pulse', seed: 9.4, d: 0.036,
    main: '02:47', sub: '+3', subN: 3, ghost: ['01:58', '02:12'],
    day: { ground: '#f3f2fb', pool: '#f6d4e0', ink: '#92164a', lamp: '#d2487a' },
    stage: { ground: '#1b1470', ink: '#ff96bc', lamp: '#f05a94' },
  },
  plain: {
    kind: 'elapsed', seed: 5.9, d: 0.03, fmt: 'ms',
    main: '00:00', sub: '', ghost: ['00:30', '00:20'],
    ...GREY,
  },
  ten: {
    kind: 'tick', seed: 5.9, d: 0.03, fmt: 'ms', start: 10, ticks: 10,
    main: '00:10', sub: '', ghost: ['00:30', '00:20'],
    ...GREY,
  },
  score: {
    kind: 'rise', seed: 5.9, d: 0.042, mainN: 4,
    main: '0%', sub: '', ghost: ['80%', '60%'],
    ...GREY,
  },
};

// the pages of each family (the last part of the address); everything else is plain
const PAGES = {
  calls: ['skambutis-is-banko', 'skambutis-is-policijos', 'skambutis-is-vmi', 'praleistas-skambutis', 'parodyk-ekrana', 'pareigunas-prie-duru', 'skambutis-is-poliklinikos', 'netikra-valstybes-svetaine', 'padek-ragely'],
  money: ['netikras-brokeris', 'prekybos-kursai-ir-signalai', 'investicijos-telegram', 'paskola-tavo-vardu', 'susigrazinti-pinigus', 'uzduotys-uz-pinigus', 'padesime-atsiimti-pensija', 'draugas-praso-pinigu', 'bureja-praso-dar', 'pinigu-mulas', 'nelegalus-kazino', 'piramide', 'lazybu-prognozes', 'greito-uzdarbio-kursai'],
  shops: ['netikra-parduotuve', 'netikras-pardavejas', 'pirkejas-skelbime', 'bilietas-i-koncerta', 'netikras-konkursas', 'netikra-nuoma', 'reklama-su-zinomu-veidu', 'netikra-banko-reklama', 'zada-pirma-vieta-google'],
  codes: ['zinute-su-kodu', 'zinute-su-nuoroda', 'sms-apie-bauda', 'smart-id-patvirtinimas', 'netikras-laiskas', 'netikras-qr-kodas', 'slaptazodis-nutekejo', 'kodai-ir-pin', 'nuoroda-ne-is-zinutes', 'qr-ne-is-lipduko', 'programele-is-nuorodos', 'phishing', 'smart-id', 'slaptazodziai'],
  heart: ['meile-internete', 'grasina-paviesinti', 'artimojo-avarija', 'seimos-zodis'],
  ten: ['desimt-sekundziu'],
  score: ['treniruote', 'banko-paieska'],
};
const BY_PAGE = new Map(Object.entries(PAGES).flatMap(([fam, list]) => list.map((p) => [p, fam])));

export function familyFor(pathname) {
  const slug = String(pathname).split('/').filter(Boolean).pop() || '';
  return BY_PAGE.get(slug) || 'plain';
}

/**
 * Three sizes of the same panel. 'm' is a phone or tablet (below 60rem): the band sits above the text and the row is big.
 * Above 60rem the band is a box 24rem high beside the text (one picture unit = 24rem) and the page keeps a column clear
 * for the main row (system.css --readout), so the row is sized to that column: 'n' below 90rem, 'w' from 90rem.
 * Stills and the live canvas use the same table, so the first live frame is the still.
 */
export const BAND_CLASSES = { m: null, n: { w: 0.85, cap: 0.016 }, w: { w: 1.25, cap: 0.026 } };
export const dFor = (name, cls = 'm') => {
  const c = BAND_CLASSES[cls];
  return c ? Math.min(c.w / (6 * cellCount(name)[0]), c.cap) : (FAMILIES[name] || FAMILIES.plain).d;
};
export const bandClass = () => (matchMedia('(min-width: 90rem)').matches ? 'w' : matchMedia('(min-width: 60rem)').matches ? 'n' : 'm');

/** a row's glyphs, left to right, padded on the left with blanks to n cells (the shader counts a row's cells from its left) */
export const glyphs = (str, n = str.length) => {
  const out = new Float32Array(n).fill(CODE[' ']);
  const cells = Array.from(str).map((c) => (c in CODE ? CODE[c] : Number(c)));
  for (let i = 0; i < cells.length && i < n; i++) out[n - cells.length + i] = cells[i];
  return out;
};

/** how many cells each row draws: main, sub, top ghost, bottom ghost (the pores of the unlit panel stop there) */
export const cellCount = (name) => { const f = FAMILIES[name] || FAMILIES.plain; return [f.mainN || f.main.length, f.subN || f.sub.length, f.ghost[0].length, f.ghost[1].length]; };

/** the glyphs of every cell at rest */
export function restCells(name) {
  const f = FAMILIES[name] || FAMILIES.plain;
  const n = cellCount(name);
  const g = new Float32Array(TOTAL_CELLS).fill(CODE[' ']);
  [f.main, f.sub, f.ghost[0], f.ghost[1]].forEach((str, i) => g.set(glyphs(str, n[i]), BASES[i]));
  return g;
}

const lin = (hex) => [1, 3, 5].map((i) => Math.pow(parseInt(hex.slice(i, i + 2), 16) / 255, 2.2));
export const palette = (name, mood) => {
  const stage = mood === 'stage';
  const p = (FAMILIES[name] || FAMILIES.plain)[stage ? 'stage' : 'day'];
  const [ground, ink, lamp] = [p.ground, p.ink, p.lamp].map(lin);
  // on the stage the pool is the lamp's light on the dark ground; by day it is a pale tint
  return { ground, ink, lamp, pool: stage ? ground.map((c, i) => c + 0.12 * lamp[i]) : lin(p.pool) };
};
