// Direction B, "Numeris" (the number): the caller's face is only digits, and he writes them himself.
// Rows of caller-ID dots on indigo, out of focus further from the middle. The country code stays; the
// other digits are dialled again one by one (they roll, then settle on another and flash mint as they
// land). The page, not this shader, owns the clock: uProg[row] runs 0..1 through one re-dial of a row,
// uSeed[row] counts the numbers it has shown, uBlink is the cursor dot after the centre number. A digit
// under any rectangle of uQuiet (the text, the reel) never leaves the number the still shows. Every
// uniform at 0 is the still. Nothing here is a real number.
uniform float uProg[5];
uniform float uSeed[5];
uniform float uBlink;

// One row of numbers. yc: its middle, p: dot pitch, x0: where the number starts, blur: how far out of focus,
// prog and seed: this row's re-dial (see the header).
vec3 numRow(vec2 P, float yc, float p, float x0, float bright, float blur, float rowId, float prog, float seed) {
  float yr = (yc - P.y) / p + 3.5;
  if (yr < -1.5 || yr > 8.5) return vec3(0.0);
  float gx = (P.x - x0) / (6.0 * p);
  float gi = floor(gx);
  float fx = (gx - gi) * 6.0;
  float cx = floor(fx), ry = floor(yr);
  vec2 dv = vec2(fx, yr) - vec2(cx + 0.5, ry + 0.5);
  float dist = length(dv);

  // which character is this one: '+370 ### ####', a number of 13 places, the rest blank
  float place = mod(gi, 16.0);
  float quiet = quietAt(vec2(x0 + (gi + 0.5) * 6.0 * p, yc), vec2(4.0 * p, 4.5 * p));
  float prg = prog * (1.0 - quiet);
  float sd = seed * (1.0 - quiet);
  float isPlus = step(place, 0.5);
  float isBlank = step(abs(place - 4.0), 0.5) + step(abs(place - 8.0), 0.5) + step(13.5, place);
  float fixedD = step(0.5, place) * step(place, 3.5);
  float live = (1.0 - fixedD) * (1.0 - isPlus) * (1.0 - isBlank);
  // the eight places that are dialled, left to right, each starting a little after the one before
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

  // the cursor after the centre number: one dot, lit by the page
  float cur = step(rowId, 1.5) * step(abs(place - 14.0), 0.5) * step(abs(cx - 2.0), 0.5) * step(abs(ry - 3.0), 0.5) * (1.0 - quiet) * uBlink;
  on = max(on, cur);

  vec3 ds = dotShape(dist, blur, on, cx, ry);

  // the landing: a mint flash as the roll stops, gone before the row's progress reaches 1
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

  // the stage: deep indigo, a lilac lamp in the middle of the number, soft beams across
  vec3 col = mix(H(19, 13, 84), H(32, 24, 120), smoothstep(0.0, 1.0, q.y * 0.6 + 0.2));
  vec2 lampAt = vec2(mix(0.80, 1.55, wide), 0.5);
  float lamp = exp(-dot((P - lampAt) * vec2(0.8, 1.35), (P - lampAt) * vec2(0.8, 1.35)) * 1.3);
  col += H(70, 58, 190) * lamp * 0.34;
  float beam = pow(0.5 + 0.5 * sin((P.x * 0.9 - P.y * 0.55) * 5.0 + 0.4), 6.0);
  col += H(60, 50, 170) * beam * 0.05 * smoothstep(0.2, 0.9, q.x);

  vec3 lit = vec3(0.0);
  if (wide > 0.5) {
    // wide: the dialling number lies whole in the open band above the phone, right of the headline; the rest sit behind
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

  // the picture falls into the page's own ground away from him
  float m = wide > 0.5 ? smoothstep(0.26, 0.62, q.x) : 1.0;
  m *= 0.25 + 0.75 * smoothstep(0.0, 0.08, q.y) * (1.0 - smoothstep(0.92, 1.0, q.y));
  col = mix(H(27, 20, 112), col, m);
  finish(col);
}
