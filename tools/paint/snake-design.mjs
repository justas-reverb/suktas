/**
 * The logo's snake, as numbers. tools/paint/snake.html draws whatever these say, at the size it is
 * given: the S is a smooth curve through the points below (unit coordinates, y down, the S spanning
 * -1..1), the stroke and the head and the tongue are in pixels, and the page solves for the S's size
 * so that the whole figure fills its picture. A size gets its own numbers where one set would not
 * land on whole pixels: see HINTS.
 */

// from the neck to the tail
export const PTS = [
  [0.12, -0.95],
  [-0.12, -0.98],
  [-0.38, -0.84],
  [-0.54, -0.52],
  [-0.38, -0.16],
  [0.0, 0.02],
  [0.38, 0.18],
  [0.54, 0.52],
  [0.36, 0.86],
  [-0.04, 0.98],
  [-0.40, 0.84],
];

/**
 * One size's job for tools/paint-art.mjs.
 *   h, w      the picture, in pixels
 *   R         the body's half width in pixels (the stroke is 2R); h / 12 unless a hint says otherwise
 *   detail    0: smooth tube; 1: scales, for the sizes that have pixels to carry them (from a 4.8 px half width)
 *   hi, gloss how far up the navy ramp the diffuse light may take the skin (1: all the way) and how strong the
 *             sheen is (on the smooth sizes) or the glints (one on each scale, on the larger ones)
 *   scale     the scales' size (1: the home-screen icon's); coarser where there are few pixels
 *   scaleAmp  the scales' contrast (1: the home-screen icon's); gentler where there are few pixels
 *   tongueCol the tongue's colour (navy unless a size is given an accent)
 *   halo      {w, a, k, col}: a pale halo w px wide outside the silhouette, a opaque at the edge and falling off
 *             as (1 - d / w) ** k, for the tab icons that sit on dark bars; the fit leaves room for it
 */
export function snakeJob(h, w, o = {}) {
  const R = o.R ?? h / 12;
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  // Navy and black. Only the light that falls on it makes it a form, so the sizes differ in how much of it
  // there is room for. Up to a 4 px half width the body is smooth: a periwinkle sheen and a pale rim, held
  // back so the S does not break up against the sky. Above that it wears scales (coarse and gentle where
  // there are few pixels, fuller as there are more; the home-screen icon and the share image, from a 12 px
  // half width, have them whole), and the sheen turns into glints, one on each scale.
  const t = clamp01((R - 2) / 4);
  let hi = 1;
  let gloss = 0.3 + 0.1 * clamp01((R - 2) / 2) * 2;
  let detail = 0;
  let scale = 1;
  let scaleAmp = 1;
  if (R > 4) {
    gloss = 0.55 + 0.25 * clamp01((R - 5) / 5);
    const u = clamp01((R - 5) / 7);
    if (R >= 4.8) detail = 1;
    scale = 1.35 - 0.35 * u;
    scaleAmp = 0.5 + 0.5 * u;
  }
  return {
    kind: 'snake',
    w,
    h,
    geo: {
      pts: o.pts ?? PTS,
      sc: 1,
      cx: 0,
      cy: 0,
      R,
      head: o.head ?? 2.7,
      jaw: o.jaw ?? 1.3,
      neck: o.neck ?? 0.92,
      taper: o.taper ?? 0.12,
      lift: o.lift ?? 0,
      tongue: o.tongue ?? [2.1, 0.5, 0.45, Math.max(0.7, R * 0.18), -0.08, 0],
      eye: o.eye ?? [1.55, 0.42, Math.max(0.9, R * 0.3), 0.35],
    },
    fit: { margin: o.margin ?? (o.halo ? o.halo.w + 0.5 : 1), padX: o.padX ?? 0, padY: o.padY ?? 0, dx: o.dx ?? 0, dy: o.dy ?? 0 },
    style: { detail: o.detail ?? detail, twist: o.twist ?? 0, rim: o.rim ?? 1.2, pitch: o.pitch, hi: o.hi ?? hi, gloss: o.gloss ?? gloss, scale: o.scale ?? scale, scaleAmp: o.scaleAmp ?? scaleAmp },
    ss: o.ss ?? 6,
    ground: o.ground,
    tongueCol: o.tongueCol,
    halo: o.halo,
  };
}
