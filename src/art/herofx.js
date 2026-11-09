/**
 * The hero and band directions (a, b, c, t, k): one fragment shader each (src/art/hero/), one runner.
 *
 * Contract: the still is an <img>, this only lays a canvas over
 * it, painted by the same shader at the still's own instant, so the first frame is the still. Every
 * reason NOT to draw is honoured: reduced motion, the data-saver switch, no WebGL2 or only the CPU's
 * (failIfMajorPerformanceCaveat), a refused shader, a lost context, the hero off screen or the tab
 * hidden, and frames that arrive late (the canvas shrinks, then the art gives up and the still stays).
 * Nothing is read back, stored or fetched. The buffer has the picture's own shape (2.4:1 wide, 3:2
 * upright) and the canvas is shown with object-fit: cover, like the still.
 */
import { VERT, HERO_A, HERO_B, HERO_C, HERO_T, HERO_K } from './shaders.gen.js';
import { textLines } from './quiet.js';
import { FAMILIES, palette, restCells, cellCount, dFor, bandClass, MAIN_CELLS, SUB_CELLS } from './bands.js';

/**
 * One engine, a few configurations. A direction with a `clock` is driven by anime.js (herodial.js exports the
 * clock by that name) and draws only when the clock changes; `names` are the uniforms the clock's state feeds and
 * `apply` writes them. `quiet` is the selector of the page's text, whose boxes no moving dot may sit under;
 * `pic` the picture's shape (wide, tall: width / height); `anchor` where the CSS crop (object-position) holds it.
 */
export const DIRS = {
  a: { src: HERO_A, still: 7.0, pic: { wide: 2.4, tall: 1.5 } },
  b: {
    src: HERO_B, still: 7.4, pic: { wide: 2.4, tall: 1.5 }, anchor: { x: 0.7, y: 0.5 }, margin: 80,
    clock: 'createDial', quiet: '.hfx__card, .hfx__stage',
    names: ['uProg[0]', 'uSeed[0]', 'uBlink'],
    apply(gl, u, s) { gl.uniform1fv(u['uProg[0]'], s.prog); gl.uniform1fv(u['uSeed[0]'], s.seed); gl.uniform1f(u.uBlink, s.blink); },
  },
  c: { src: HERO_C, still: 6.6, pic: { wide: 2.4, tall: 1.5 } },
  t: {
    src: HERO_T, still: 0, pic: { wide: 2.4, tall: 2.2 }, anchor: { x: 1, y: 0 }, margin: 260,
    clock: 'createSteps', quiet: '.think__intro > *, .beats, .think__more',
    names: ['uPos', 'uFocus', 'uFade'],
    apply(gl, u, s) {
      gl.uniform1f(u.uPos, s.pos); gl.uniform1f(u.uFocus, s.focus); gl.uniform1f(u.uFade, s.fade);
    },
  },
  // the other pages' bands: every scam family in its own colours (bands.js), the page's text keeps its own quiet boxes
  k: {
    src: HERO_K, still: 0, pic: { wide: 3, tall: 3 }, anchor: { x: 1, y: 0.5 }, margin: 260,
    lines: true, clock: 'createBand', scope: '.scn-head, .shead, .stage, .key', quiet: '.scn-head__body > *, .shead__body > *, .stage__in > *, .key__in > *',
    names: ['uG[0]', 'uR[0]', 'uP[0]', 'uN', 'uD', 'uSeed', 'uGround', 'uPool', 'uInk', 'uLamp'],
    init(gl, u, o) {
      const p = palette(o.family, o.mood);
      gl.uniform3fv(u.uGround, p.ground); gl.uniform3fv(u.uPool, p.pool); gl.uniform3fv(u.uInk, p.ink); gl.uniform3fv(u.uLamp, p.lamp);
      gl.uniform4fv(u.uN, cellCount(o.family));
      gl.uniform1f(u.uD, o.d || 0.05);
      gl.uniform1f(u.uSeed, o.seed || 0);
      gl.uniform1fv(u['uG[0]'], restCells(o.family)); gl.uniform1fv(u['uR[0]'], new Float32Array(MAIN_CELLS + SUB_CELLS));
    },
    apply(gl, u, s) { gl.uniform1fv(u['uG[0]'], s.g); gl.uniform1fv(u['uR[0]'], s.r); gl.uniform1fv(u['uP[0]'], s.p); },
  },
};

