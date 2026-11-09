#version 300 es
precision highp float;
precision highp int;

// The whole picture, one fragment shader: a low sun over a snowfield with a fox's trail.
// Nothing is read back and nothing is fetched; every pixel is computed from the uniforms.
// The same text paints the stills (tools/paint-art.mjs) and the live canvas, so the two
// agree. A still freezes the clock; a LITE build drops octaves, shadows and ripples.

uniform vec2  uRes;        // canvas size in device pixels
uniform float uTime;       // seconds; fixed for a still
uniform vec4  uCam;        // tan(half vertical fov), horizon height (NDC), yaw (rad), eye height (m)
uniform vec4  uSun;        // azimuth (rad, + is right), elevation (rad), strength, unused
uniform vec4  uFx;         // glitter, stars, fade to page colour, grain
uniform vec4  uTrail;      // stride (m), sway (m), sway wavelength (m), sway phase (rad)
uniform vec4  uTrail2;     // first print z, last print z, lateral offset, lateral drift per metre
uniform vec4  uTree;       // ring radius (m), base height (m), height jitter (m), spacing (m)
uniform vec4  uPrint;      // depth (m), length (m), distance where prints fade out (m), exposure
uniform vec4  uComp;       // clearing: azimuth (rad), half width (rad), how far the trees drop (0..1); w: mist
uniform vec4  uMist;       // a bank of mist over the snow where words will sit: left, right, top, bottom (0..1 of the picture)
uniform vec3  uPal[16];    // palette, linear RGB
uniform vec4  uPtr[12];    // wipes: ground x, ground z, strength 0..1, radius (m)
uniform vec3  uBg;         // page colour the bottom edge fades into, sRGB
uniform vec4  uTop;        // rgb: page colour above the picture (sRGB) that the sky fades into; w: how much of the height it takes (0 = off)
uniform vec4  uXtra;       // glint size scale, glint density scale, tree detail (0..1), how much of the height the bottom fade takes
uniform float uFlat;       // how much of each fade, counted from the picture's edge, is flat colour (0.33: a third of it)

out vec4 outColor;

#define P_ZEN   0   // sky, high
#define P_MID   1   // sky, middle
#define P_HOR   2   // sky at the horizon
#define P_SUN   3   // sun core
#define P_GLOW  4   // glow around the sun
#define P_LIT   5   // snow in sunlight
#define P_AMB   6   // snow lit by the sky only
#define P_DEEP  7   // inside a print
#define P_FOG   8   // haze over the ground
#define P_TFAR  9   // far trees
#define P_TNEAR 10  // near trees
#define P_RIM   11  // warm rim on a print's sunward wall
#define P_STAR  12  // stars and glints

// ---------------------------------------------------------------- noise

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// value noise and its analytic derivative
vec3 noised(vec2 x) {
  vec2 i = floor(x);
  vec2 f = fract(x);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  float k1 = b - a, k2 = c - a, k4 = a - b - c + d;
  return vec3(a + k1 * u.x + k2 * u.y + k4 * u.x * u.y,
              du * vec2(k1 + k4 * u.y, k2 + k4 * u.x));
}

// fractal noise: value, d/dx, d/dy. fpx is the pixel footprint in the units of p; octaves
// finer than about two pixels fade out, which keeps the far snow from sparkling with aliasing.
vec3 fbmd(vec2 p, int oct, float fpx) {
  float amp = 0.5, freq = 1.0, v = 0.0;
  vec2 d = vec2(0.0);
  mat2 m = mat2(1.0, 0.0, 0.0, 1.0);
  const mat2 R = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    if (i >= oct) break;
    float w = clamp(1.7 - fpx * freq * 2.4, 0.0, 1.0);
    vec3 n = noised(m * p * freq);
    v += amp * w * n.x;
    d += amp * w * freq * (n.yz * m);
    m = R * m;
    freq *= 2.0;
    amp *= 0.5;
  }
  return vec3(v, d);
}

