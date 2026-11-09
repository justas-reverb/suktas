#version 300 es
precision highp float;

// Shared by the three hero directions (a, b, c). The picture has its own shape (uPic = width / height:
// 2.4 for the wide still, 4/3 for the phone's). The box that shows it may have another shape, and the
// still is shown with object-fit: cover, so the shader does the same crop: picUV() maps a pixel of the
// box to the picture's own 0..1 square, and pxs is one pixel in picture-height units. At the painter's
// box (the picture's own shape) the crop is the identity, so a still and the live canvas are one image.

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

// colours are written as sRGB 0..255 and mixed in linear light
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
