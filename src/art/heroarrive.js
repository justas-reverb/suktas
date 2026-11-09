/**
 * The home hero's arrival, and the question's loop.
 *
 * The h1 is real text in the page. While it is "written", a canvas laid over its box fills the real glyphs
 * (fillText, the same font, size and position) through a round brush that follows a pen path for each letter
 * (stem before dot, bowl before caron). The brush paints a mask; the glyphs are kept only where the mask is
 * (destination-in), so the ink that appears is the true letter and the last frame is the real text.
 * Then the answer's box fades in and joins the question's, and the reel's box last. anime.js is the one clock.
 *
 * Rules: the script decides once. If it arrives later than LATE ms the CSS timer has (or is about to have)
 * revealed everything, and it leaves the page alone: nothing is ever hidden again. Any key, press or scroll
 * jumps to the end. Reduced motion and bfcache returns get the end state. Nothing is read back or stored.
 */
import { createTimeline, animate } from 'animejs';

const LATE = 1400;
const WRITE_MS = 2100;

// Pen paths per letter. u runs 0..1 across the letter's advance, v is height above the baseline in x-heights (cap 1.45, ascender 1.6).
// Each stroke is [width factor, points]; a stroke of two close points is a dot. The order is the order a hand takes.
const arc = (cx, cy, rx, ry, a0, a1, n = 14) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
const E_STROKE = [1, [[0.1, 0.5], [0.9, 0.52], [0.88, 0.75], [0.7, 0.95], [0.5, 1.0], [0.3, 0.95], [0.14, 0.72], [0.1, 0.5], [0.14, 0.25], [0.3, 0.05], [0.5, 0], [0.72, 0.05], [0.88, 0.2]]];
const GLYPH = {
  O: [[1, arc(0.5, 0.72, 0.43, 0.72, 90, 450, 26)]],
  j: [[1, [[0.62, 1.0], [0.62, 0.4], [0.62, -0.2], [0.5, -0.42], [0.25, -0.5], [0.1, -0.42], [0.04, -0.3]]], [1.15, [[0.62, 1.44], [0.63, 1.46]]]],
  e: [E_STROKE],
  i: [[1, [[0.5, 1.0], [0.5, 0.0]]], [1.15, [[0.5, 1.44], [0.51, 1.46]]]],
  c: [[1, [[0.86, 0.8], [0.7, 0.96], [0.5, 1.0], [0.28, 0.9], [0.14, 0.68], [0.12, 0.5], [0.16, 0.25], [0.32, 0.05], [0.52, 0], [0.74, 0.06], [0.88, 0.2]]]],
  a: [[1, [[0.16, 0.86], [0.4, 1.0], [0.62, 0.99], [0.8, 0.86]]], [1, [[0.78, 0.9], [0.78, 0.45], [0.78, 0.0]]], [1, [[0.76, 0.58], [0.5, 0.66], [0.26, 0.5], [0.22, 0.28], [0.4, 0.08], [0.62, 0.1], [0.78, 0.28]]]],
  p: [[1, [[0.3, 1.0], [0.3, 0.3], [0.3, -0.5]]], [1, [[0.3, 0.88], [0.55, 1.0], [0.78, 0.86], [0.88, 0.55], [0.8, 0.2], [0.55, 0.0], [0.3, 0.14]]]],
  g: [[1, [[0.8, 0.9], [0.55, 1.0], [0.28, 0.9], [0.15, 0.65], [0.28, 0.4], [0.55, 0.3], [0.8, 0.45]]], [1, [[0.8, 1.0], [0.8, 0.3], [0.8, -0.1], [0.65, -0.4], [0.4, -0.5], [0.2, -0.42], [0.1, -0.3], [0.08, -0.18]]]],
  u: [[1, [[0.15, 1.0], [0.15, 0.5], [0.22, 0.14], [0.45, 0.0], [0.66, 0.1], [0.8, 0.34]]], [1, [[0.82, 1.0], [0.82, 0.5], [0.82, 0.0]]]],
  l: [[1, [[0.5, 1.6], [0.5, 0.8], [0.5, 0.0]]]],
  '?': [[1, [[0.14, 1.2], [0.28, 1.46], [0.52, 1.55], [0.78, 1.38], [0.8, 1.12], [0.6, 0.9], [0.5, 0.72], [0.5, 0.5]]], [1.2, [[0.5, 0.05], [0.51, 0.07]]]],
};
// the marks above or beside a letter, written after it
const MARKS = {
  č: ['c', [[1, [[0.2, 1.74], [0.5, 1.46], [0.8, 1.74]]]]],
  ė: ['e', [[1.15, [[0.5, 1.4], [0.51, 1.42]]]]],
};

