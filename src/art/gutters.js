/**
 * The home page's side padding that moves, as two designs behind one URL.
 *
 * Desktop (wide, a mouse, motion allowed): each `.band` is a panel inset from the window's edges. The panel's ground is
 * clipped by `clip-path: inset(0 var(--cut) round r)`; its text sits in a column with its own static gutter, so the words
 * never move sideways. Motion's `scroll()` owns --cut: the panel arrives wide (cut 0), settles into its inset as it
 * rises, and holds it, never past the cap, until it has gone. anime.js owns something else: once, as a band
 * reaches its hold, its blocks settle upward into place (opacity and translateY, never sideways). No `onScroll`.
 * Both are driven by scroll; after the scroll stops, nothing runs.
 *
 * Phone (narrow, a finger, or reduced motion on desktop): the padding does not move (a phone's gutters are 16 px).
 * Bands are full-bleed and each block settles once, 12 px up and in over 220 ms, when it comes into view (Motion's inView).
 * Reduced motion: no arming at all; the page is the resting page.
 */
import { scroll, inView, animate as mAnimate } from 'motion';
import { animate as aAnimate, stagger } from 'animejs';

const wide = matchMedia('(min-width: 60rem) and (hover: hover)');
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const ease = (t) => t * t * (3 - 2 * t);
const clamp01 = (x) => Math.min(1, Math.max(0, x));

// what settles in place: only blocks still well under the fold when the page arms (a block on screen is never hidden)
const SETTLE = '.think__intro, .beats li, .think__more, .habit, .mins, .family, .promise__in';
function armBelowFold(sel) {
  const vh = innerHeight;
  const out = [];
  for (const el of document.querySelectorAll(sel)) {
    if (el.getBoundingClientRect().top > vh + 160) { el.classList.add('is-armed'); out.push(el); }
  }
  return out;
}
function disarm(el) { el.classList.remove('is-armed'); el.style.removeProperty('opacity'); el.style.removeProperty('transform'); }

function desktop() {
  const stops = [];
  const rm = [];
  for (const band of document.querySelectorAll('.band')) {
    const hero = band.classList.contains('hfx');
    const G = () => Math.min(72, Math.max(12, innerWidth * 0.036));
    let last = -1;
    const set = () => {
      const vh = innerHeight;
      // the hero is already on screen when the page arrives: it starts flush and takes its inset over the first third of a screen of scrolling
      const a = hero ? clamp01(scrollY / (0.33 * vh)) : clamp01((vh - band.getBoundingClientRect().top) / (0.5 * vh));
      // on the device-pixel grid, or the clip's edge shimmers between two pixels as it moves
      const cut = Math.round(G() * ease(a) * devicePixelRatio) / devicePixelRatio;
      if (cut === last) return;
      last = cut;
      band.style.setProperty('--cut', cut + 'px');
    };
    set();
    stops.push(scroll(set, { target: band, offset: ['start end', 'end start'] }));
    rm.push(() => band.style.removeProperty('--cut'));
  }
  // anime.js: a band's blocks settle up into place once, as the band reaches its hold
  const blocks = armBelowFold('.think__intro, .beats li, .think__more');
  const think = document.querySelector('.think');
  let io = null;
  if (think && blocks.length) {
    io = new IntersectionObserver((e) => {
      if (!e.some((x) => x.isIntersecting)) return;
      io.disconnect();
      aAnimate(blocks, {
        opacity: [0, 1], translateY: [18, 0], delay: stagger(70), duration: 520, ease: 'outQuad',
        onComplete: () => blocks.forEach(disarm),
      });
    }, { threshold: 0.12 });
    io.observe(think);
  }
  return () => {
    stops.forEach((s) => s && s());
    rm.forEach((f) => f());
    if (io) io.disconnect();
    blocks.forEach(disarm);
  };
}

function phone() {
  const blocks = armBelowFold(SETTLE);
  const stop = inView(blocks, (el) => {
    mAnimate(el, { opacity: [0, 1], y: [12, 0] }, { duration: 0.22, ease: 'easeOut' }).then(() => disarm(el));
  }, { amount: 0.15 });
  return () => { stop && stop(); blocks.forEach(disarm); };
}

let undo = null;
function branch() {
  if (undo) { undo(); undo = null; }
  if (calm.matches) return;
  undo = wide.matches ? desktop() : phone();
}
branch();
wide.addEventListener('change', branch);
calm.addEventListener('change', branch);
