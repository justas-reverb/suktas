/**
 * The one clock of the home page's "Kaip jis galvoja" band: his five steps counted 1 to 5, one soft even beat each, a long
 * rest on 5 (the goal), then the dots drop out, the road empties and it begins again at 1, for as long as the band is on
 * the screen. The list (src/art/thinkroad.js) and the picture behind it (createSteps in herodial.js) both listen to this,
 * so they always show the same step, and the list does not need the picture (no WebGL, a software GPU, a lost context) to move.
 *
 *   state.pos    the step the glow is on (1..5, glides into each arrival)
 *   state.focus  how far the glow has gathered (0 = all five alike, which is the still)
 *   state.fade   the end of a round: the dots drop out one by one
 * listeners: watch(fn(state)) after every change; onEvent(fn(name, k)) for 'arrive' k (ring k is reached), 'go' k (the
 * road leaves ring k) and 'reset'.
 */
import { createTimeline } from 'animejs';

const FPS = 40;
const BEAT = 1200; // from one number to the next
const GLIDE = 700; // the glow's move into the next number, inside the beat
const LEAVE = 350; // the road leaves a ring this long after reaching it (home.css runs it for the rest of the beat)
const GOAL = 2600; // the rest on 5
const OUT = 800;
const DARK = 300;
const BACK = 800;

function create() {
  const state = { pos: 1, focus: 0, fade: 0 };
  const frameFns = new Set();
  const eventFns = new Set();
  let tl = null;
  let drawn = '';
  // the timeline ticks through its rests too; a frame is owed only when something moved
  const push = () => {
    const now = `${state.pos}|${state.focus}|${state.fade}`;
    if (now === drawn) return;
    drawn = now;
    frameFns.forEach((f) => f(state));
  };
  const emit = (name, k) => eventFns.forEach((f) => f(name, k));

  function round(first) {
    emit('arrive', 1);
    const t = createTimeline({ defaults: { ease: 'inOutSine' }, frameRate: FPS, onUpdate: push, onComplete: () => { if (tl === t) tl = round(false); } });
    if (first) t.add(state, { focus: [0, 1], duration: 500 }, 0);
    for (let k = 1; k < 5; k++) {
      const at = k * BEAT;
      t.call(() => emit('go', k), at - BEAT + LEAVE);
      t.add(state, { pos: [k, k + 1], duration: GLIDE }, at - GLIDE + 100);
      t.call(() => emit('arrive', k + 1), at);
    }
    const end = 4 * BEAT + GOAL;
    t.call(() => emit('reset', 0), end);
    t.add(state, { fade: [0, 1], duration: OUT }, end);
    t.add(state, { pos: [5, 1], duration: 1 }, end + OUT + DARK / 2);
    t.add(state, { fade: [1, 0], duration: BACK }, end + OUT + DARK);
    return t;
  }

  return {
    state,
    watch(fn) { frameFns.add(fn); },
    onEvent(fn) { eventFns.add(fn); },
    get playing() { return !!tl; },
    play() {
      if (tl) return;
      tl = round(true);
    },
    reset() {
      if (tl) { const t = tl; tl = null; t.pause(); }
      state.pos = 1; state.focus = 0; state.fade = 0;
      emit('reset', 0);
      push();
    },
  };
}

export const road = create();