function strokesFor(ch) {
  const m = MARKS[ch];
  if (m) return [...GLYPH[m[0]], ...m[1]];
  return GLYPH[ch] || GLYPH[ch.toLowerCase()] || null;
}

// the pen's route for some letters: every stroke as pixel points, in reading order, each with its cost along the route
function route(letters, xh) {
  const strokes = [];
  for (const l of letters) {
    const defs = strokesFor(l.ch);
    if (!defs) continue;
    for (const [k, pts] of defs) strokes.push({ k, pts: pts.map(([u, v]) => [l.x + u * l.adv, l.base - v * xh]) });
  }
  let total = 0;
  for (const s of strokes) {
    s.len = 0;
    s.seg = [];
    for (let i = 1; i < s.pts.length; i++) { const d = Math.hypot(s.pts[i][0] - s.pts[i - 1][0], s.pts[i][1] - s.pts[i - 1][1]); s.seg.push(d); s.len += d; }
    s.start = total;
    // a stroke costs its length plus a small lift at the end, and a dot costs a touch
    s.cost = Math.max(s.len, xh * 0.25) + xh * 0.18;
    total += s.cost;
  }
  return { strokes, total };
}

// brush the part of a route between two distances onto a mask context
function stamp(mc, r, xh, from, to) {
  const rad = xh * 0.3;
  const step = rad * 0.4;
  mc.fillStyle = '#000';
  for (const s of r.strokes) {
    if (s.start + s.cost <= from || s.start > to) continue;
    const lo0 = Math.max(from - s.start, 0);
    const hi0 = Math.min(to - s.start, s.len);
    if (s.len < xh * 0.25) {
      const [x, y] = s.pts[0];
      mc.beginPath(); mc.arc(x, y, rad * s.k * 1.1, 0, 6.2832); mc.fill();
      continue;
    }
    let acc = 0;
    for (let i = 1; i < s.pts.length; i++) {
      const [ax, ay] = s.pts[i - 1];
      const [bx, by] = s.pts[i];
      const d = s.seg[i - 1];
      const lo = Math.max(lo0 - acc, 0);
      const hi = Math.min(hi0 - acc, d);
      if (hi > lo) {
        for (let t = lo; t <= hi + 0.001; t += step) {
          const k = d ? t / d : 0;
          mc.beginPath(); mc.arc(ax + (bx - ax) * k, ay + (by - ay) * k, rad * s.k, 0, 6.2832); mc.fill();
        }
      }
      acc += d;
    }
  }
}

