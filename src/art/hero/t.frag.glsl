// The home page's "Kaip jis galvoja" band, a sibling of direction B: the same caller-ID dots, but wine and
// rose where B is indigo and lilac, and the numbers are his plan. Five numerals, 1 to 5, are the five steps
// (Pasirinkimas, Pretekstas, Spaudimas, Veiksmas, Pasitraukimas). Nothing here is a fact about anyone: they are the step numbers.
// The page owns the clock: uPos is the step the glow is on (it glides from one to the next), uFocus how far
// the glow has gathered on it (0 = all five lit alike, which is the still), uFade the end of a round (the dots drop out one
// by one). A digit under a rectangle of uQuiet (the band's text) never leaves the still. Every uniform at 0 is the still.
uniform float uPos;
uniform float uFocus;
uniform float uFade;

float dropOut(float h, float fade) { return 1.0 - smoothstep(h * 0.62, h * 0.62 + 0.38, fade); }

// The five steps. yc: middle of the row, p: dot pitch, x0: the first numeral's left edge, s: cells between numerals.
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
  // where the glow is: ahead of it dim, on it bright, behind it a steady medium
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

// The step he is on, large: the same numeral as the lit one in the row, so the picture says one thing. While the
// glow glides from step k to k+1 each dot fades to the next numeral a little after its neighbour. At rest it shows 1.
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

// An unlit panel behind everything: a quiet grid of pores, kept out from under the band's text.
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

  // the ground: deep wine, a rose lamp behind the steps
  vec3 col = mix(H(6, 26, 36), H(10, 40, 50), smoothstep(0.0, 1.0, q.y * 0.7 + 0.15));
  // two lamps on a wide band: one behind the steps, one low in the right margin, so the foot is not flat
  vec2 lampAt = vec2(mix(1.6, 1.9, wide), mix(0.7, 0.75, wide));
  vec2 ld = (P - lampAt) * vec2(0.7, 1.5);
  col += H(24, 140, 156) * exp(-dot(ld, ld) * 1.2) * 0.15;
  vec2 ld2 = (P - vec2(2.2, 0.25)) * vec2(0.8, 1.1);
  col += H(46, 128, 96) * exp(-dot(ld2, ld2) * 1.4) * 0.16 * wide;

  vec3 lit = vec3(0.0);
  if (wide > 0.5) {
    // top right, above the list's rings at every width (the rings sit at y 0.57 on a 1440 band, 0.71 on a 2560 one):
    // the five steps; the large echo stands under the row's end, clear of the list at every width and of the panel's
    // side inset (gutters.js caps it at 0.0864 picture heights, so a five-cell numeral must end by 2.31)
    lit += stepsRow(P, 0.91, 0.0100, 1.66, 2.0, 1.00, 0.00, 1.0, uPos, uFocus, uFade);
    lit += echoRow(P, 0.745, 0.0310, 2.115, 0.80, 3.0, uPos, uFade);
    col += H(70, 156, 168) * gridGround(P, 0.022) * 0.16;
  } else {
    lit += stepsRow(P, 0.72, 0.0360, 0.15, 2.0, 1.00, 0.00, 1.0, uPos, uFocus, uFade);
    lit += echoRow(P, 0.43, 0.0340, 1.45, 0.80, 3.0, uPos, uFade);
  }
  col += lit;

  // the picture falls into the band's own ground away from the steps
  float m = wide > 0.5 ? smoothstep(0.10, 0.40, q.x) : smoothstep(0.0, 0.04, q.x) * (1.0 - smoothstep(0.96, 1.0, q.x));
  m *= 0.25 + 0.75 * smoothstep(0.0, 0.10, q.y) * (1.0 - smoothstep(0.94, 1.0, q.y));
  col = mix(H(10, 38, 48), col, m);
  finish(col);
}