float fbmv(vec2 p, int oct) {
  float amp = 0.5, freq = 1.0, v = 0.0;
  mat2 m = mat2(1.0, 0.0, 0.0, 1.0);
  const mat2 R = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    if (i >= oct) break;
    v += amp * noised(m * p * freq).x;
    m = R * m;
    freq *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// a crest where the noise crosses its middle: sharp ridges instead of soft hills
vec3 ridged(vec3 n) {
  float t = 2.0 * n.x - 1.0;
  float s = t < 0.0 ? 1.0 : -1.0;
  return vec3(1.0 - abs(t), s * 2.0 * n.yz);
}

// ---------------------------------------------------------------- the camera

vec3 SUN;          // unit vector towards the sun
vec2 SUNH;         // its horizontal part, unit
float PXA;         // radians per pixel

vec3 rayDir(vec2 frag) {
  vec2 p = (frag * 2.0 - uRes) / uRes.y;
  vec3 d = vec3(p.x * uCam.x, (p.y - uCam.y) * uCam.x, 1.0);
  float c = cos(uCam.z), s = sin(uCam.z);
  return normalize(vec3(c * d.x + s * d.z, d.y, -s * d.x + c * d.z));
}

// how far, in azimuth, this ray is from the sun
float azDiff(vec3 rd) {
  float da = atan(rd.x, rd.z) - uSun.x;
  return atan(sin(da), cos(da));
}

// ---------------------------------------------------------------- trees

float ROUGH;       // how ragged a bough's edge is: set for each ring

float vnoise1(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash11(i), hash11(i + 1.0), f);
}

// One stand of spruces along a ring, in two forms that agree about where each tree is and how
// big. spruceCover says, for a point at ring coordinate u (tree spacings) and height y (m),
// how much of it a tree covers; the sky is painted with that. spruceH says how high the highest
// outline is at u, which is all the shadows on the snow need.
//
// A tree is drawn as its half width at each height. The width follows a concave envelope, so
// the top is a thin spire. It is cut into tiers: inside a tier the width grows to a tip, and at
// the next tier it steps back in, which leaves a notch of sky under every bough. Each tier has
// its own length. `inner` is how far inside the outline the point is (in spacings), for the rim.
float spruceCover(float u, float y, float seed, float aaU, out float tone, out float inner) {
  float i0 = floor(u);
  float cov = 0.0;
  tone = 0.5;
  inner = 0.0;
  for (int k = -2; k <= 2; k++) {
    float i = i0 + float(k);
    float r1 = hash11(i * 1.731 + seed);
    float r2 = hash11(i * 3.157 + seed * 2.3);
    float r3 = hash11(i * 5.713 + seed * 1.1);
    float c = i + 0.5 + (r1 - 0.5) * 0.9;
    float d = u - c;
    float w = (0.8 + 0.8 * r2) * (d < 0.0 ? 0.86 + 0.28 * r3 : 1.14 - 0.28 * r3);
    if (abs(d) >= 1.35 * w) continue;
    float groves = 0.62 + 0.76 * noised(vec2(c * 0.045, seed)).x;
    float ht = (uTree.y * (0.75 + 0.5 * r2) + uTree.z * r1 * r1) * groves;
    float yf = y / ht;
    if (yf >= 1.0 || yf <= -0.02) continue;
    float r4 = hash11(i * 7.919 + seed * 0.7);
    float lean = 0.30 * (r1 - 0.5) * yf;
    float x = abs(d - lean * w) / w;
    float side = d < lean * w ? 0.0 : 1.0;
    float tau = 0.12 + 0.08 * r4;
    float p = 0.80 + 0.20 * r3;
    float a0 = (1.0 - yf) / tau + fract(r1 + 2.3 * r4 + 0.41 * side);
    float a = a0 + 0.25 * (vnoise1(a0 * 0.6 + seed * 3.1 + i) - 0.5);
    float kk = floor(a);
    float s = a - kk;
    float h1 = hash11(kk * 5.1 + i * 3.3 + side * 7.7 + seed);
    float h2 = hash11(kk * 9.7 + i * 1.9 + side * 3.1 + seed * 2.0);
    float h3 = hash11(kk * 2.3 + i * 6.1 + side * 1.3 + seed * 4.0);
    float depth = 0.20 + 0.30 * h2;
    float s0 = 0.55 + 0.30 * h3;
    float T = s < s0 ? (1.0 - depth) + depth * (s / s0) : mix(1.0, 1.0 - depth, (s - s0) / (1.0 - s0));
    float W = pow(max(1.0 - yf, 0.0), 1.0 / p) * T * (0.76 + 0.38 * h1);
    float bf = a * 3.3 + h1 * 9.0;
    float bk = floor(bf);
    float hb = hash11(bk * 3.7 + i * 5.9 + side * 1.3 + seed);
    W *= 1.0 - ROUGH * (0.06 + 0.20 * hb) * (1.0 - (bf - bk));
    float aax = aaU / w * 1.4;
    float cv = smoothstep(-aax, aax, W - x);
    if (cv > cov) {
      cov = cv;
      tone = r4;
      inner = max(W - x, 0.0) * w;
    }
  }
  return cov;
}