export function arrive(root) {
  const q = root.querySelector('.hfx__q');
  const h1 = root.querySelector('h1');
  const ink = root.querySelector('.hfx__ink');
  const answer = root.querySelector('.hfx__a');
  const stage = root.querySelector('.hfx__stage');
  if (!q || !h1 || !ink || !answer || !stage) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ctx = ink.getContext('2d');

  const finish = () => {
    root.classList.add('hfx--joined', 'hfx--done');
    root.classList.remove('hfx--run');
    for (const el of [h1, answer, stage]) el.style.removeProperty('opacity');
    ctx && ctx.clearRect(0, 0, ink.width, ink.height);
  };
  window.addEventListener('pageshow', (e) => { if (e.persisted) { stopLoop(); finish(); startLoopIfWanted(); } });

  let skipped = false;
  let tl = null;
  let loop = null;
  let loopTimer = 0;
  let onScreen = false;
  let visible = !document.hidden;
  let layout = null;

  // ---- geometry: one record per word, one per letter, in the ink canvas's own pixels ----
  function measure() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = q.getBoundingClientRect();
    ink.width = Math.round(box.width * dpr);
    ink.height = Math.round(box.height * dpr);
    const cs = getComputedStyle(h1);
    const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = font;
    ctx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    ctx.textBaseline = 'alphabetic';
    const xh = ctx.measureText('x').actualBoundingBoxAscent || parseFloat(cs.fontSize) * 0.5;
    const words = [];
    const tn = [...h1.childNodes].find((n) => n.nodeType === 3);
    if (!tn) return null;
    const text = tn.data;
    const re = /[^\s ]+/g;
    let m;
    const range = document.createRange();
    while ((m = re.exec(text))) {
      range.setStart(tn, m.index);
      range.setEnd(tn, m.index + m[0].length);
      const r = range.getBoundingClientRect();
      const x = r.left - box.left;
      const base = r.top - box.top + ctx.measureText(m[0]).fontBoundingBoxAscent;
      const letters = [];
      for (let i = 0; i < m[0].length; i++) {
        const x0 = ctx.measureText(m[0].slice(0, i)).width;
        const adv = ctx.measureText(m[0].slice(0, i + 1)).width - x0;
        letters.push({ ch: m[0][i], x: x + x0, adv, base });
      }
      words.push({ word: m[0], x, base, letters });
    }
    const { strokes, total } = route(words.flatMap((w) => w.letters), xh);
    layout = { words, strokes, total, xh, font, color: cs.color, spacing: ctx.letterSpacing, dpr, w: box.width, h: box.height };
    return layout;
  }

  const mask = document.createElement('canvas');
  let mctx = null;
  let stamped = 0;
  const drawGlyphs = (fill) => {
    ctx.font = layout.font;
    ctx.letterSpacing = layout.spacing;
    ctx.fillStyle = fill;
    for (const w of layout.words) ctx.fillText(w.word, w.x, w.base);
  };
  const compose = (extra = 0) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ink.width, ink.height);
    ctx.setTransform(layout.dpr, 0, 0, layout.dpr, 0, 0);
    drawGlyphs(layout.color);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    if (extra > 0) {
      // the closing fill: whatever the brush left (a serif, a hairline) comes up with the clock, not with the frame count
      ctx.setTransform(layout.dpr, 0, 0, layout.dpr, 0, 0);
      ctx.globalAlpha = extra;
      drawGlyphs(layout.color);
      ctx.globalAlpha = 1;
    }
  };
  function stampTo(dist) {
    stamp(mctx, layout, layout.xh, stamped, dist);
    stamped = dist;
  }

  // ---- the question's loop: the doubt comes back. The pen rewrites the question mark in mint, through the same
  // glyph mask, holds, and lifts; then the page rests (a timer, no frames) ----
  const lmask = document.createElement('canvas');
  let lrun = null;
  function paintMark(t) {
    const p = Math.min(1, t / 0.42);
    const e = p * p * (3 - 2 * p);
    const alpha = t < 0.72 ? 1 : Math.max(0, 1 - (t - 0.72) / 0.28);
    const lc = lmask.getContext('2d');
    lc.setTransform(1, 0, 0, 1, 0, 0);
    lc.clearRect(0, 0, lmask.width, lmask.height);
    lc.setTransform(layout.dpr, 0, 0, layout.dpr, 0, 0);
    stamp(lc, lrun.r, layout.xh, 0, e * lrun.r.total);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ink.width, ink.height);
    ctx.setTransform(layout.dpr, 0, 0, layout.dpr, 0, 0);
    ctx.font = layout.font;
    ctx.letterSpacing = layout.spacing;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = getComputedStyle(root).getPropertyValue('--mint-lt').trim() || '#6fe3b8';
    ctx.fillText(lrun.l.ch, lrun.l.x, lrun.l.base);
    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(lmask, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
  }
  function runSweep() {
    loopTimer = 0;
    if (!loop || !onScreen || !visible) return;
    const w = layout.words[layout.words.length - 1];
    const l = w.letters[w.letters.length - 1];
    lmask.width = ink.width; lmask.height = ink.height;
    lrun = { l, r: route([l], layout.xh) };
    const t = { v: 0 };
    loop = animate(t, {
      v: 1, duration: 3000, ease: 'linear', onUpdate: () => paintMark(t.v),
      onComplete: () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, ink.width, ink.height); loopTimer = setTimeout(runSweep, 5000); },
    });
  }
  function stopLoop() {
    clearTimeout(loopTimer);
    loopTimer = 0;
    if (loop && loop.pause) loop.pause();
    if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, ink.width, ink.height); }
  }
  function startLoopIfWanted() {
    if (reduced.matches || !root.classList.contains('hfx--done') || !onScreen || !visible) return;
    if (!measure()) return;
    if (loopTimer) return;
    loop = loop || {};
    loopTimer = setTimeout(runSweep, 900);
  }
  new IntersectionObserver((e) => {
    onScreen = e[e.length - 1].isIntersecting;
    if (onScreen) startLoopIfWanted(); else stopLoop();
  }).observe(q);
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible) startLoopIfWanted(); else stopLoop(); });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => { if (root.classList.contains('hfx--done') && ink.width !== Math.round(q.getBoundingClientRect().width * layout?.dpr)) { stopLoop(); startLoopIfWanted(); } }).observe(q);

  // ---- the decision, made once ----
  // the page is sent no-referrer, so the Navigation API says whether the previous entry was ours (null elsewhere); without it the arrival plays
  const own = !!(window.navigation && navigation.activation && navigation.activation.from);
  if (reduced.matches || own || performance.now() > LATE || !ctx || typeof ctx.letterSpacing !== 'string') { finish(); return; }

  const go = () => {
    if (!measure() || !layout.strokes.length) { finish(); return; }
    mask.width = ink.width; mask.height = ink.height;
    mctx = mask.getContext('2d');
    mctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.setTransform(layout.dpr, 0, 0, layout.dpr, 0, 0);
    root.classList.add('hfx--run');
    const pen = { p: 0, fill: 0 };
    const end = () => {
      if (skipped) return;
      skipped = true;
      for (const t of ['keydown', 'pointerdown', 'wheel', 'touchstart']) removeEventListener(t, skip, true);
      removeEventListener('scroll', skip, true);
      if (tl) tl.pause();
      finish();
      startLoopIfWanted();
    };
    const skip = () => end();
    for (const t of ['keydown', 'pointerdown', 'wheel', 'touchstart']) addEventListener(t, skip, { capture: true, passive: true });
    addEventListener('scroll', skip, { capture: true, passive: true, once: true });

    tl = createTimeline({ defaults: { ease: 'outSine' }, onComplete: end });
    // 1. the hand writes the question
    tl.add(pen, {
      p: 1, duration: WRITE_MS, ease: 'inOutSine',
      onUpdate: () => { stampTo(pen.p * layout.total); compose(); },
    }, 250);
    // the last frame is the real text: the closing fill rises over 200 ms by the clock
    tl.add(pen, {
      fill: 1, duration: 200, ease: 'linear',
      onUpdate: () => compose(pen.fill),
      onComplete: () => { h1.style.opacity = '1'; ctx.clearRect(0, 0, ink.width, ink.height); },
    }, 250 + WRITE_MS);
    // 2. the answer joins the question: the seam closes, the answer's box and its words fade in together
    tl.call(() => root.classList.add('hfx--joined'), 250 + WRITE_MS + 120);
    tl.add(answer, { opacity: [0, 1], duration: 480 }, 250 + WRITE_MS + 160);
    // 3. the rest: the reel's box with the snake
    tl.add(stage, { opacity: [0, 1], duration: 520 }, 250 + WRITE_MS + 560);
  };
  // the fonts must be in, or the glyphs measured and drawn are the fallback's
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => {
    if (performance.now() > LATE) { finish(); return; }
    go();
  });
}
