/**
 * The live hero: a layer of moving light over the painted still.
 *
 * The still (an <img> in the hero) is the picture. This script only adds a canvas over it,
 * painted by the same shader, so at the first frame the two are the same image and the fade-in
 * is invisible. Everything below is a reason NOT to draw:
 *
 *   - prefers-reduced-motion, or the browser's data-saver switch: the still stays;
 *   - no WebGL2 (LibreWolf, Tor Browser on Safest), a failed shader, or a WebGL that is only the
 *     CPU's software renderer (engine.js asks for failIfMajorPerformanceCaveat): the still stays;
 *   - the hero scrolled out of view, or the tab hidden: the loop stops;
 *   - frames arriving slowly: resolution drops, then a lite shader, then the still. And any of
 *     the first three frames taking a quarter of a second or more gives up at once, for a slow
 *     renderer that the flag above does not catch (on the RTX 5080 they take 7 ms).
 *
 * It starts after the page has loaded and the browser is idle, and the driver compiles the
 * shader off the page's thread where it can (KHR_parallel_shader_compile), so the art never
 * holds up the page while it settles.
 *
 * It reads no pixels (the pointer is mapped to the ground by arithmetic, not by looking at
 * the picture), stores nothing and fetches nothing.
 */
import { createEngine } from './engine.js';
import { scene, SHOTS } from './presets.js';

const DPR_CAP = 1.5;                 // a phone at 3x gets 1.5x: the art is soft light, not text
const MAX_PIXELS = 8.4e6;            // 3840 x 2160, what a 2560 x 1440 window at 1.5x asks for
const AMBIENT_MS = 30;               // glints and haze move at about 30 frames a second
const ACTIVE_MS = 14;                // while a hand is brushing the snow, at the display rate
const WIPE_LIFE = 2.8;               // seconds a brushed patch takes to refill
const WIPE_PX = 84;                  // brush radius on screen, in CSS pixels
const POS_X = 0.62;                  // object-position of the canvas and the still (site.css)
const POS_Y = 0.0;
const EARLY_FRAMES = 3;              // the first three frames are each judged on their own ...
const SLOW_EARLY_MS = 250;           // ... and one that takes longer than this ends the art at once
const LADDER = [
  { q: 1.0, lite: false },
  { q: 0.75, lite: false },
  { q: 0.55, lite: false },
  { q: 0.55, lite: true },
];