// The near wall of forest: three stands of different size laid over one another, so the
// skyline is ragged rather than a row of identical trees.
float canopyCover(float u, float y, float aaU, out float tone, out float inner) {
  float ta, tb, tc, ia, ib, ic;
  float a = spruceCover(u, y, 1.7, aaU, ta, ia);
  float b = spruceCover(u * 1.7 + 3.3, y / 0.78, 5.1, aaU * 1.7, tb, ib);
  float c = spruceCover(u * 2.9 + 1.9, y / 0.58, 9.3, aaU * 2.9, tc, ic);
  tone = ta;
  inner = ia;
  float cv = a;
  if (b > cv) {
    cv = b;
    tone = tb;
    inner = ib / 1.7;
  }
  if (c > cv) {
    cv = c;
    tone = tc;
    inner = ic / 2.9;
  }
  return cv;
}

float crown(float x, float tau, float phi, float p, float seed) {
  float k0 = floor(pow(x, p) / tau + phi);
  x = x / (0.80 + 0.40 * hash11(k0 * 5.1 + seed * 1.3));
  float v = pow(x, p) / tau + phi;
  float k = floor(v);
  float xin = pow(max((k - phi) * tau, 0.0), 1.0 / p);
  float xout = pow(max((k + 1.0 - phi) * tau, 1e-4), 1.0 / p);
  float s = clamp((x - xin) / max(xout - xin, 1e-4), 0.0, 1.0);
  float rho = 0.25 + 0.55 * hash11(k * 13.7 + seed);
  return 1.0 - (k + 1.0 - phi) * tau + rho * tau * pow(1.0 - s, 1.5);
}

float spruceH(float u, float seed) {
  float i0 = floor(u);
  float h = 0.0;
  for (int k = -2; k <= 2; k++) {
    float i = i0 + float(k);
    float r1 = hash11(i * 1.731 + seed);
    float r2 = hash11(i * 3.157 + seed * 2.3);
    float r3 = hash11(i * 5.713 + seed * 1.1);
    float c = i + 0.5 + (r1 - 0.5) * 0.9;
    float d = u - c;
    float w = (0.8 + 0.8 * r2) * (d < 0.0 ? 0.86 + 0.28 * r3 : 1.14 - 0.28 * r3);
    float x = abs(d) / w;
    if (x >= 1.0) continue;
    float r4 = hash11(i * 7.919 + seed * 0.7);
    float groves = 0.62 + 0.76 * noised(vec2(c * 0.045, seed)).x;
    float ht = (uTree.y * (0.75 + 0.5 * r2) + uTree.z * r1 * r1) * groves;
    float side = d < 0.0 ? 0.0 : 1.0;
    h = max(h, ht * crown(x, 0.11 + 0.07 * r4, fract(r1 + 2.3 * r4 + 0.41 * side), 0.80 + 0.20 * r3, i * 3.7 + seed + side * 11.0));
  }
  return max(h, 0.0);
}

float canopyH(float u) {
  float a = spruceH(u, 1.7);
  float b = 0.78 * spruceH(u * 1.7 + 3.3, 5.1);
  float c = 0.58 * spruceH(u * 2.9 + 1.9, 9.3);
  return max(a, max(b, c));
}

// A clearing where the forest edge drops, so the words in the sky have room.
float clearing(float th) {
  float d = abs(atan(sin(th - uComp.x), cos(th - uComp.x)));
  return 1.0 - uComp.z * (1.0 - smoothstep(uComp.y * 0.45, uComp.y, d));
}

float treeShadow(vec2 g) {
  vec2 sp = vec2(SUNH.y, -SUNH.x);
  float a = dot(g, SUNH);
  float b = dot(g, sp);
  float D = uTree.x;
  float dsc = D * D - b * b;
  if (dsc <= 0.0) return 1.0;
  float s = -a + sqrt(dsc);
  if (s <= 0.0) return 1.0;
  vec2 hit = g + SUNH * s;
  float hth = atan(hit.x, hit.y);
  float H = canopyH(hth * D / uTree.w) * clearing(hth);
  float pen = max(0.7, s * 0.016);
  float sh = smoothstep(-pen, pen, s * tan(uSun.y) - H);
  // The sun is a disc, so a shadow's edge blurs in proportion to its length: past about 70 m the
  // shadow of a spire, a hand's width across, is gone, and only the broad shadows near the trees
  // stay. Without this each of the tallest tops draws a straight hair across the snow.
  return 1.0 - (1.0 - sh) * (1.0 - smoothstep(30.0, 70.0, s));
}

