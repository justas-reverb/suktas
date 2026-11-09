/**
 * The logo's snake beside the reel, alive. The picture is the settled logo (public/brand/snake-stage.webp, cut from
 * design/logo-round-3/master-stage.png); this only draws it in horizontal strips, each shifted sideways by a wave that
 * runs down the body, so it seems to slither in place. A pass lasts PASS ms and the snake rests REST ms between passes
 * (a timer, no frames at rest). It draws only while on screen and the tab is shown; reduced motion keeps the still.
 */
import { animate } from 'animejs';

const PASS = 2800;
const REST = 6200;
const STRIPS = 56;

export function startSnake(box) {
  const img = box.querySelector('img');
  const cv = box.querySelector('canvas');
  if (!img || !cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const st = { k: 0 };
  let timer = 0;
  let anim = null;
  let onScreen = false;
  let visible = !document.hidden;
  let w = 0;
  let h = 0;

  function size() {
    const r = box.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(2, Math.round(r.width * dpr));
    h = Math.max(2, Math.round(r.height * dpr));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  }
  // k: 0..1 along a pass; the amplitude swells and fades, the wave travels from the head down to the tail
  function paint(k, still) {
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingQuality = 'high';
    const amp = still ? 0 : Math.sin(Math.PI * k) ** 1.5 * w * 0.035;
    const sh = img.naturalHeight / STRIPS;
    const dh = h / STRIPS;
    for (let i = 0; i < STRIPS; i++) {
      const y = i / STRIPS;
      const dx = amp * Math.sin(2 * Math.PI * (y * 1.3 - k * 1.5)) * (0.35 + 0.65 * y);
      ctx.drawImage(img, 0, i * sh, img.naturalWidth, sh + 0.6, dx, i * dh, w, dh + 0.6);
    }
  }
  function pass() {
    timer = 0;
    if (!onScreen || !visible) return;
    st.k = 0;
    anim = animate(st, {
      k: 1, duration: PASS, ease: 'linear', onUpdate: () => paint(st.k, false),
      onComplete: () => { paint(0, true); timer = setTimeout(pass, REST); },
    });
  }
  function stop() { clearTimeout(timer); timer = 0; if (anim) anim.pause(); }
  function update() { stop(); if (onScreen && visible) timer = setTimeout(pass, 700); }

  const ready = () => {
    size();
    paint(0, true);
    box.classList.add('is-live');
    new IntersectionObserver((e) => { onScreen = e[e.length - 1].isIntersecting; update(); }).observe(box);
    document.addEventListener('visibilitychange', () => { visible = !document.hidden; update(); });
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => { size(); paint(0, true); }).observe(box);
  };
  if (img.complete && img.naturalWidth) ready(); else img.addEventListener('load', ready, { once: true });
}
