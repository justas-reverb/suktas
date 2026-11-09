/**
 * The looks. A mood is a palette; a shot is a camera, a sun, a trail and a treeline.
 * `scene(mood, shot)` joins them into the uniform values engine.js uploads.
 *
 * The hero is the "morning" mood in the "wide" and "tall" shots. The three levels of the
 * guide, the promise and the foot of the page reuse the same field in the "vista" shot at
 * three hours (morning, dusk, night), painted once as stills by tools/paint-art.mjs. Colours are written as the colours they should look like on
 * screen ('d'), or as light energy ('e') for the sun and its glow, which are added on top.
 */

const srgb = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

export function hexToLinear(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [srgb(((n >> 16) & 255) / 255), srgb(((n >> 8) & 255) / 255), srgb((n & 255) / 255)];
}

/** What energy, after the shader's soft shoulder `1 - exp(-x * exposure)`, shows as colour `lin`. */
const unshoulder = (lin, exposure) => lin.map((v) => -Math.log(1 - Math.min(v, 0.985)) / exposure);

export const SLOTS = ['zen', 'mid', 'hor', 'sun', 'glow', 'lit', 'amb', 'deep', 'fog', 'tfar', 'tnear', 'rim', 'star'];

export const MOODS = {
  morning: {
    exposure: 1.15,
    zen: ['#A0B2EE', 'd'], mid: ['#EBC2E0', 'd'], hor: ['#FFD9A2', 'd'],
    sun: ['#FFF3D2', 'e', 1.0], glow: ['#FFA45C', 'e', 1.0],
    lit: ['#FFD8AC', 'e', 1.0], amb: ['#7C8BD8', 'd'], deep: ['#3C49A6', 'd'],
    fog: ['#F0C2CE', 'd'], tfar: ['#A58BC9', 'd'], tnear: ['#2B2F6C', 'd'],
    rim: ['#FFC285', 'e', 1.0], star: ['#FFFFFF', 'e', 1.0],
    sunStrength: 1.0, glitter: 1.0, stars: 0.0, sunAz: 0.16, sunEl: 0.13,
  },
  dusk: {
    exposure: 1.1,
    zen: ['#4A4C9E', 'd'], mid: ['#B067AE', 'd'], hor: ['#FF9C78', 'd'],
    sun: ['#FFD9A8', 'e', 1.0], glow: ['#FF7F5E', 'e', 1.0],
    lit: ['#FFC9A8', 'e', 1.0], amb: ['#8E8AD2', 'd'], deep: ['#4E4C9C', 'd'],
    fog: ['#E8A0B0', 'd'], tfar: ['#7F5FA6', 'd'], tnear: ['#2A2B66', 'd'],
    rim: ['#FF9E6E', 'e', 1.0], star: ['#FFFFFF', 'e', 1.0],
    sunStrength: 0.8, glitter: 0.7, stars: 0.5, sunAz: 0.16, sunEl: -0.02,
  },
  night: {
    exposure: 1.0,
    zen: ['#0D0F3A', 'd'], mid: ['#1B2063', 'd'], hor: ['#3D4A9E', 'd'],
    sun: ['#EAF0FF', 'e', 1.0], glow: ['#8FA4F2', 'e', 1.0],
    lit: ['#9DB0F5', 'e', 1.0], amb: ['#2A367F', 'd'], deep: ['#151A52', 'd'],
    fog: ['#34428F', 'd'], tfar: ['#202968', 'd'], tnear: ['#0A0C2C', 'd'],
    rim: ['#A8BCFF', 'e', 1.0], star: ['#E8EEFF', 'e', 1.0],
    sunStrength: 0.11, glitter: 0.9, stars: 1.0, sunAz: 0.28, sunEl: 0.42,
  },
};

/**
 * Shots. cam = [tan(half vertical fov), horizon (NDC, + is up), yaw, eye height m].
 * The wide shot is 16:9 and the tall one 9:16; a hero box of any other shape shows the
 * nearer one cropped (object-fit: cover), for the still and the live canvas alike.
 */
export const SHOTS = {
  wide: {
    aspect: 16 / 9,
    cam: [0.47, 0.14, -0.10, 0.90],
    trail: [0.90, 0.50, 6.8, 2.0], trail2: [1.95, 30.0, -0.90, 0.26],
    tree: [170, 9, 7, 2.5], print: [0.022, 0.30, 18.0], comp: [-0.55, 0.75, 0.84],
    mist: [0.0, 0.58, 0.45, 0.76], mistStrength: 0.62,
  },
  tall: {
    aspect: 9 / 16,
    cam: [0.78, 0.16, 0.0, 0.70],
    trail: [0.95, 0.45, 6.0, 3.3], trail2: [2.0, 30.0, -0.30, 0.20],
    tree: [170, 9, 7, 2.5], print: [0.024, 0.38, 18.0], comp: [-0.22, 0.34, 0.70],
    mist: [-0.1, 1.1, 0.60, 1.02], mistStrength: 0.72,
  },
};

// The frame for the pictures that are only ever stills: a wide, low band (3:1) of the same field,
// used for the three levels, the promise and the foot of the page. Its horizon sits mid-height so
// the sky above the trees has room to fade into the colour of the page above it.
SHOTS.vista = {
  aspect: 3,
  cam: [0.40, 0.0, 0.0, 0.85],
  trail: [0.85, 0.45, 6.4, 1.0], trail2: [1.9, 26.0, -0.75, 0.21],
  tree: [170, 9, 7, 2.5], print: [0.022, 0.30, 16.0], comp: [0.0, 0.5, 0.0],
};

export function scene(moodName, shotName, over = {}) {
  const m = MOODS[moodName];
  const s = SHOTS[shotName];
  const exposure = over.exposure ?? m.exposure;
  const pal = new Float32Array(16 * 3);
  SLOTS.forEach((slot, i) => {
    const [hex, kind, gain = 1] = m[slot];
    let c = hexToLinear(hex);
    c = kind === 'd' ? unshoulder(c, exposure) : c.map((v) => v * gain);
    pal.set(c, i * 3);
  });
  return {
    aspect: s.aspect,
    cam: over.cam ?? s.cam,
    sun: [over.sunAz ?? m.sunAz, over.sunEl ?? m.sunEl, over.sunStrength ?? m.sunStrength, 0],
    fx: [over.glitter ?? m.glitter, over.stars ?? m.stars, over.fade ?? 0, over.grain ?? 0.010],
    trail: over.trail ?? s.trail,
    trail2: over.trail2 ?? s.trail2,
    tree: over.tree ?? s.tree,
    print: [...(over.print ?? s.print), exposure],
    comp: [...(over.comp ?? s.comp), over.mistStrength ?? s.mistStrength ?? 0],
    mist: over.mist ?? s.mist ?? [0, 0, 0, 0],
    pal,
    bg: over.bg ?? '#F4F6FC',
    // [colour of the page above the picture, how much of its height the sky takes to fade into it]
    top: over.top ?? null,
    // glint size, glint density, tree detail, how much of the height the bottom fade takes
    xtra: [over.glintSize ?? 1, over.glintDensity ?? 1, over.treeFine ?? 1, over.fadeExtent ?? 0.17],
    // the flat share of each fade: a band that is cropped by its box needs more of it than one shown whole
    flat: over.flat ?? 0.33,
  };
}