// ---------------------------------------------------------------- sky

// The glare around the sun. `broad` keeps the wide lobes: all of it in the sky, a little over
// the trees, almost none over the snow, which has its own haze.
vec3 glowAt(float sd, float broad) {
  sd = max(sd, 0.0);
  float g1 = pow(sd, 1600.0);
  float g2 = pow(sd, 90.0);
  float g3 = pow(sd, 9.0);
  float g4 = pow(sd, 2.0);
  return uPal[P_SUN] * g1 * 1.6 + uPal[P_GLOW] * (g2 * 0.95 + (g3 * 0.50 + g4 * 0.10) * broad) * uSun.z;
}

// The sun's glow spreads sideways along the horizon more than it climbs.
float horizonGlow(vec3 rd) {
  float da = azDiff(rd);
  return exp(-da * da / (2.0 * 0.30 * 0.30)) * exp(-max(rd.y, 0.0) / 0.075);
}

vec3 fogColour(vec3 rd) {
  float da = azDiff(rd);
  float sd = max(dot(rd, SUN), 0.0);
  float wide = exp(-da * da / (2.0 * 0.45 * 0.45));
  return uPal[P_FOG] + uPal[P_GLOW] * (pow(sd, 4.0) * 0.55 + wide * 0.14) * uSun.z;
}

vec3 skyBase(vec3 rd) {
  float e = asin(clamp(rd.y, -1.0, 1.0));
  float s = clamp(e / 0.66, 0.0, 1.0);
  vec3 c = mix(uPal[P_HOR], uPal[P_MID], smoothstep(0.0, 0.42, s));
  c = mix(c, uPal[P_ZEN], smoothstep(0.30, 1.0, s));
  float sd = max(dot(rd, SUN), 0.0);
#ifndef LITE
  vec2 cp = rd.xz / (rd.y + 0.10);
  cp.x += uTime * 0.012;
  vec3 f = fbmd(cp * vec2(0.55, 1.7) + 4.0, 4, 0.0);
  float d = smoothstep(0.40, 0.76, f.x) * smoothstep(0.015, 0.2, rd.y) * (1.0 - smoothstep(0.5, 0.95, rd.y));
  vec3 cc = mix(uPal[P_MID] * 1.04 + 0.015, uPal[P_GLOW] * 1.15, pow(sd, 2.5));
  c = mix(c, cc, d * 0.62);
#endif
  c += uPal[P_GLOW] * horizonGlow(rd) * 0.55 * uSun.z;
#ifndef LITE
  {
    vec3 u = normalize(cross(SUN, vec3(0.0, 1.0, 0.0)));
    vec3 v = cross(SUN, u);
    vec3 q = rd - SUN * dot(rd, SUN);
    float ang = atan(dot(q, v), dot(q, u));
    float streak = noised(vec2(ang * 5.0 + uTime * 0.03, 3.0)).x * 0.65 + noised(vec2(ang * 12.0 - uTime * 0.02, 8.0)).x * 0.35;
    float lobe = pow(sd, 10.0);
    c += uPal[P_GLOW] * lobe * smoothstep(0.30, 0.95, streak) * 0.40 * uSun.z;
  }
#endif
  if (uFx.y > 0.0) {
    vec2 sp = vec2(atan(rd.x, rd.z) * 140.0, rd.y * 140.0);
    vec2 cell = floor(sp);
    float r = hash12(cell);
    vec2 lp = fract(sp) - 0.5;
    float tw = 0.65 + 0.35 * sin(uTime * (1.0 + 3.0 * hash12(cell + 3.1)) + r * 40.0);
    float st = step(0.93, r) * exp(-dot(lp, lp) * 26.0) * tw * smoothstep(0.03, 0.3, rd.y);
    c += uPal[P_STAR] * st * uFx.y * (0.4 + 1.6 * hash12(cell + 9.7));
  }
  return c;
}

// ---------------------------------------------------------------- snow

const vec2 WIND = vec2(0.34, 0.94);   // the wind blows away from the camera, a little to the right
const vec2 CROSS = vec2(-0.94, 0.34);

vec2 sastrugiCoord(vec2 g) {
  return vec2(dot(g, WIND) * 0.16, dot(g, CROSS) * 0.55) + vec2(1.9, 8.8);
}