export function startHero(root) {
  const canvas = root && root.querySelector('canvas');
  if (!canvas) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const tall = matchMedia('(max-aspect-ratio: 1/1)');
  const frugal = () => !!(navigator.connection && navigator.connection.saveData);

  let eng = null;
  let sc = null;
  let shot = 'wide';
  let rung = 0;
  let raf = 0;
  let onScreen = true;
  let visible = !document.hidden;
  let started = false;
  let t0 = 0;
  let last = 0;
  let prevRaf = 0;
  let rafSum = 0;
  let rafN = 0;
  let winStart = 0;
  let early = 0;
  let live = false;
  let dispW = 1;
  let dispH = 1;
  let offX = 0;
  let offY = 0;
  let building = 0;
  let dead = false;
  let swapping = false;
  const wipes = [];

  const allowed = () => !reduced.matches && !frugal() && !dead;
  const wants = () => allowed() && !swapping && onScreen && visible && eng && eng.usable && !eng.lost();

  // Hands the shader to the driver and returns at once; when the driver has finished, the engine
  // is set up and the loop may start. Returns false if there is no WebGL2 or the shader is refused.
  function build() {
    let e = null;
    try {
      e = createEngine(canvas, { lite: LADDER[rung].lite, pending: true });
    } catch (err) {
      e = null;
    }
    if (!e) return false;
    eng = e;
    swapping = false;
    early = 0;
    const token = ++building;
    const poll = () => {
      if (token !== building || eng !== e || e.lost()) return;
      if (!e.ready()) {
        setTimeout(poll, 40);
        return;
      }
      try {
        e.finish();
      } catch (err) {
        giveUp();
        return;
      }
      shot = tall.matches ? 'tall' : 'wide';
      sc = scene('morning', shot, { fade: 1 });
      e.setScene(sc);
      layout();
      update();
    };
    poll();
    return true;
  }

  // The canvas is shown with object-fit: cover, like the still. Work out how big the picture is
  // on screen and where it sits, so a pointer position can be turned into a spot on the snow.
  function layout() {
    const r = canvas.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const A = SHOTS[shot].aspect;
    dispW = Math.max(r.width, r.height * A);
    dispH = dispW / A;
    offX = (r.width - dispW) * POS_X;
    offY = (r.height - dispH) * POS_Y;
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP) * LADDER[rung].q;
    let w = Math.round(dispW * dpr);
    let h = Math.round(dispH * dpr);
    if (w * h > MAX_PIXELS) {
      const k = Math.sqrt(MAX_PIXELS / (w * h));
      w = Math.round(w * k);
      h = Math.round(h * k);
    }
    eng.resize(w, h);
  }

  // Same arithmetic as rayDir() in the shader, then the ray's meeting with the ground.
  function groundAt(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    const u = (clientX - r.left - offX) / dispW;
    const v = 1 - (clientY - r.top - offY) / dispH;
    if (u < 0 || u > 1 || v < 0 || v > 1) return null;
    const [tY, hz, yaw, eye] = sc.cam;
    const px = (u * 2 - 1) * SHOTS[shot].aspect;
    const py = v * 2 - 1;
    const dx = px * tY;
    const dy = (py - hz) * tY;
    if (dy > -1e-3) return null;
    const c = Math.cos(yaw);
    const s = Math.sin(yaw);
    const k = eye / -dy;
    const gx = (c * dx + s) * k;
    const gz = (-s * dx + c) * k;
    const dist = Math.hypot(gx, eye, gz);
    return { x: gx, z: gz, r: Math.min(8, Math.max(0.22, WIPE_PX * dist * ((2 * tY) / dispH))) };
  }

  function frame(now) {
    raf = 0;
    if (!wants()) return;
    raf = requestAnimationFrame(frame);

    if (prevRaf) {
      const d = now - prevRaf;
      if (d < 1500) { rafSum += d; rafN++; }
      // A renderer that is far too slow shows itself in the first frames: do not wait for the
      // average. Not while the tab has been out of sight, whose long gaps say nothing about speed.
      if (early < EARLY_FRAMES) {
        early++;
        if (d > SLOW_EARLY_MS) { giveUp(); return; }
      }
    }
    prevRaf = now;
    if (!winStart) winStart = now;
    if ((rafN >= 45 || (rafN >= 6 && now - winStart > 3000)) && judge()) return;

    const brushing = wipes.length > 0;
    if (now - last < (brushing ? ACTIVE_MS : AMBIENT_MS)) return;
    last = now;
    if (!t0) t0 = now;

    const t = (now - t0) / 1000;
    const list = [];
    for (let i = wipes.length - 1; i >= 0 && list.length < 12; i--) {
      const w = wipes[i];
      const age = t - w.t;
      if (age > WIPE_LIFE) { wipes.splice(0, i + 1); break; }
      const f = Math.min(1, (1 - age / WIPE_LIFE) * 1.7);
      list.push([w.x, w.z, f * f * (3 - 2 * f), w.r]);
    }
    eng.draw(t, list);
    if (!live) {
      live = true;
      root.classList.add('is-live');
    }
  }

  // If frames arrive well under the display's rate, do less: a smaller canvas, then the lite
  // shader, and at the end of the ladder only the still. Nothing is remembered between visits.
  // Swapping to the lite shader changes the picture (no clouds, rays or cast shadows), so the
  // canvas fades out first and the lite one fades in over the still. Returns true when it
  // stopped the loop.
  function judge() {
    const avg = rafSum / rafN;
    rafSum = 0;
    rafN = 0;
    winStart = 0;
    if (avg <= 24) return false;
    if (rung >= LADDER.length - 1) { giveUp(); return true; }
    rung++;
    if (LADDER[rung].lite === LADDER[rung - 1].lite) { layout(); return false; }
    stop();
    swapping = true;
    live = false;
    root.classList.remove('is-live');
    setTimeout(() => {
      if (eng) eng.dispose();
      if (!build()) giveUp();
    }, 800);
    return true;
  }

  function giveUp() {
    dead = true;
    stop();
    live = false;
    root.classList.remove('is-live');
    building++;
    if (eng) eng.dispose();
    eng = null;
    canvas.width = 1;
    canvas.height = 1;
  }

  function update() {
    if (wants()) {
      if (!raf) { prevRaf = 0; rafSum = 0; rafN = 0; winStart = 0; raf = requestAnimationFrame(frame); }
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function begin() {
    if (started || !allowed()) return;
    if (!build()) return;
    started = true;
    new ResizeObserver(() => { if (eng && eng.usable) layout(); }).observe(canvas);
    new IntersectionObserver((es) => { onScreen = es[es.length - 1].isIntersecting; update(); }).observe(root);
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      if (!visible) early = EARLY_FRAMES;
      update();
    });
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop(); live = false; root.classList.remove('is-live'); });
    canvas.addEventListener('webglcontextrestored', () => { if (allowed()) build(); });
    tall.addEventListener('change', () => {
      if (eng && eng.usable) { shot = tall.matches ? 'tall' : 'wide'; sc = scene('morning', shot, { fade: 1 }); eng.setScene(sc); layout(); }
    });

    let lastX = -999;
    let lastY = -999;
    root.addEventListener('pointermove', (e) => {
      if (!eng || !eng.usable) return;
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 10) return;
      lastX = e.clientX;
      lastY = e.clientY;
      const g = groundAt(e.clientX, e.clientY);
      if (!g) return;
      wipes.push({ x: g.x, z: g.z, r: g.r, t: t0 ? (performance.now() - t0) / 1000 : 0 });
      if (wipes.length > 48) wipes.splice(0, wipes.length - 48);
      if (wipes.length > 3) root.classList.add('has-wiped');
    }, { passive: true });

    update();
  }

  reduced.addEventListener('change', () => {
    if (!allowed()) { stop(); live = false; root.classList.remove('is-live'); } else if (!started) begin(); else update();
  });

  // After the page has loaded, when the browser has nothing better to do (and at the latest 1.5 s
  // later). The still is the hero until then.
  const later = () => {
    if ('requestIdleCallback' in window) requestIdleCallback(begin, { timeout: 1500 });
    else setTimeout(begin, 300);
  };
  if (document.readyState === 'complete') later();
  else addEventListener('load', later, { once: true });
}
