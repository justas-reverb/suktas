// The caller-ID dot matrix, shared by direction B (the number) and the home page's "Kaip jis galvoja" band
// (think.frag.glsl): the 5x7 glyphs, the rectangles no moving dot may sit under, and the look of one dot.
uniform vec4 uQuiet[16];

// 5x7 dot-matrix glyphs, one int per column, bit 0 = top row: digits 0-9, then '+', ':', '.', '-', a blank, a block and '%'
const int FONT[85] = int[85](
  0x3E,0x51,0x49,0x45,0x3E,  0x00,0x42,0x7F,0x40,0x00,  0x42,0x61,0x51,0x49,0x46,  0x21,0x41,0x45,0x4B,0x31,
  0x18,0x14,0x12,0x7F,0x10,  0x27,0x45,0x45,0x45,0x39,  0x3C,0x4A,0x49,0x49,0x30,  0x01,0x71,0x09,0x05,0x03,
  0x36,0x49,0x49,0x49,0x36,  0x06,0x49,0x49,0x29,0x1E,  0x08,0x08,0x3E,0x08,0x08,  0x00,0x00,0x14,0x00,0x00,  0x00,0x00,0x00,0x40,0x00,  0x08,0x08,0x08,0x08,0x08,  0x00,0x00,0x00,0x00,0x00,  0x7F,0x7F,0x7F,0x7F,0x7F,  0x23,0x13,0x08,0x64,0x62);

// 1 where the dot of glyph idx (0-9 digits, 10 '+', 11 ':', 12 '.', 13 '-', 14 blank, 15 block, 16 '%') at column cx, row ry is lit
float glyphOn(int idx, float cx, float ry) {
  float bits = float(FONT[idx * 5 + int(clamp(cx, 0.0, 4.0))]);
  return step(0.5, mod(floor(bits / exp2(clamp(ry, 0.0, 6.0))), 2.0)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
}

// 1 where the digit cell (centre c, half size h, picture units) meets a quiet rectangle (x0, y0, x1, y1)
float quietAt(vec2 c, vec2 h) {
  float q = 0.0;
  for (int i = 0; i < 16; i++) {
    vec4 r = uQuiet[i];
    q = max(q, step(r.x + 0.0001, r.z) * step(r.x, c.x + h.x) * step(c.x - h.x, r.z) * step(r.y, c.y + h.y) * step(c.y - h.y, r.w));
  }
  return q;
}

// One dot: x the dot's body (0 where the glyph is dark), y its halo, z the pore of the unlit panel.
// dist: distance from the dot's centre in dot pitches, blur: how far out of focus the row is.
vec3 dotShape(float dist, float blur, float on, float cx, float ry) {
  float soft = 0.10 + blur;
  float r = 0.34 + blur * 0.5;
  float dotc = (1.0 - smoothstep(r - soft, r + soft, dist));
  float halo = exp(-dist * dist * 1.7);
  float pore = (1.0 - smoothstep(0.12, 0.2, dist)) * step(cx, 4.5) * step(0.0, ry) * step(ry, 6.5);
  return vec3(dotc * on, halo * on, pore);
}