// height only, for marching shadows
float terrainH(vec2 g) {
  float h = 2.1 * fbmv(g * 0.060 + vec2(7.3, 2.1), 3);
  float t = 2.0 * fbmv(sastrugiCoord(g), 3) - 1.0;
  return h + 0.38 * (1.0 - abs(t));
}

// height, d/dx, d/dz (all in metres and metres per metre)
vec3 terrain(vec2 g, float fpe) {
  vec3 a = fbmd(g * 0.060 + vec2(7.3, 2.1), 3, fpe * 0.060);
  vec3 b = ridged(fbmd(sastrugiCoord(g), 3, fpe * 0.55));
  float h = 2.1 * a.x + 0.38 * b.x;
  vec2 gr = 2.1 * 0.060 * a.yz + 0.38 * (b.y * 0.16 * WIND + b.z * 0.55 * CROSS);
#ifndef LITE
  vec2 q = vec2(dot(g, WIND) * 1.3, dot(g, CROSS) * 6.0) + vec2(3.3, 9.1);
  vec3 c = fbmd(q, 3, fpe * 6.0);
  h += 0.022 * c.x;
  gr += 0.022 * (c.y * 1.3 * WIND + c.z * 6.0 * CROSS);
  vec3 m = fbmd(g * 40.0 + vec2(5.0, 1.0), 2, fpe * 40.0);
  gr += 0.0035 * 40.0 * m.yz;
#endif
  return vec3(h, gr);
}

// How much of the sun the dunes let through: a short march towards the sun.
float duneShadow(vec2 g, float h0, float t) {
  float tanEl = tan(uSun.y);
  float sh = 1.0;
  float d = 0.15;
  for (int i = 0; i < 9; i++) {
    float over = (h0 + d * tanEl) - terrainH(g + SUNH * d);
    sh = min(sh, smoothstep(-0.02 - 0.03 * d, 0.03 + 0.06 * d, over));
    d *= 1.75;
  }
  return mix(sh, 1.0, smoothstep(40.0, 110.0, t));
}

// ---------------------------------------------------------------- the trail

float trailX(float z) {
  return uTrail2.z + uTrail2.w * z + uTrail.y * sin(6.2831853 * z / uTrail.z + uTrail.w);
}
float trailDX(float z) {
  return uTrail2.w + uTrail.y * 6.2831853 / uTrail.z * cos(6.2831853 * z / uTrail.z + uTrail.w);
}

vec2 rot(vec2 p, float a) {
  float c = cos(a), s = sin(a);
  return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
}
float sdEllipse(vec2 p, vec2 r) {
  return (length(p / r) - 1.0) * min(r.x, r.y);
}

// A fox's forefoot, drawn in print lengths, +y forward: two middle toes side by side, two
// outer toes set back and turned out, a heel pad behind, and four small claw marks.
float pawSDF(vec2 p, out float claws) {
  float pad = sdEllipse(p - vec2(0.0, -0.215), vec2(0.185, 0.150));
  float t1 = sdEllipse(rot(p - vec2(-0.105, 0.195), -0.13), vec2(0.072, 0.112));
  float t2 = sdEllipse(rot(p - vec2( 0.105, 0.195),  0.13), vec2(0.072, 0.112));
  float t3 = sdEllipse(rot(p - vec2(-0.262, 0.000), -0.62), vec2(0.066, 0.098));
  float t4 = sdEllipse(rot(p - vec2( 0.262, 0.000),  0.62), vec2(0.066, 0.098));
  float c1 = sdEllipse(p - vec2(-0.118, 0.345), vec2(0.016, 0.040));
  float c2 = sdEllipse(p - vec2( 0.118, 0.345), vec2(0.016, 0.040));
  float c3 = sdEllipse(p - vec2(-0.352, 0.105), vec2(0.016, 0.036));
  float c4 = sdEllipse(p - vec2( 0.352, 0.105), vec2(0.016, 0.036));
  claws = min(min(c1, c2), min(c3, c4));
  return min(min(pad, t1), min(min(t2, t3), t4));
}

