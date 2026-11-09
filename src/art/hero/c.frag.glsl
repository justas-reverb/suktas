// Direction C, "Siūlai" (the strings): a small lit phone on a dark jade ground, and about thirty threads
// that come in from beyond the edges. For three seconds they hang slack and drift. Then a pulse of light
// runs down every one of them, they pull taut onto the phone, the phone leans into the pull and its
// screen takes the light, and the threads hum as they settle. Then he lets go and it starts again.
// Eight seconds a round. The threads are his; the phone is somebody's evening.

const float CYC = 8.0;
const int N = 30;

float sdRBox(vec2 p, vec2 b, float r) { vec2 d = abs(p) - b + r; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r; }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// 1 slack ... 0 taut
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
  // the phone leans into the pull: a little toward the top right, a little turned
  vec2 pc = pc0 + vec2(0.012, 0.016) * taut + vec2(0.0, 0.0025) * hum;
  float tilt = 0.10 * taut - 0.03 * hum;

  // the ground: dark jade, a cool lamp round the phone, a faint floor of haze
  vec3 col = mix(H(8, 34, 40), H(13, 56, 60), smoothstep(0.0, 1.0, q.y * 0.5 + 0.25));
  float rr = length((P - pc) * vec2(0.9, 1.25));
  col += H(36, 120, 112) * exp(-rr * rr * 2.2) * (0.28 + 0.35 * taut);
  col += H(120, 112, 230) * exp(-rr * rr * 14.0) * (0.15 + 0.35 * taut);

  // the threads
  float w = max(0.0016, 0.95 * pxs);
  vec3 thr = vec3(0.0);
  for (int i = 0; i < N; i++) {
    float fi = float(i);
    float h1 = hash11(fi * 1.91 + 3.0), h2 = hash11(fi * 4.37 + 9.0), h3 = hash11(fi * 7.13 + 1.0);
    // far end: on a circle round the phone, spread over the sides that are not the text's
    float ang = mix(-0.95, 2.25, (fi + h1 * 0.8) / float(N));
    vec2 dir = vec2(cos(ang), sin(ang));
    vec2 A = pc0 + dir * mix(1.5, 2.6, h2);
    // near end: a point on the phone's outline
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
    // a pulse of light runs down the thread as it tightens
    float pp = clamp((t - 3.0 - h3 * 0.5) / 1.1, 0.0, 1.0);
    float pulse = exp(-pow((s - pp) / 0.07, 2.0)) * step(3.0, t) * step(t, 5.3) * (1.0 - step(1.0, pp) * 0.0);
    thr += (core * bright + glow * bright * 0.6) * fade * H(188, 232, 222);
    thr += (core * 1.6 + glow * 2.2) * pulse * fade * depth * H(236, 244, 255);
  }
  col += thr * 0.9;

  // the phone: a dark body, a thin lit rim, a screen that takes the light as the threads tighten
  vec2 pp2 = rot(-tilt) * (P - pc);
  float body = sdRBox(pp2, vec2(0.056, 0.104), 0.016);
  float inBody = 1.0 - smoothstep(-pxs, pxs, body);
  float rim = (1.0 - smoothstep(0.0, 0.0035 + pxs, abs(body + 0.002)));
  float scr = 1.0 - smoothstep(-pxs, pxs, sdRBox(pp2, vec2(0.049, 0.096), 0.011));
  float sv = clamp((pp2.y + 0.096) / 0.192, 0.0, 1.0);
  float lum = 0.32 + 0.68 * taut + 0.08 * hum;
  vec3 screen = mix(H(150, 140, 240), H(226, 232, 255), pow(sv, 1.2)) * lum;
  // a notification card, a line of text, a button, all just light
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

  // a few specks of dust in the lamp, drifting up
  for (int k = 0; k < 7; k++) {
    float fk = float(k);
    vec2 sp = vec2(pc0.x + (hash11(fk * 3.3) - 0.5) * 1.0, mod(hash11(fk * 8.1) + uTime * (0.012 + 0.01 * hash11(fk)), 1.0));
    col += H(120, 200, 190) * exp(-dot(P - sp, P - sp) / 0.00006) * 0.16 * (0.5 + 0.5 * sin(uTime * 0.7 + fk));
  }

  // the picture falls into the page's own ground away from the phone
  float m = wide > 0.5 ? smoothstep(0.24, 0.60, q.x) : 1.0;
  m *= 0.25 + 0.75 * smoothstep(0.0, 0.08, q.y) * (1.0 - smoothstep(0.92, 1.0, q.y));
  col = mix(H(9, 38, 44), col, m);
  finish(col);
}