const DPR_CAP = 1.5;
const MAX_PIXELS = 4.2e6;
const FRAME_MS = 33;
const QUALITY = [1, 0.7, 0.5];

/** Returns null where WebGL2 is missing or only the CPU's software renderer (the still stays). */
export function createHeroFx(canvas, dir, { pending = false, strict = true, family = 'plain', mood = 'day', cls = 'm' } = {}) {
  const gl = canvas.getContext('webgl2', {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'default',
    failIfMajorPerformanceCaveat: strict,
  });
  if (!gl) return null;
  const parallel = pending ? gl.getExtension('KHR_parallel_shader_compile') : null;
  const prog = gl.createProgram();
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); gl.attachShader(prog, s); return s; };
  const vs = sh(gl.VERTEX_SHADER, VERT);
  const fs = sh(gl.FRAGMENT_SHADER, DIRS[dir].src);
  gl.linkProgram(prog);
  const u = {};
  let vao = null;
  let usable = false;

  const eng = {
    gl,
    get usable() { return usable; },
    lost: () => gl.isContextLost(),
    ready: () => !parallel || gl.isContextLost() || !!gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR),
    finish() {
      if (usable) return;
      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS) || !gl.getShaderParameter(fs, gl.COMPILE_STATUS)) throw new Error('shader: ' + (gl.getShaderInfoLog(fs) || gl.getShaderInfoLog(vs)));
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      for (const n of ['uRes', 'uTime', 'uPic', 'uQuiet[0]', ...(DIRS[dir].names || [])]) u[n] = gl.getUniformLocation(prog, n);
      if (DIRS[dir].init) DIRS[dir].init(gl, u, { family, mood, seed: FAMILIES[family] && FAMILIES[family].seed, d: dFor(family, cls) });
      usable = true;
    },
    /** the clock's state, and the rectangles (picture units) no digit may move under */
    set(s) { DIRS[dir].apply(gl, u, s); },
    setD(v) { if (u.uD) gl.uniform1f(u.uD, v); },
    quiet(a) { gl.uniform4fv(u['uQuiet[0]'], a); },
    resize(w, h, pic) {
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.uRes, w, h);
      gl.uniform1f(u.uPic, pic);
    },
    draw(t) {
      gl.uniform1f(u.uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
  if (!parallel) eng.finish();
  return eng;
}

export function startHeroFx(root) {
  const canvas = root && root.querySelector('canvas');
  if (!canvas) return;
  const dir = root.dataset.herofx;
  if (!DIRS[dir]) return;
  const cfg = DIRS[dir];
  const still = cfg.still;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const tall = matchMedia("(max-width: 59.99rem)");
  const frugal = () => !!(navigator.connection && navigator.connection.saveData);

  let eng = null;
  let rung = 0;
  let raf = 0;
  let onScreen = false;
  let visible = !document.hidden;
  let dead = false;
  let elapsed = 0;
  let last = 0;
  let slowSum = 0;
  let slowN = 0;
  let shown = false;
  const quiet = new Float32Array(64);
  let dial = null;
  // the shared clock may tick while the art is hidden (tab, data saver, off screen): draw only when it is shown; resume() catches up
  const onDial = (s) => { if (wants()) { eng.set(s); eng.draw(still); } };

  const wants =() => !dead && !reduced.matches && !frugal() && onScreen && visible && eng && eng.usable && !eng.lost();

  function size() {
    const r = canvas.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const pic = tall.matches ? cfg.pic.tall : cfg.pic.wide;
    let w = r.width;
    let h = r.width / pic;
    if (h < r.height) { h = r.height; w = h * pic; }
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP) * QUALITY[rung];
    let bw = Math.round(w * dpr);
    let bh = Math.round(h * dpr);
    const px = bw * bh;
    if (px > MAX_PIXELS) { const k = Math.sqrt(MAX_PIXELS / px); bw = Math.round(bw * k); bh = Math.round(bh * k); }
    if (root.dataset.band) eng.setD(dFor(root.dataset.band, bandClass()));
    eng.resize(bw, bh, pic);
    if (dial) {
      // where the text and the reel sit, in the picture's own units (x across in picture heights, y up from the foot)
      const ph = Math.max(r.height, r.width / pic);
      const ox = r.left + (r.width - ph * pic) * cfg.anchor.x;
      const oy = r.top + (r.height - ph) * cfg.anchor.y;
      quiet.fill(0);
      let n = 0;
      const scope = cfg.scope && root.closest(cfg.scope) || root;
      const boxes = cfg.lines
        ? textLines(scope, cfg.quiet, 16)
        : [...scope.querySelectorAll(cfg.quiet)].map((el) => { const b = el.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom }; });
      for (const b of boxes) {
        if (b.r - b.l < 2 || n > (cfg.lines ? 15 : 5) || b.b < r.top || b.t > r.bottom || b.r < r.left || b.l > r.right) continue;
        quiet.set([(b.l - ox) / ph - 0.03, 1 - (b.b - oy) / ph - 0.03, (b.r - ox) / ph + 0.03, 1 - (b.t - oy) / ph + 0.03], n++ * 4);
      }
      eng.quiet(quiet);
    }
    if (dial) { if (!dead) { eng.set(dial.state); eng.draw(still); } } else if (!raf && !dead) eng.draw(still + elapsed / 1000);
  }

  function giveUp() {
    dead = true;
    cancelAnimationFrame(raf);
    raf = 0;
    if (dial) dial.stop();
    root.classList.remove('is-live');
  }

  function frame(now) {
    raf = 0;
    if (!wants()) return;
    raf = requestAnimationFrame(frame);
    if (now - last < FRAME_MS - 2) return;
    if (last) {
      slowSum += now - last;
      if (++slowN === 24) {
        const avg = slowSum / slowN;
        slowSum = 0;
        slowN = 0;
        if (avg > 52) {
          if (rung < QUALITY.length - 1) { rung++; size(); } else { giveUp(); return; }
        }
      }
    }
    if (last) elapsed += Math.min(now - last, 100);
    last = now;
    eng.draw(still + elapsed / 1000);
    if (!shown) { shown = true; root.classList.add('is-live'); }
  }

  function update() {
    if (dial) {
      if (wants()) { if (!shown) { shown = true; root.classList.add('is-live'); dial.start(); } else dial.resume(); } else dial.stop();
      return;
    }
    if (wants()) {
      if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function boot() {
    if (reduced.matches || frugal()) return;
    let e = null;
    try { e = createHeroFx(canvas, dir, { pending: true, family: root.dataset.band, mood: root.dataset.mood, cls: bandClass() }); } catch (err) { e = null; }
    if (!e) return;
    eng = e;
    canvas.addEventListener('webglcontextlost', (ev) => { ev.preventDefault(); giveUp(); });
    const poll = () => {
      if (dead || e.lost()) return;
      if (!e.ready()) { setTimeout(poll, 40); return; }
      try { e.finish(); } catch (err) { giveUp(); return; }
      size();
      shown = false;
      update();
    };
    // the clock is its own chunk (anime.js), fetched only where the art moves
    if (cfg.clock) import('./herodial.js').then((m) => { dial = m[cfg.clock](onDial, root.dataset.band); poll(); }, giveUp);
    else poll();
  }

  // the engine is built when the art first comes near the screen, not at load (the home page's band is far below the fold)
  let booted = false;
  new IntersectionObserver((entries) => {
    onScreen = entries[entries.length - 1].isIntersecting;
    if (onScreen && !booted) {
      booted = true;
      if ('requestIdleCallback' in window) requestIdleCallback(boot, { timeout: 1500 });
      else setTimeout(boot, 400);
    }
    update();
  }, { rootMargin: `${cfg.margin || 80}px` }).observe(root);
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; update(); });
  reduced.addEventListener('change', () => { if (reduced.matches) { cancelAnimationFrame(raf); raf = 0; if (dial) dial.stop(); root.classList.remove('is-live'); } else if (!eng) boot(); else update(); });
  tall.addEventListener('change', () => { if (eng && eng.usable) size(); });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => { if (eng && eng.usable) size(); }).observe(root);
}
