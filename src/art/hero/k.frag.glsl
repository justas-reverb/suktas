// The page bands (direction k): one dot-matrix panel for every scam family, in the family's own colours.
// A main row of big digits and a smaller row under it, each right-aligned, and two faint ghost rows of
// digits that never move. Which digit sits in which cell is the clock's (herodial.js createBand): uG holds
// a glyph per cell, uP the glyph it had before and uR how much of that old glyph still shows (0 = at rest). The picture is
// 3:1 and the digits sit at its right, where the page's crop (object-position: right) always shows them.
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

// one row of dots: x the lit body, y its halo, z the unlit pore
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
    // each dot changes over a little after its neighbour, so a digit melts into the next
    float turn = hash11(float(base) * 7.0 + ci * 13.7 + cx * 3.1 + ry * 5.3 + uSeed) * 0.6;
    on = mix(on, glyphOn(int(uP[base + int(ci)]), cx, ry), smoothstep(turn, turn + 0.4, uR[base + int(ci)]));
  }
  on *= 1.0 - quietAt(vec2(xl + (ci * 6.0 + 2.5) * d, yc), vec2(3.0 * d, 4.0 * d));
  vec3 ds = dotShape(dist, blur, on, cx, ry);
  // the halo is cut at the dot's own cell, which shows as a square round every lit dot: let it die inside the cell
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
