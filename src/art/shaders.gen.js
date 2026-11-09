export const VERT = `#version 300 es
void main() {
vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;
export const FRAG = `#version 300 es
precision highp float;
precision highp int;
uniform vec2  uRes;
uniform float uTime;
uniform vec4  uCam;
uniform vec4  uSun;
uniform vec4  uFx;
uniform vec4  uTrail;
uniform vec4  uTrail2;
uniform vec4  uTree;
uniform vec4  uPrint;
uniform vec4  uComp;
uniform vec4  uMist;
uniform vec3  uPal[16];
uniform vec4  uPtr[12];
uniform vec3  uBg;
uniform vec4  uTop;
uniform vec4  uXtra;
uniform float uFlat;
out vec4 outColor;
#define P_ZEN   0
#define P_MID   1
#define P_HOR   2
#define P_SUN   3
#define P_GLOW  4
#define P_LIT   5
#define P_AMB   6
#define P_DEEP  7
#define P_FOG   8
#define P_TFAR  9
#define P_TNEAR 10
#define P_RIM   11
#define P_STAR  12
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
vec3 ridged(vec3 n) {
float t = 2.0 * n.x - 1.0;
float s = t < 0.0 ? 1.0 : -1.0;
return vec3(1.0 - abs(t), s * 2.0 * n.yz);
}
vec3 SUN;
vec2 SUNH;
float PXA;
vec3 rayDir(vec2 frag) {
vec2 p = (frag * 2.0 - uRes) / uRes.y;
vec3 d = vec3(p.x * uCam.x, (p.y - uCam.y) * uCam.x, 1.0);
float c = cos(uCam.z), s = sin(uCam.z);
return normalize(vec3(c * d.x + s * d.z, d.y, -s * d.x + c * d.z));
}
float azDiff(vec3 rd) {
float da = atan(rd.x, rd.z) - uSun.x;
return atan(sin(da), cos(da));
}
float ROUGH;
float vnoise1(float x) {
float i = floor(x);
float f = fract(x);
f = f * f * (3.0 - 2.0 * f);
return mix(hash11(i), hash11(i + 1.0), f);
}
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
return 1.0 - (1.0 - sh) * (1.0 - smoothstep(30.0, 70.0, s));
}
vec3 glowAt(float sd, float broad) {
sd = max(sd, 0.0);
float g1 = pow(sd, 1600.0);
float g2 = pow(sd, 90.0);
float g3 = pow(sd, 9.0);
float g4 = pow(sd, 2.0);
return uPal[P_SUN] * g1 * 1.6 + uPal[P_GLOW] * (g2 * 0.95 + (g3 * 0.50 + g4 * 0.10) * broad) * uSun.z;
}
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
const vec2 WIND = vec2(0.34, 0.94);
const vec2 CROSS = vec2(-0.94, 0.34);
vec2 sastrugiCoord(vec2 g) {
return vec2(dot(g, WIND) * 0.16, dot(g, CROSS) * 0.55) + vec2(1.9, 8.8);
}
float terrainH(vec2 g) {
float h = 2.1 * fbmv(g * 0.060 + vec2(7.3, 2.1), 3);
float t = 2.0 * fbmv(sastrugiCoord(g), 3) - 1.0;
return h + 0.38 * (1.0 - abs(t));
}
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
float gl = max(dot(n, normalize(vec3(SUNH.x, 0.30, SUNH.y))), 0.0);
amb += uPal[P_GLOW] * gl * 0.20 * uSun.z;
vec3 col = amb + sunlight * lit * uSun.z * 4.0;
col *= mix(vec3(0.95, 0.97, 1.05), vec3(1.05, 1.01, 0.95), fbmv(g * 0.035 + vec2(2.0, 5.0), 2));
vec3 refl = reflect(rd, normalize(vec3(-grad.x * 0.25, 1.0, -grad.y * 0.25)));
float rs = max(dot(refl, SUN), 0.0);
float sheen = pow(rs, 45.0) * 2.4 + pow(rs, 10.0) * 0.40;
col += uPal[P_RIM] * sheen * sh * uSun.z * (1.0 - fogA0(t)) * smoothstep(0.03, 0.12, uSun.y);
float fwd = pow(max(dot(rd, SUN), 0.0), 3.0);
col += uPal[P_RIM] * fwd * 0.10 * sh;
float fres = pow(1.0 - clamp(-rd.y * 2.2, 0.0, 1.0), 6.0);
col = mix(col, uPal[P_HOR] * 1.15, fres * 0.16);
vec3 fogC = fogColour(rd);
float fogA = max(1.0 - exp(-t * 0.0030), smoothstep(0.75 * uTree.x, uTree.x, t));
col = mix(col, fogC, fogA);
float veil = fbmd(vec2(g.x * 0.28 - uTime * 0.45, g.y * 0.05), 3, 0.0).x;
col += fogC * smoothstep(0.52, 0.86, veil) * 0.10 * (1.0 - fogA);
if (uFx.x > 0.0) col += glints(frag, rd, t, fogA, lit);
return col;
}
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
col += glowAt(sd, isGround ? 0.10 : mix(1.0, 0.0, tcover)) * (isGround ? 0.85 * smoothstep(0.0, 0.08, uSun.y) : (1.0 - 0.55 * tcover));
col = 1.0 - exp(-col * uPrint.w);
col = pow(col, vec3(1.0 / 2.2));
if (uComp.w > 0.0) {
vec2 q = vec2(frag.x / uRes.x, 1.0 - frag.y / uRes.y);
float sf = 0.09;
float box = smoothstep(uMist.x, uMist.x + sf, q.x) * (1.0 - smoothstep(uMist.y - sf, uMist.y, q.x))
* smoothstep(uMist.z, uMist.z + sf, q.y) * (1.0 - smoothstep(uMist.w - sf, uMist.w, q.y));
col = mix(col, vec3(0.945, 0.950, 0.990), box * uComp.w * (isGround ? 1.0 : 0.0));
}
float gr = hash12(frag + floor(uTime * 24.0) * 1.37) - 0.5;
col += gr * (uFx.w + 1.6 / 255.0);
if (uTop.w > 0.0) {
float ft = smoothstep(1.0 - uTop.w, 1.0 - uFlat * uTop.w, frag.y / uRes.y);
col = mix(col, uTop.rgb, ft * (1.0 - cvs));
}
float fade = uFx.z * (1.0 - smoothstep(uFlat * uXtra.w, uXtra.w, frag.y / uRes.y));
col = mix(col, uBg, fade);
outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
export const HERO_A = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uPic;
out vec4 outColor;
float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
vec2 i = floor(p), f = fract(p);
f = f * f * (3.0 - 2.0 * f);
return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}
vec3 H(int r, int g, int b) { return pow(vec3(float(r), float(g), float(b)) / 255.0, vec3(2.2)); }
vec2 picUV(out float pxs) {
vec2 uv = gl_FragCoord.xy / uRes;
float k = (uRes.x / uRes.y) / uPic;
if (k > 1.0) { pxs = 1.0 / (k * uRes.y); return vec2(uv.x, 0.5 + (uv.y - 0.5) / k); }
pxs = 1.0 / uRes.y;
return vec2(0.5 + (uv.x - 0.5) * k, uv.y);
}
vec3 soft(vec3 c) {
vec3 over = max(c - 0.8, 0.0);
return min(c, vec3(0.8)) + 0.2 * (1.0 - exp(-over / 0.2));
}
void finish(vec3 lin) {
vec3 s = pow(soft(lin), vec3(1.0 / 2.2));
s += (hash21(gl_FragCoord.xy) - 0.5) * (2.2 / 255.0);
outColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
const float CYC = 10.0;
const vec2 CS = vec2(0.17, 0.2);
float sdBox(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
void main() {
float pxs;
vec2 q = picUV(pxs);
vec2 P = vec2(q.x * uPic, q.y);
float wide = step(2.0, uPic);
float t = mod(uTime, CYC);
float cyc = floor(uTime / CYC);
float hx = hash11(cyc * 3.17 + 1.3), hy = hash11(cyc * 5.71 + 4.1);
float tx = mix(0.55, 1.05, hx) * (1.0 - wide) + mix(1.30, 1.95, hx) * wide;
float ty = mix(0.30, 0.66, hy);
vec2 tid = floor(vec2(tx, ty) / CS);
vec2 tc = (tid + 0.5) * CS;
float e1 = 1.0 - pow(1.0 - clamp(t / 4.4, 0.0, 1.0), 3.0);
float e2 = 1.0 - pow(1.0 - clamp((t - 0.5) / 4.4, 0.0, 1.0), 3.0);
float lines = smoothstep(0.0, 0.7, t) * (1.0 - smoothstep(6.2, 7.6, t));
float lock = smoothstep(4.7, 5.2, t) * (1.0 - smoothstep(6.4, 7.4, t));
float ign = smoothstep(5.0, 5.4, t) * (1.0 - smoothstep(9.0, 9.9, t));
float vyh = mix(1.15, tc.y, e1);
float hxh = mix(uPic + 0.2, tc.x, e2);
vec2 g = P / CS;
vec2 id = floor(g), f = fract(g);
vec2 cc = (id + 0.5) * CS;
float rnd = hash21(id + 17.0), rnd2 = hash21(id + 91.0), rnd3 = hash21(id + 53.0);
float isT = step(abs(id.x - tid.x) + abs(id.y - tid.y), 0.1);
float grain = vnoise(P * 70.0) * 0.5 + vnoise(P * 17.0) * 0.5;
vec3 wall = mix(H(222, 218, 244), H(238, 236, 251), smoothstep(0.0, 1.0, P.y * 0.8 + grain * 0.25));
wall *= 0.97 + 0.05 * (rnd - 0.5);
float seamX = min(fract(g.x * 0.5), 1.0 - fract(g.x * 0.5)) * CS.x * 2.0;
wall = mix(wall, H(196, 190, 230), (1.0 - smoothstep(0.0, 0.0022 + pxs, seamX)) * 0.55);
wall *= 1.0 - 0.16 * smoothstep(0.78, 1.0, f.y);
float sy = f.y * CS.y;
float slab = 1.0 - smoothstep(0.034 - pxs, 0.034, sy);
float lip = (1.0 - smoothstep(0.0, 0.005 + pxs, abs(sy - 0.034))) * 0.8;
wall = mix(wall, H(206, 201, 236), slab);
wall = mix(wall, H(247, 246, 253), lip);
wall *= 1.0 - 0.2 * (1.0 - smoothstep(0.0, 0.004 + pxs, sy)) * 0.0;
vec2 lp = (f - 0.5) * CS - vec2(0.0, 0.015);
vec2 hw = vec2(0.050, 0.066);
float dw = sdBox(lp, hw);
float inside = 1.0 - smoothstep(-pxs, pxs, dw);
float frame = (1.0 - smoothstep(-pxs, pxs, dw - 0.0055)) - inside;
float vy = clamp((lp.y + hw.y) / (2.0 * hw.y), 0.0, 1.0);
float vx = clamp((lp.x + hw.x) / (2.0 * hw.x), 0.0, 1.0);
vec3 glass = mix(H(102, 92, 196), H(178, 172, 238), pow(vy, 1.3));
glass *= 0.88 + 0.22 * rnd;
float sky = smoothstep(0.55, 0.0, abs(dot(P, vec2(0.9, -0.43)) - (mod(uTime * 0.05, 3.6) - 0.5)));
glass = mix(glass, H(214, 212, 248), sky * 0.34);
float bl = step(0.7, rnd2) * step(vy, mix(0.35, 0.9, rnd3));
float slats = 0.5 + 0.5 * sin(vy * 90.0);
glass = mix(glass, mix(H(236, 233, 250), H(214, 210, 240), slats), bl * 0.95);
float cu = step(0.5, rnd2) * step(rnd2, 0.7) * (1.0 - smoothstep(0.0, 0.3, vx * (0.4 + rnd3) ));
glass = mix(glass, H(232, 229, 248), cu * 0.8);
glass *= 1.0 - 0.34 * smoothstep(0.80, 1.0, vy) - 0.18 * (1.0 - smoothstep(0.0, 0.1, vx));
float streak = smoothstep(0.10, 0.0, abs(vx - 0.5 * vy - 0.15 - 0.4 * rnd3)) * 0.22;
glass = mix(glass, H(236, 234, 255), streak * (1.0 - bl));
float mull =step(0.55, rnd) * (1.0 - smoothstep(0.0, 0.003 + pxs, abs(lp.x)));
glass = mix(glass, H(244, 243, 252), mull * 0.9);
float dcell = length(cc - tc);
float r0 = max(t - 5.4, 0.0);
float flash = 0.0;
for (int k = 0; k < 3; k++) {
float rk = (r0 - float(k) * 0.9) * 0.26;
flash += step(0.0, rk) * exp(-pow((dcell - rk) / 0.05, 2.0)) * exp(-rk * 1.6);
}
glass = mix(glass, H(206, 244, 232), clamp(flash * step(0.35, rnd) * 0.8, 0.0, 0.7) * ign);
glass = mix(glass, H(238, 255, 249), isT * ign);
vec3 col = wall;
col = mix(col, H(247, 246, 253), frame * 0.95);
col = mix(col, glass, inside);
float w = max(0.0034, 1.5 * pxs);
float vis1 = step(vyh, P.y) * step(P.y, 1.2);
float vis2 = step(hxh, P.x);
float d1 = abs(P.x - tc.x), d2 = abs(P.y - tc.y);
float ln = (1.0 - smoothstep(w * 0.5, w * 1.6, d1)) * vis1 + (1.0 - smoothstep(w * 0.5, w * 1.6, d2)) * vis2;
float gl1 = exp(-pow(d1 / 0.035, 2.0)) * vis1 + exp(-pow(d2 / 0.035, 2.0)) * vis2;
float bead = exp(-pow(length(P - vec2(tc.x, vyh)) / 0.02, 2.0)) + exp(-pow(length(P - vec2(hxh, tc.y)) / 0.02, 2.0));
col = mix(col, H(120, 108, 238), clamp(gl1, 0.0, 1.0) * lines * 0.22);
col = mix(col, H(38, 28, 165), clamp(ln, 0.0, 1.0) * lines * 0.95);
col = mix(col, H(255, 255, 255), clamp(bead, 0.0, 1.0) * lines * 0.5);
vec2 bp = P - tc - vec2(0.0, 0.015);
float sc = mix(1.7, 1.0, smoothstep(4.5, 5.2, t));
vec2 bh = (hw + 0.016) * sc;
float ring = 1.0 - smoothstep(w, w + pxs * 1.4, abs(sdBox(bp, bh)));
float cm = clamp(step(bh.x - 0.03, abs(bp.x)) + step(bh.y - 0.03, abs(bp.y)), 0.0, 1.0) * step(bh.x - 0.03, abs(bp.x)) * step(bh.y - 0.03, abs(bp.y));
col = mix(col, H(45, 36, 176), ring * clamp(cm + 0.0, 0.0, 1.0) * lock * 0.9);
float dd = length((P - tc) * vec2(1.0, 1.0));
col = mix(col, H(150, 232, 205), exp(-dd * dd * 70.0) * ign * 0.55);
float rings = 0.0;
for (int k = 0; k < 3; k++) {
float rr = (r0 - float(k) * 0.9) * 0.26;
float on = step(0.0, rr);
rings += on * exp(-pow((dd - rr) / (0.006 + rr * 0.035 + pxs), 2.0)) * exp(-rr * 2.4) * smoothstep(0.0, 0.05, rr);
}
col = mix(col, H(12, 142, 110), clamp(rings, 0.0, 1.0) * ign * 0.9);
float m = wide > 0.5 ? smoothstep(0.30, 0.64, q.x) : 1.0;
m *= smoothstep(0.0, 0.10, q.y);
col = mix(H(243, 242, 251), col, m);
finish(col);
}
`;
export const HERO_B = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uPic;
out vec4 outColor;
float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
vec2 i = floor(p), f = fract(p);
f = f * f * (3.0 - 2.0 * f);
return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}
vec3 H(int r, int g, int b) { return pow(vec3(float(r), float(g), float(b)) / 255.0, vec3(2.2)); }
vec2 picUV(out float pxs) {
vec2 uv = gl_FragCoord.xy / uRes;
float k = (uRes.x / uRes.y) / uPic;
if (k > 1.0) { pxs = 1.0 / (k * uRes.y); return vec2(uv.x, 0.5 + (uv.y - 0.5) / k); }
pxs = 1.0 / uRes.y;
return vec2(0.5 + (uv.x - 0.5) * k, uv.y);
}
vec3 soft(vec3 c) {
vec3 over = max(c - 0.8, 0.0);
return min(c, vec3(0.8)) + 0.2 * (1.0 - exp(-over / 0.2));
}
void finish(vec3 lin) {
vec3 s = pow(soft(lin), vec3(1.0 / 2.2));
s += (hash21(gl_FragCoord.xy) - 0.5) * (2.2 / 255.0);
outColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
uniform vec4 uQuiet[16];
const int FONT[85] = int[85](
0x3E,0x51,0x49,0x45,0x3E,  0x00,0x42,0x7F,0x40,0x00,  0x42,0x61,0x51,0x49,0x46,  0x21,0x41,0x45,0x4B,0x31,
0x18,0x14,0x12,0x7F,0x10,  0x27,0x45,0x45,0x45,0x39,  0x3C,0x4A,0x49,0x49,0x30,  0x01,0x71,0x09,0x05,0x03,
0x36,0x49,0x49,0x49,0x36,  0x06,0x49,0x49,0x29,0x1E,  0x08,0x08,0x3E,0x08,0x08,  0x00,0x00,0x14,0x00,0x00,  0x00,0x00,0x00,0x40,0x00,  0x08,0x08,0x08,0x08,0x08,  0x00,0x00,0x00,0x00,0x00,  0x7F,0x7F,0x7F,0x7F,0x7F,  0x23,0x13,0x08,0x64,0x62);
float glyphOn(int idx, float cx, float ry) {
float bits = float(FONT[idx * 5 + int(clamp(cx, 0.0, 4.0))]);
return step(0.5, mod(floor(bits / exp2(clamp(ry, 0.0, 6.0))), 2.0)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
}
float quietAt(vec2 c, vec2 h) {
float q = 0.0;
for (int i = 0; i < 16; i++) {
vec4 r = uQuiet[i];
q = max(q, step(r.x + 0.0001, r.z) * step(r.x, c.x + h.x) * step(c.x - h.x, r.z) * step(r.y, c.y + h.y) * step(c.y - h.y, r.w));
}
return q;
}
vec3 dotShape(float dist, float blur, float on, float cx, float ry) {
float soft = 0.10 + blur;
float r = 0.34 + blur * 0.5;
float dotc = (1.0 - smoothstep(r - soft, r + soft, dist));
float halo = exp(-dist * dist * 1.7);
float pore = (1.0 - smoothstep(0.12, 0.2, dist)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
return vec3(dotc * on, halo * on, pore);
}
uniform float uProg[5];
uniform float uSeed[5];
uniform float uBlink;
vec3 numRow(vec2 P, float yc, float p, float x0, float bright, float blur, float rowId, float prog, float seed) {
float yr = (yc - P.y) / p + 3.5;
if (yr < -1.5 || yr > 8.5) return vec3(0.0);
float gx = (P.x - x0) / (6.0 * p);
float gi = floor(gx);
float fx = (gx - gi) * 6.0;
float cx = floor(fx), ry = floor(yr);
vec2 dv = vec2(fx, yr) - vec2(cx + 0.5, ry + 0.5);
float dist = length(dv);
float place = mod(gi, 16.0);
float quiet = quietAt(vec2(x0 + (gi + 0.5) * 6.0 * p, yc), vec2(4.0 * p, 4.5 * p));
float prg = prog * (1.0 - quiet);
float sd = seed * (1.0 - quiet);
float isPlus = step(place, 0.5);
float isBlank = step(abs(place - 4.0), 0.5) + step(abs(place - 8.0), 0.5) + step(13.5, place);
float fixedD = step(0.5, place) * step(place, 3.5);
float live = (1.0 - fixedD) * (1.0 - isPlus) * (1.0 - isBlank);
float ord = place - 5.0 - step(8.5, place);
float u = clamp((prg - ord * 0.07) / 0.46, 0.0, 1.0);
float rolling = step(0.0001, u) * (1.0 - step(0.75, u)) * live;
float oldD = floor(10.0 * hash21(vec2(gi * 1.7 + sd * 13.1, rowId + 31.0)));
float newD = floor(10.0 * hash21(vec2(gi * 1.7 + (sd + 1.0) * 13.1, rowId + 31.0)));
float rolled = floor(10.0 * hash21(vec2(gi + floor(u * 16.0) * 7.3, rowId + sd)));
float digit = rolling > 0.5 ? rolled : (u >= 0.75 ? newD : oldD);
digit = fixedD > 0.5 ? (place < 1.5 ? 3.0 : (place < 2.5 ? 7.0 : 0.0)) : digit;
float idx = isPlus > 0.5 ? 10.0 : digit;
float glyph = (1.0 - isBlank);
float on = glyph * glyphOn(int(idx), cx, ry);
float cur = step(rowId, 1.5) * step(abs(place - 14.0), 0.5) * step(abs(cx - 2.0), 0.5) * step(abs(ry - 3.0), 0.5) * (1.0 - quiet) * uBlink;
on = max(on, cur);
vec3 ds = dotShape(dist, blur, on, cx, ry);
float tl = prg - (ord * 0.07 + 0.46 * 0.75);
float landed = step(0.0, tl) * (1.0 - smoothstep(0.0, 0.15, tl)) * live;
vec3 idle = H(150, 138, 242) * bright;
vec3 rollc = H(238, 235, 255) * (bright * 1.45);
vec3 mint = H(120, 236, 190) * (bright * 1.5);
vec3 c = mix(idle, rollc, rolling);
c = mix(c, mint, clamp(max(landed, cur), 0.0, 1.0));
vec3 outc = c * (ds.x + ds.y * 0.20 * (1.0 - blur)) + H(80, 70, 190) * ds.z * (1.0 - on) * 0.10 * bright;
return outc * smoothstep(-1.5, -0.5, yr) * (1.0 - smoothstep(7.5, 8.5, yr));
}
void main() {
float pxs;
vec2 q = picUV(pxs);
vec2 P = vec2(q.x * uPic, q.y);
float wide = step(2.0, uPic);
vec3 col = mix(H(19, 13, 84), H(32, 24, 120), smoothstep(0.0, 1.0, q.y * 0.6 + 0.2));
vec2 lampAt = vec2(mix(0.80, 1.55, wide), 0.5);
float lamp = exp(-dot((P - lampAt) * vec2(0.8, 1.35), (P - lampAt) * vec2(0.8, 1.35)) * 1.3);
col += H(70, 58, 190) * lamp * 0.34;
float beam = pow(0.5 + 0.5 * sin((P.x * 0.9 - P.y * 0.55) * 5.0 + 0.4), 6.0);
col += H(60, 50, 170) * beam * 0.05 * smoothstep(0.2, 0.9, q.x);
vec3 lit = vec3(0.0);
if (wide > 0.5) {
lit += numRow(P, 0.885, 0.0100, 1.20, 1.00, 0.00, 1.0, uProg[0], uSeed[0]);
lit += numRow(P, 0.975, 0.0085, 1.35, 0.40, 0.05, 2.0, uProg[1], uSeed[1]);
lit += numRow(P, 0.800, 0.0085, 1.45, 0.40, 0.05, 3.0, uProg[2], uSeed[2]);
lit += numRow(P, 0.100, 0.0100, 1.20, 0.46, 0.05, 4.0, uProg[3], uSeed[3]);
lit += numRow(P, 0.400, 0.036, 0.70, 0.13, 0.24, 5.0, uProg[4], uSeed[4]);
} else {
float pk = 0.62;
float x0 = 0.04;
lit += numRow(P, 0.50, 0.0245 * pk, x0, 1.00, 0.00, 1.0, uProg[0], uSeed[0]);
lit += numRow(P, 0.285, 0.0175 * pk, x0 + 0.1, 0.46, 0.06, 2.0, uProg[1], uSeed[1]);
lit += numRow(P, 0.715, 0.0175 * pk, x0 - 0.2, 0.46, 0.06, 3.0, uProg[2], uSeed[2]);
lit += numRow(P, 0.115, 0.036 * pk, x0, 0.22, 0.24, 4.0, uProg[3], uSeed[3]);
lit += numRow(P, 0.885, 0.036 * pk, x0, 0.22, 0.24, 5.0, uProg[4], uSeed[4]);
}
col += lit;
float m = wide > 0.5 ? smoothstep(0.26, 0.62, q.x) : 1.0;
m *= 0.25 + 0.75 * smoothstep(0.0, 0.08, q.y) * (1.0 - smoothstep(0.92, 1.0, q.y));
col = mix(H(27, 20, 112), col, m);
finish(col);
}
`;
export const HERO_C = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uPic;
out vec4 outColor;
float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
vec2 i = floor(p), f = fract(p);
f = f * f * (3.0 - 2.0 * f);
return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}
vec3 H(int r, int g, int b) { return pow(vec3(float(r), float(g), float(b)) / 255.0, vec3(2.2)); }
vec2 picUV(out float pxs) {
vec2 uv = gl_FragCoord.xy / uRes;
float k = (uRes.x / uRes.y) / uPic;
if (k > 1.0) { pxs = 1.0 / (k * uRes.y); return vec2(uv.x, 0.5 + (uv.y - 0.5) / k); }
pxs = 1.0 / uRes.y;
return vec2(0.5 + (uv.x - 0.5) * k, uv.y);
}
vec3 soft(vec3 c) {
vec3 over = max(c - 0.8, 0.0);
return min(c, vec3(0.8)) + 0.2 * (1.0 - exp(-over / 0.2));
}
void finish(vec3 lin) {
vec3 s = pow(soft(lin), vec3(1.0 / 2.2));
s += (hash21(gl_FragCoord.xy) - 0.5) * (2.2 / 255.0);
outColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
const float CYC = 8.0;
const int N = 30;
float sdRBox(vec2 p, vec2 b, float r) { vec2 d = abs(p) - b + r; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r; }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float slackAt(float t) {
float a = 1.0 - 0.4 * smoothstep(0.0, 3.2, t);
float b = 0.6 * (1.0 - pow(smoothstep(3.2, 4.2, t), 2.2));
float rel = smoothstep(6.8, 8.0, t);
return t < 3.2 ? a : (t < 6.8 ? b : mix(0.0, 1.0, rel));
}
void main() {
float pxs;
vec2 q = picUV(pxs);
vec2 P = vec2(q.x * uPic, q.y);
float wide = step(2.0, uPic);
float t = mod(uTime, CYC);
float slack = slackAt(t);
float taut = 1.0 - slack;
float since = max(t - 4.2, 0.0);
float hum = exp(-since * 2.0) * sin(since * 19.0) * step(4.2, t) * (1.0 - smoothstep(6.8, 7.4, t));
vec2 pc0 = vec2(mix(0.98, 1.85, wide), mix(0.50, 0.56, wide));
vec2 pc = pc0 + vec2(0.012, 0.016) * taut + vec2(0.0, 0.0025) * hum;
float tilt = 0.10 * taut - 0.03 * hum;
vec3 col = mix(H(8, 34, 40), H(13, 56, 60), smoothstep(0.0, 1.0, q.y * 0.5 + 0.25));
float rr = length((P - pc) * vec2(0.9, 1.25));
col += H(36, 120, 112) * exp(-rr * rr * 2.2) * (0.28 + 0.35 * taut);
col += H(120, 112, 230) * exp(-rr * rr * 14.0) * (0.15 + 0.35 * taut);
float w = max(0.0016, 0.95 * pxs);
vec3 thr = vec3(0.0);
for (int i = 0; i < N; i++) {
float fi = float(i);
float h1 = hash11(fi * 1.91 + 3.0), h2 = hash11(fi * 4.37 + 9.0), h3 = hash11(fi * 7.13 + 1.0);
float ang = mix(-0.95, 2.25, (fi + h1 * 0.8) / float(N));
vec2 dir = vec2(cos(ang), sin(ang));
vec2 A = pc0 + dir * mix(1.5, 2.6, h2);
vec2 bl = vec2(cos(h3 * 6.2832), sin(h3 * 6.2832)) * vec2(0.052, 0.098) * 0.9;
vec2 B = pc + rot(tilt) * bl;
vec2 ab = B - A;
float L = length(ab);
vec2 nrm = vec2(-ab.y, ab.x) / L;
float s = clamp(dot(P - A, ab) / (L * L), 0.0, 1.0);
float side = h1 < 0.5 ? -1.0 : 1.0;
float sagAmp = mix(0.10, 0.34, h2) * side;
float wob = 0.65 + 0.35 * sin(t * (0.7 + h3) + fi * 2.3);
float disp = sagAmp * slack * wob * sin(3.14159 * s)
+ 0.014 * hum * sin(3.14159 * s * (1.0 + floor(h1 * 3.0)));
float d = abs(dot(P - A, nrm) - disp);
float depth = mix(0.55, 1.0, h2);
float core = 1.0 - smoothstep(w * 0.5, w * (1.2 + (1.0 - depth)), d);
float glow = exp(-pow(d / 0.011, 2.0)) * 0.22;
float fade = smoothstep(0.0, 0.35, s) * smoothstep(1.02, 0.9, s);
float bright = (0.30 + 0.70 * taut) * depth * (0.7 + 0.3 * h3);
float pp = clamp((t - 3.0 - h3 * 0.5) / 1.1, 0.0, 1.0);
float pulse = exp(-pow((s - pp) / 0.07, 2.0)) * step(3.0, t) * step(t, 5.3) * (1.0 - step(1.0, pp) * 0.0);
thr += (core * bright + glow * bright * 0.6) * fade * H(188, 232, 222);
thr += (core * 1.6 + glow * 2.2) * pulse * fade * depth * H(236, 244, 255);
}
col += thr * 0.9;
vec2 pp2 = rot(-tilt) * (P - pc);
float body = sdRBox(pp2, vec2(0.056, 0.104), 0.016);
float inBody = 1.0 - smoothstep(-pxs, pxs, body);
float rim = (1.0 - smoothstep(0.0, 0.0035 + pxs, abs(body + 0.002)));
float scr = 1.0 - smoothstep(-pxs, pxs, sdRBox(pp2, vec2(0.049, 0.096), 0.011));
float sv = clamp((pp2.y + 0.096) / 0.192, 0.0, 1.0);
float lum = 0.32 + 0.68 * taut + 0.08 * hum;
vec3 screen = mix(H(150, 140, 240), H(226, 232, 255), pow(sv, 1.2)) * lum;
vec2 cp = pp2 - vec2(0.0, 0.020);
float card = (1.0 - smoothstep(-pxs, pxs, sdRBox(cp, vec2(0.040, 0.026), 0.008)));
float ln1 = (1.0 - smoothstep(-pxs, pxs, sdRBox(cp - vec2(-0.010, 0.010), vec2(0.022, 0.0028), 0.0014)));
float ln2 = (1.0 - smoothstep(-pxs, pxs, sdRBox(cp - vec2(-0.016, -0.002), vec2(0.016, 0.0022), 0.0011)));
float btn = (1.0 - smoothstep(-pxs, pxs, sdRBox(cp - vec2(0.0, -0.016), vec2(0.030, 0.006), 0.004)));
screen = mix(screen, H(246, 248, 255) * lum * 0.92, card * 0.42);
screen = mix(screen, H(70, 60, 190), (ln1 + ln2) * 0.7 * card);
screen = mix(screen, H(10, 106, 82) * 1.6, btn * 0.8);
vec3 phone = H(10, 24, 30);
phone = mix(phone, H(124, 150, 150), rim * 0.8);
phone = mix(phone, screen, scr);
col = mix(col, phone, inBody * (1.0 - wide));
col += H(150, 140, 245) * exp(-pow(max(body, 0.0) / 0.03, 2.0)) * (0.16 + 0.34 * taut) * (1.0 - inBody) * (1.0 - wide);
for (int k = 0; k < 7; k++) {
float fk = float(k);
vec2 sp = vec2(pc0.x + (hash11(fk * 3.3) - 0.5) * 1.0, mod(hash11(fk * 8.1) + uTime * (0.012 + 0.01 * hash11(fk)), 1.0));
col += H(120, 200, 190) * exp(-dot(P - sp, P - sp) / 0.00006) * 0.16 * (0.5 + 0.5 * sin(uTime * 0.7 + fk));
}
float m = wide > 0.5 ? smoothstep(0.24, 0.60, q.x) : 1.0;
m *= 0.25 + 0.75 * smoothstep(0.0, 0.08, q.y) * (1.0 - smoothstep(0.92, 1.0, q.y));
col = mix(H(9, 38, 44), col, m);
finish(col);
}
`;
export const HERO_T = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uPic;
out vec4 outColor;
float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
vec2 i = floor(p), f = fract(p);
f = f * f * (3.0 - 2.0 * f);
return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}
vec3 H(int r, int g, int b) { return pow(vec3(float(r), float(g), float(b)) / 255.0, vec3(2.2)); }
vec2 picUV(out float pxs) {
vec2 uv = gl_FragCoord.xy / uRes;
float k = (uRes.x / uRes.y) / uPic;
if (k > 1.0) { pxs = 1.0 / (k * uRes.y); return vec2(uv.x, 0.5 + (uv.y - 0.5) / k); }
pxs = 1.0 / uRes.y;
return vec2(0.5 + (uv.x - 0.5) * k, uv.y);
}
vec3 soft(vec3 c) {
vec3 over = max(c - 0.8, 0.0);
return min(c, vec3(0.8)) + 0.2 * (1.0 - exp(-over / 0.2));
}
void finish(vec3 lin) {
vec3 s = pow(soft(lin), vec3(1.0 / 2.2));
s += (hash21(gl_FragCoord.xy) - 0.5) * (2.2 / 255.0);
outColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
uniform vec4 uQuiet[16];
const int FONT[85] = int[85](
0x3E,0x51,0x49,0x45,0x3E,  0x00,0x42,0x7F,0x40,0x00,  0x42,0x61,0x51,0x49,0x46,  0x21,0x41,0x45,0x4B,0x31,
0x18,0x14,0x12,0x7F,0x10,  0x27,0x45,0x45,0x45,0x39,  0x3C,0x4A,0x49,0x49,0x30,  0x01,0x71,0x09,0x05,0x03,
0x36,0x49,0x49,0x49,0x36,  0x06,0x49,0x49,0x29,0x1E,  0x08,0x08,0x3E,0x08,0x08,  0x00,0x00,0x14,0x00,0x00,  0x00,0x00,0x00,0x40,0x00,  0x08,0x08,0x08,0x08,0x08,  0x00,0x00,0x00,0x00,0x00,  0x7F,0x7F,0x7F,0x7F,0x7F,  0x23,0x13,0x08,0x64,0x62);
float glyphOn(int idx, float cx, float ry) {
float bits = float(FONT[idx * 5 + int(clamp(cx, 0.0, 4.0))]);
return step(0.5, mod(floor(bits / exp2(clamp(ry, 0.0, 6.0))), 2.0)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
}
float quietAt(vec2 c, vec2 h) {
float q = 0.0;
for (int i = 0; i < 16; i++) {
vec4 r = uQuiet[i];
q = max(q, step(r.x + 0.0001, r.z) * step(r.x, c.x + h.x) * step(c.x - h.x, r.z) * step(r.y, c.y + h.y) * step(c.y - h.y, r.w));
}
return q;
}
vec3 dotShape(float dist, float blur, float on, float cx, float ry) {
float soft = 0.10 + blur;
float r = 0.34 + blur * 0.5;
float dotc = (1.0 - smoothstep(r - soft, r + soft, dist));
float halo = exp(-dist * dist * 1.7);
float pore = (1.0 - smoothstep(0.12, 0.2, dist)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
return vec3(dotc * on, halo * on, pore);
}
uniform float uPos;
uniform float uFocus;
uniform float uFade;
float dropOut(float h, float fade) { return 1.0 - smoothstep(h * 0.62, h * 0.62 + 0.38, fade); }
vec3 stepsRow(vec2 P, float yc, float p, float x0, float s, float bright, float blur, float rowId, float pos, float focus, float fade) {
float yr = (yc - P.y) / p + 3.5;
if (yr < -1.5 || yr > 8.5) return vec3(0.0);
float gx = (P.x - x0) / (6.0 * p);
float gi = floor(gx);
float fx = (gx - gi) * 6.0;
float cx = floor(fx), ry = floor(yr);
float k = gi / s;
float isGlyph = step(0.0, k) * step(k, 4.5) * step(abs(k - floor(k + 0.5)), 0.01);
k = floor(k + 0.5);
float quiet = quietAt(vec2(x0 + (gi + 0.5) * 6.0 * p, yc), vec2(4.0 * p, 4.5 * p));
float foc = focus * (1.0 - quiet);
float fd = fade * (1.0 - quiet);
float t = pos - (k + 1.0);
float base = 0.22 + 0.30 * smoothstep(-0.5, 0.5, t);
float peak = 0.5 * (1.0 - smoothstep(0.0, 0.9, abs(t)));
float level = mix(0.62, base + peak, foc);
float hot = mix(0.0, peak * 2.0, foc);
float on = isGlyph * glyphOn(int(clamp(k + 1.0, 0.0, 9.0)), cx, ry);
vec2 dv = vec2(fx, yr) - vec2(cx + 0.5, ry + 0.5);
vec3 ds = dotShape(length(dv), blur, on, cx, ry);
float alive = dropOut(hash21(vec2(gi * 5.0 + cx, ry + rowId * 17.0)), fd);
vec3 idle = H(226, 128, 176) * (bright * level);
vec3 lit = mix(idle, H(255, 226, 238) * (bright * level * 1.25), clamp(hot, 0.0, 1.0));
vec3 outc = lit * (ds.x + ds.y * 0.20 * (1.0 - blur)) * alive + H(34, 104, 116) * ds.z * (1.0 - on) * 0.10 * bright;
return outc * smoothstep(-1.5, -0.5, yr) * (1.0 - smoothstep(7.5, 8.5, yr));
}
vec3 echoRow(vec2 P, float yc, float p, float x0, float bright, float rowId, float pos, float fade) {
float yr = (yc - P.y) / p + 3.5;
if (yr < -1.5 || yr > 8.5) return vec3(0.0);
float gx = (P.x - x0) / (6.0 * p);
float gi = floor(gx);
float fx = (gx - gi) * 6.0;
float cx = floor(fx), ry = floor(yr);
float isGlyph = step(0.0, gi) * step(gi, 0.5);
float quiet = quietAt(vec2(x0 + 3.0 * p, yc), vec2(3.0 * p, 4.5 * p));
float ps = mix(max(pos, 1.0), 1.0, quiet);
float d0 = clamp(floor(ps), 1.0, 5.0);
float d1 = clamp(d0 + 1.0, 1.0, 5.0);
float cross = fract(ps) * step(floor(ps), 4.5);
float turn = hash21(vec2(cx + 3.0, ry + 11.0)) * 0.6;
float on = isGlyph * mix(glyphOn(int(d0), cx, ry), glyphOn(int(d1), cx, ry), smoothstep(turn, turn + 0.4, cross));
vec2 dv = vec2(fx, yr) - vec2(cx + 0.5, ry + 0.5);
vec3 ds = dotShape(length(dv), 0.0, on, cx, ry);
float alive = dropOut(hash21(vec2(cx + 60.0, ry + rowId * 17.0)), fade * (1.0 - quiet));
vec3 outc = H(226, 128, 176) * (bright * ds.x * alive + bright * ds.y * 0.05 * alive) + H(34, 104, 116) * ds.z * (1.0 - on) * 0.10 * bright;
return outc * smoothstep(-1.5, -0.5, yr) * (1.0 - smoothstep(7.5, 8.5, yr));
}
float gridGround(vec2 P, float pg) {
vec2 g = P / pg;
float d = length(fract(g) - 0.5);
return (1.0 - smoothstep(0.10, 0.20, d)) * (1.0 - quietAt((floor(g) + 0.5) * pg, vec2(pg)));
}
void main() {
float pxs;
vec2 q = picUV(pxs);
vec2 P = vec2(q.x * uPic, q.y);
float wide = step(2.3, uPic);
vec3 col = mix(H(6, 26, 36), H(10, 40, 50), smoothstep(0.0, 1.0, q.y * 0.7 + 0.15));
vec2 lampAt = vec2(mix(1.6, 1.9, wide), mix(0.7, 0.75, wide));
vec2 ld = (P - lampAt) * vec2(0.7, 1.5);
col += H(24, 140, 156) * exp(-dot(ld, ld) * 1.2) * 0.15;
vec2 ld2 = (P - vec2(2.2, 0.25)) * vec2(0.8, 1.1);
col += H(46, 128, 96) * exp(-dot(ld2, ld2) * 1.4) * 0.16 * wide;
vec3 lit = vec3(0.0);
if (wide > 0.5) {
lit += stepsRow(P, 0.91, 0.0100, 1.66, 2.0, 1.00, 0.00, 1.0, uPos, uFocus, uFade);
lit += echoRow(P, 0.775, 0.0310, 2.21, 0.80, 3.0, uPos, uFade);
col += H(70, 156, 168) * gridGround(P, 0.022) * 0.16;
} else {
lit += stepsRow(P, 0.72, 0.0360, 0.15, 2.0, 1.00, 0.00, 1.0, uPos, uFocus, uFade);
lit += echoRow(P, 0.43, 0.0340, 1.45, 0.80, 3.0, uPos, uFade);
}
col += lit;
float m = wide > 0.5 ? smoothstep(0.10, 0.40, q.x) : smoothstep(0.0, 0.04, q.x) * (1.0 - smoothstep(0.96, 1.0, q.x));
m *= 0.25 + 0.75 * smoothstep(0.0, 0.10, q.y) * (1.0 - smoothstep(0.94, 1.0, q.y));
col = mix(H(10, 38, 48), col, m);
finish(col);
}
`;
export const HERO_K = `#version 300 es
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uPic;
out vec4 outColor;
float hash11(float p) { p = fract(p * 0.1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
vec2 i = floor(p), f = fract(p);
f = f * f * (3.0 - 2.0 * f);
return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
}
vec3 H(int r, int g, int b) { return pow(vec3(float(r), float(g), float(b)) / 255.0, vec3(2.2)); }
vec2 picUV(out float pxs) {
vec2 uv = gl_FragCoord.xy / uRes;
float k = (uRes.x / uRes.y) / uPic;
if (k > 1.0) { pxs = 1.0 / (k * uRes.y); return vec2(uv.x, 0.5 + (uv.y - 0.5) / k); }
pxs = 1.0 / uRes.y;
return vec2(0.5 + (uv.x - 0.5) * k, uv.y);
}
vec3 soft(vec3 c) {
vec3 over = max(c - 0.8, 0.0);
return min(c, vec3(0.8)) + 0.2 * (1.0 - exp(-over / 0.2));
}
void finish(vec3 lin) {
vec3 s = pow(soft(lin), vec3(1.0 / 2.2));
s += (hash21(gl_FragCoord.xy) - 0.5) * (2.2 / 255.0);
outColor = vec4(clamp(s, 0.0, 1.0), 1.0);
}
uniform vec4 uQuiet[16];
const int FONT[85] = int[85](
0x3E,0x51,0x49,0x45,0x3E,  0x00,0x42,0x7F,0x40,0x00,  0x42,0x61,0x51,0x49,0x46,  0x21,0x41,0x45,0x4B,0x31,
0x18,0x14,0x12,0x7F,0x10,  0x27,0x45,0x45,0x45,0x39,  0x3C,0x4A,0x49,0x49,0x30,  0x01,0x71,0x09,0x05,0x03,
0x36,0x49,0x49,0x49,0x36,  0x06,0x49,0x49,0x29,0x1E,  0x08,0x08,0x3E,0x08,0x08,  0x00,0x00,0x14,0x00,0x00,  0x00,0x00,0x00,0x40,0x00,  0x08,0x08,0x08,0x08,0x08,  0x00,0x00,0x00,0x00,0x00,  0x7F,0x7F,0x7F,0x7F,0x7F,  0x23,0x13,0x08,0x64,0x62);
float glyphOn(int idx, float cx, float ry) {
float bits = float(FONT[idx * 5 + int(clamp(cx, 0.0, 4.0))]);
return step(0.5, mod(floor(bits / exp2(clamp(ry, 0.0, 6.0))), 2.0)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
}
float quietAt(vec2 c, vec2 h) {
float q = 0.0;
for (int i = 0; i < 16; i++) {
vec4 r = uQuiet[i];
q = max(q, step(r.x + 0.0001, r.z) * step(r.x, c.x + h.x) * step(c.x - h.x, r.z) * step(r.y, c.y + h.y) * step(c.y - h.y, r.w));
}
return q;
}
vec3 dotShape(float dist, float blur, float on, float cx, float ry) {
float soft = 0.10 + blur;
float r = 0.34 + blur * 0.5;
float dotc = (1.0 - smoothstep(r - soft, r + soft, dist));
float halo = exp(-dist * dist * 1.7);
float pore = (1.0 - smoothstep(0.12, 0.2, dist)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
return vec3(dotc * on, halo * on, pore);
}
uniform vec3 uGround;
uniform vec3 uPool;
uniform vec3 uInk;
uniform vec3 uLamp;
uniform vec4 uN;
uniform float uD;
uniform float uSeed;
uniform float uG[58];
uniform float uR[30];
uniform float uP[30];
vec3 cellRow(vec2 P, float yc, float d, float xr, float n, int base, float ghost, float blur) {
float xl = xr - n * 6.0 * d;
float lx = (P.x - xl) / d;
float yy = (P.y - (yc - 3.5 * d)) / d;
if (n < 0.5 || lx < 0.0 || lx >= n * 6.0 || yy < 0.0 || yy >= 7.0) return vec3(0.0);
float ci = floor(lx / 6.0);
float cx = floor(lx - ci * 6.0);
float ry = 6.0 - floor(yy);
float dist = length(vec2(fract(lx), fract(yy)) - 0.5);
float g = uG[base + int(ci)];
float on = glyphOn(int(g), cx, ry);
if (ghost < 0.5 && uR[base + int(ci)] > 0.0) {
float turn = hash11(float(base) * 7.0 + ci * 13.7 + cx * 3.1 + ry * 5.3 + uSeed) * 0.6;
on = mix(on, glyphOn(int(uP[base + int(ci)]), cx, ry), smoothstep(turn, turn + 0.4, uR[base + int(ci)]));
}
on *= 1.0 - quietAt(vec2(xl + (ci * 6.0 + 2.5) * d, yc), vec2(3.0 * d, 4.0 * d));
vec3 ds = dotShape(dist, blur, on, cx, ry);
ds.y *= 1.0 - smoothstep(0.25, 0.5, dist);
return ds * vec3(1.0 - 0.72 * ghost, 1.0 - 0.8 * ghost, 1.0);
}
void main() {
float pxs;
vec2 p = picUV(pxs);
vec2 P = vec2(p.x * uPic, p.y);
float pool = exp(-dot((P - vec2(1.95, 0.52)) * vec2(0.6, 1.4), (P - vec2(1.95, 0.52)) * vec2(0.6, 1.4)) * 1.1);
vec3 col = mix(uGround, uPool, pool * (0.75 + 0.25 * vnoise(P * 6.0 + uSeed)));
vec3 pore = mix(col, uInk, 0.13);
float xr = 2.86;
vec3 s = cellRow(P, 0.82, uD * 0.45, xr, uN.z, 30, 1.0, 0.0);
s = max(s, cellRow(P, 0.55, uD, xr, uN.x, 0, 0.0, 0.05));
s = max(s, cellRow(P, 0.55 - 6.6 * uD, uD * 0.5, xr, uN.y, 14, 0.0, 0.03));
s = max(s, cellRow(P, 0.14, uD * 0.45, xr, uN.w, 44, 1.0, 0.0));
col = mix(col, pore, s.z * (1.0 - s.x));
col = mix(col, uLamp, s.y * 0.30);
col = mix(col, uInk, s.x);
finish(col);
}
`;
