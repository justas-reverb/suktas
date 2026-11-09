// Direction A, "Pasirinkimas" (the choice): his first move, seen from his side. A block of flats in
// daylight, rows of windows with balcony slabs, blinds and curtains. A column of ink and a row of ink
// slide in from the edges like a sight and meet on one window; brackets close round it, it lights, and
// rings leave it across the wall and wake the windows they pass. Nobody else in the block ever knew.
// Ten seconds a round, a new window each round. Indigo is his line, mint is the alarm.

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

  // the window he picks this round (a cell near the middle of what the page shows)
  float hx = hash11(cyc * 3.17 + 1.3), hy = hash11(cyc * 5.71 + 4.1);
  float tx = mix(0.55, 1.05, hx) * (1.0 - wide) + mix(1.30, 1.95, hx) * wide;
  float ty = mix(0.30, 0.66, hy);
  vec2 tid = floor(vec2(tx, ty) / CS);
  vec2 tc = (tid + 0.5) * CS;

  // the sight: two inks arrive, slowing at the end; the brackets close; the window takes the light
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

  // the wall: pale concrete in sun, a panel seam every second column, grain, the slab's shade
  float grain = vnoise(P * 70.0) * 0.5 + vnoise(P * 17.0) * 0.5;
  vec3 wall = mix(H(222, 218, 244), H(238, 236, 251), smoothstep(0.0, 1.0, P.y * 0.8 + grain * 0.25));
  wall *= 0.97 + 0.05 * (rnd - 0.5);
  float seamX = min(fract(g.x * 0.5), 1.0 - fract(g.x * 0.5)) * CS.x * 2.0;
  wall = mix(wall, H(196, 190, 230), (1.0 - smoothstep(0.0, 0.0022 + pxs, seamX)) * 0.55);
  wall *= 1.0 - 0.16 * smoothstep(0.78, 1.0, f.y);

  // the balcony slab at the foot of each cell, lit on its lip
  float sy = f.y * CS.y;
  float slab = 1.0 - smoothstep(0.034 - pxs, 0.034, sy);
  float lip = (1.0 - smoothstep(0.0, 0.005 + pxs, abs(sy - 0.034))) * 0.8;
  wall = mix(wall, H(206, 201, 236), slab);
  wall = mix(wall, H(247, 246, 253), lip);
  wall *= 1.0 - 0.2 * (1.0 - smoothstep(0.0, 0.004 + pxs, sy)) * 0.0;

  // the window: set back in the wall, a frame, glass with sky in it, a blind or a curtain on some
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

  // the rings that will leave the window wake the glass they pass
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

  // the sight itself, drawn over the wall: a head that is brighter than its trail
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

  // brackets close round the window
  vec2 bp = P - tc - vec2(0.0, 0.015);
  float sc = mix(1.7, 1.0, smoothstep(4.5, 5.2, t));
  vec2 bh = (hw + 0.016) * sc;
  float ring = 1.0 - smoothstep(w, w + pxs * 1.4, abs(sdBox(bp, bh)));
  float cm = clamp(step(bh.x - 0.03, abs(bp.x)) + step(bh.y - 0.03, abs(bp.y)), 0.0, 1.0) * step(bh.x - 0.03, abs(bp.x)) * step(bh.y - 0.03, abs(bp.y));
  col = mix(col, H(45, 36, 176), ring * clamp(cm + 0.0, 0.0, 1.0) * lock * 0.9);

  // ringing: a mint glow in the wall, then rings leaving the window, one every 0.9 s
  float dd = length((P - tc) * vec2(1.0, 1.0));
  col = mix(col, H(150, 232, 205), exp(-dd * dd * 70.0) * ign * 0.55);
  float rings = 0.0;
  for (int k = 0; k < 3; k++) {
    float rr = (r0 - float(k) * 0.9) * 0.26;
    float on = step(0.0, rr);
    rings += on * exp(-pow((dd - rr) / (0.006 + rr * 0.035 + pxs), 2.0)) * exp(-rr * 2.4) * smoothstep(0.0, 0.05, rr);
  }
  col = mix(col, H(12, 142, 110), clamp(rings, 0.0, 1.0) * ign * 0.9);

  // the picture falls into the page's own ground away from him
  float m = wide > 0.5 ? smoothstep(0.30, 0.64, q.x) : 1.0;
  m *= smoothstep(0.0, 0.10, q.y);
  col = mix(H(243, 242, 251), col, m);
  finish(col);
}