// Print height (m) and how deep the pit is (0..1) at ground point g.
vec2 printAt(vec2 g, float fpe) {
  float z = g.y;
  if (z < uTrail2.x - 0.5 * uTrail.x || z > uTrail2.y + 0.5 * uTrail.x) return vec2(0.0);
  float i = floor((z - uTrail2.x) / uTrail.x + 0.5);
  float zi = uTrail2.x + i * uTrail.x;
  float side = (mod(i, 2.0) < 1.0) ? -1.0 : 1.0;
  float ang = atan(trailDX(zi));
  vec2 fw = vec2(sin(ang), cos(ang));
  vec2 c = vec2(trailX(zi) + side * 0.20 * uPrint.y, zi);
  vec2 q = g - c;
  vec2 p = vec2(dot(q, vec2(fw.y, -fw.x)), dot(q, fw)) / uPrint.y;
  if (abs(p.x) > 0.8 || abs(p.y) > 0.8) return vec2(0.0);

  float claws;
  float d = pawSDF(p, claws);
  float w = max(fpe / uPrint.y, 0.032);
  float pit = 1.0 - smoothstep(-w, w, d);
  float cl = (1.0 - smoothstep(-w, w, claws)) * 0.55;
  float rim = exp(-pow((d - 0.055) / 0.055, 2.0)) * (1.0 - pit);

  float life = 1.0 - smoothstep(0.55 * uPrint.z, uPrint.z, g.y);
  life *= 1.0 - smoothstep(0.06, 0.17, fpe / uPrint.y);
  float wipe = 0.0;
  for (int k = 0; k < 12; k++) {
    vec4 s = uPtr[k];
    wipe = max(wipe, s.z * (1.0 - smoothstep(s.w * 0.30, s.w, length(g - s.xy))));
  }
  life *= 1.0 - wipe;
  float depth = max(pit, cl);
  float h = (-depth + 0.26 * rim) * uPrint.x * life;
  return vec2(h, depth * life);
}

// ---------------------------------------------------------------- the ground

// Sparks of sun on the snow, thickest along the path to the sun. Fine ones everywhere, and
// soft out-of-focus ones close to the camera.
vec3 glints(vec2 frag, vec3 rd, float t, float fogA, float lit) {
  float da = azDiff(rd);
  float path = 0.30 + exp(-da * da / (2.0 * 0.20 * 0.20));
  vec3 acc = vec3(0.0);
  vec3 warm = vec3(1.0);

  float cell = max(2.0, uRes.y / 330.0) * uXtra.x;
  vec2 fc = frag / cell;
  vec2 id = floor(fc);
  float r = hash12(id);
  float dist = smoothstep(0.8, 3.5, t) * (1.0 - smoothstep(60.0, 260.0, t));
  float thr = 1.0 - 0.075 * uFx.x * uXtra.y * path * (0.25 + dist) * (0.35 + 0.65 * lit);
  if (r > thr) {
    vec2 lp = fract(fc) - 0.5;
    float ph = hash12(id + 5.5);
    float tw = max(0.45 + 0.55 * sin(uTime * (1.5 + 5.0 * ph) + ph * 60.0), 0.0);
    float spot = exp(-dot(lp, lp) * 16.0);
    float star = exp(-abs(lp.x) * 14.0 - abs(lp.y) * 70.0) + exp(-abs(lp.y) * 14.0 - abs(lp.x) * 70.0);
    float big = step(0.45, hash12(id + 2.2));
    vec3 tint = mix(vec3(1.0, 0.82, 0.58), vec3(0.78, 0.90, 1.0), hash12(id + 7.7));
    acc += tint * (spot + big * star * 1.3) * tw * (1.0 - fogA * 0.5);
  }

  float near = 1.0 - smoothstep(0.9, 5.0, t);
  if (near > 0.0) {
    float bc = cell * 7.0;
    vec2 bf = frag / bc;
    vec2 bi = floor(bf);
    float br = hash12(bi + 31.7);
    if (br > 1.0 - 0.10 * uFx.x * uXtra.y * path * lit) {
      vec2 bp = fract(bf) - vec2(0.3 + 0.4 * hash12(bi + 1.1), 0.3 + 0.4 * hash12(bi + 2.1));
      float bph = hash12(bi + 8.8);
      float btw = 0.6 + 0.4 * sin(uTime * (0.7 + 2.0 * bph) + bph * 50.0);
      acc += exp(-dot(bp, bp) * 38.0) * btw * 0.55 * near;
    }
  }
  return uPal[P_SUN] * acc * 4.4 * uFx.x;
}

float fogA0(float t) {
  return 1.0 - exp(-t * 0.0030);
}

vec3 groundColour(vec3 rd, float t, vec2 frag) {
  vec3 P = vec3(0.0, uCam.w, 0.0) + rd * t;
  vec2 g = P.xz;
  float fp = t * PXA;
  float graze = max(-rd.y, 0.025);
  float fpe = 0.5 * (fp + min(fp / graze, fp * 10.0));

  vec3 th = terrain(g, fpe);
  vec2 grad = th.yz;
  float pitDepth = 0.0;

  float lat = abs(g.x - trailX(g.y));
  if (lat < 0.30 * uPrint.y + 0.25 && g.y < uTrail2.y + 0.3) {
    float e = max(fpe * 0.8, 0.0022);
    vec2 p0 = printAt(g, fpe);
    vec2 px = printAt(g + vec2(e, 0.0), fpe);
    vec2 pz = printAt(g + vec2(0.0, e), fpe);
    grad += vec2(px.x - p0.x, pz.x - p0.x) / e;
    pitDepth = p0.y;
  }
  vec3 n = normalize(vec3(-grad.x, 1.0, -grad.y));

  float sh = 1.0;
#ifndef LITE
  sh = treeShadow(g) * duneShadow(g, th.x, t);
#endif
  float ndl = dot(n, SUN);
  float wrap = clamp((ndl + 0.08) / 1.08, 0.0, 1.0);
  float lit = wrap * sh;

  float skyFacing = 0.5 + 0.5 * n.y;
  vec3 amb = mix(uPal[P_DEEP], uPal[P_AMB], skyFacing);
  amb = mix(amb, uPal[P_DEEP], pitDepth);
  vec3 sunlight = mix(uPal[P_LIT], uPal[P_RIM], pitDepth * 0.7);
  // the glow on the horizon lights the slopes that face it, even after the sun has gone
  float gl = max(dot(n, normalize(vec3(SUNH.x, 0.30, SUNH.y))), 0.0);
  amb += uPal[P_GLOW] * gl * 0.20 * uSun.z;
  vec3 col = amb + sunlight * lit * uSun.z * 4.0;
  col *= mix(vec3(0.95, 0.97, 1.05), vec3(1.05, 1.01, 0.95), fbmv(g * 0.035 + vec2(2.0, 5.0), 2));

  // the sun's reflection in the snow: a warm sheen below the sun, broken up by the ripples
  vec3 refl = reflect(rd, normalize(vec3(-grad.x * 0.25, 1.0, -grad.y * 0.25)));
  float rs = max(dot(refl, SUN), 0.0);
  float sheen = pow(rs, 45.0) * 2.4 + pow(rs, 10.0) * 0.40;
  col += uPal[P_RIM] * sheen * sh * uSun.z * (1.0 - fogA0(t)) * smoothstep(0.03, 0.12, uSun.y);

  // snow is translucent: with the sun behind it the thin ridges glow
  float fwd = pow(max(dot(rd, SUN), 0.0), 3.0);
  col += uPal[P_RIM] * fwd * 0.10 * sh;

  // pearly sheen at grazing angles, where the snow mirrors the bright horizon
  float fres = pow(1.0 - clamp(-rd.y * 2.2, 0.0, 1.0), 6.0);
  col = mix(col, uPal[P_HOR] * 1.15, fres * 0.16);

  // haze, thicker towards the sun
  vec3 fogC = fogColour(rd);
  float fogA = max(1.0 - exp(-t * 0.0030), smoothstep(0.75 * uTree.x, uTree.x, t));
  col = mix(col, fogC, fogA);

  // wind-blown snow drifting low over the field
  float veil = fbmd(vec2(g.x * 0.28 - uTime * 0.45, g.y * 0.05), 3, 0.0).x;
  col += fogC * smoothstep(0.52, 0.86, veil) * 0.10 * (1.0 - fogA);

  if (uFx.x > 0.0) col += glints(frag, rd, t, fogA, lit);
  return col;
}

// ---------------------------------------------------------------- main

vec3 treeRing(vec3 col, vec3 rd, float rt, float th, float D, float seed, float scale, vec3 tint, float haze, float sd, out float cover, out float solid) {
  cover = 0.0;
  solid = 0.0;
  float topMax = (scale * (uTree.y * 1.25 + uTree.z) * 1.38 * 1.2 - uCam.w) / D;
  if (rt > topMax + 3.0 * PXA) return col;
  float u = th * D / (uTree.w * scale);
  float aaU = PXA * D / (uTree.w * scale);
  ROUGH = uXtra.z * (1.0 - smoothstep(0.35, 0.80, aaU * 10.0));
  float y = (uCam.w + rt * D) / (scale * max(clearing(th), 0.05));
  float tone, inner;
  float cv = seed < 2.0 ? canopyCover(u, y, aaU, tone, inner) : spruceCover(u, y, seed, aaU, tone, inner);
  float baseTan = -uCam.w / D;
  float aa = PXA * 1.2;
  float aboveBase = smoothstep(-aa, aa, rt - baseTan);
  cover = cv * aboveBase;
  float mist = exp(-max(rt - baseTan, 0.0) * 150.0 / scale);
  float hz = clamp(mist + haze, 0.0, 1.0);
  solid = cover * (1.0 - hz);
  vec3 c = tint * (0.84 + 0.32 * tone);
  float rim = exp(-inner / max(0.05, aaU * 2.5));
  c += uPal[P_RIM] * rim * pow(sd, 3.0) * 1.1 + uPal[P_HOR] * rim * 0.18;
  c = mix(c, fogColour(rd), hz);
  return mix(col, c, cover);
}

void main() {
  SUN = vec3(sin(uSun.x) * cos(uSun.y), sin(uSun.y), cos(uSun.x) * cos(uSun.y));
  SUNH = normalize(vec2(sin(uSun.x), cos(uSun.x)));
  PXA = 2.0 * uCam.x / uRes.y;

  vec2 frag = gl_FragCoord.xy;
  vec3 rd = rayDir(frag);
  float sd = max(dot(rd, SUN), 0.0);
  float rt = rd.y / max(length(rd.xz), 1e-4);
  float th = atan(rd.x, rd.z);
  float D0 = uTree.x;

  vec3 col;
  float tcover = 0.0;
  float cvs = 0.0;
  bool isGround = rd.y < 0.0 && (uCam.w / -rd.y) * length(rd.xz) < D0;

  if (isGround) {
    float t = uCam.w / -rd.y;
    col = groundColour(rd, t, frag);
  } else {
    col = skyBase(rd);
    float disc = smoothstep(cos(0.020), cos(0.012), sd);
    float cv, sv;
    // far ridge, middle ridge, near wall of spruces
    col = treeRing(col, rd, rt, th, D0 * 4.4, 4.1, 2.2, mix(uPal[P_TFAR], uPal[P_FOG], 0.30), 0.30, sd, cv, sv);
    cvs = cv;
    tcover = sv;
    col = treeRing(col, rd, rt, th, D0 * 2.1, 7.7, 1.45, mix(uPal[P_TFAR], uPal[P_TNEAR], 0.45), 0.16, sd, cv, sv);
    cvs = max(cvs, cv);
    tcover = max(tcover, sv);
    col = treeRing(col, rd, rt, th, D0, 1.7, 1.0, uPal[P_TNEAR], 0.0, sd, cv, sv);
    cvs = max(cvs, cv);
    tcover = max(tcover, sv);
    col += uPal[P_SUN] * 3.2 * disc * (1.0 - cvs);
  }

  // glare over everything, a little less over the trees
  col += glowAt(sd, isGround ? 0.10 : mix(1.0, 0.0, tcover)) * (isGround ? 0.85 * smoothstep(0.0, 0.08, uSun.y) : (1.0 - 0.55 * tcover));

  // soft shoulder, then to the display
  col = 1.0 - exp(-col * uPrint.w);
  col = pow(col, vec3(1.0 / 2.2));

  // a bank of low mist where the words sit: the snow there is pale, so ink keeps its contrast
  if (uComp.w > 0.0) {
    vec2 q = vec2(frag.x / uRes.x, 1.0 - frag.y / uRes.y);
    float sf = 0.09;
    float box = smoothstep(uMist.x, uMist.x + sf, q.x) * (1.0 - smoothstep(uMist.y - sf, uMist.y, q.x))
              * smoothstep(uMist.z, uMist.z + sf, q.y) * (1.0 - smoothstep(uMist.w - sf, uMist.w, q.y));
    col = mix(col, vec3(0.945, 0.950, 0.990), box * uComp.w * (isGround ? 1.0 : 0.0));
  }

  // grain doubles as dither, so the smooth gradients do not band
  float gr = hash12(frag + floor(uTime * 24.0) * 1.37) - 0.5;
  col += gr * (uFx.w + 1.6 / 255.0);

  // the top edge takes the colour of the page above it, in the sky only: the trees stay whole
  if (uTop.w > 0.0) {
    float ft = smoothstep(1.0 - uTop.w, 1.0 - uFlat * uTop.w, frag.y / uRes.y);
    col = mix(col, uTop.rgb, ft * (1.0 - cvs));
  }

  float fade = uFx.z * (1.0 - smoothstep(uFlat * uXtra.w, uXtra.w, frag.y / uRes.y));
  col = mix(col, uBg, fade);
  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
