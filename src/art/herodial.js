/**
 * The clock of direction B (the number). anime.js owns it: the shader only reads what this holds.
 * One timeline dials the five rows once, centre first, a stagger apart; after that a row of the three
 * nearest ones is dialled again now and then and a cursor dot beside the centre number blinks.
 * Nothing runs between events: anime's engine sleeps once its animations end, and the pauses are
 * setTimeouts, so the page owes no requestAnimationFrame while the number is at rest.
 * onFrame(state) is told after every change; state.prog / state.seed / state.blink are what the shader reads.
 */
import { createTimeline, animate, stagger } from 'animejs';
import { FAMILIES, MAIN_CELLS, SUB_CELLS, restCells, cellCount, glyphs } from './bands.js';

const ROWS = 5;
const FPS = 40;
const ROLL_MS = 2000;

export function createDial(onFrame) {
  const rows = Array.from({ length: ROWS }, () => ({ p: 0, seed: 0 }));
  const state = { prog: new Float32Array(ROWS), seed: new Float32Array(ROWS), blink: 0 };
  let running = false;
  let timer = 0;
  let blinkTimer = 0;
  let live = null;
  let introDone = false;

  const push = () => {
    for (let i = 0; i < ROWS; i++) { state.prog[i] = rows[i].p; state.seed[i] = rows[i].seed; }
    onFrame(state);
  };
  const settle = () => { for (const r of rows) { if (r.p > 0) { r.seed += 1; r.p = 0; } } push(); };

  function again() {
    if (!running) return;
    timer = setTimeout(() => {
      if (!running) return;
      const r = rows[[0, 0, 1, 2][Math.floor(Math.random() * 4)]];
      live = animate(r, {
        p: [0, 1], duration: ROLL_MS, ease: 'linear', frameRate: FPS,
        onUpdate: push,
        onComplete: () => { r.seed += 1; r.p = 0; live = null; push(); again(); },
      });
    }, 5000 + Math.random() * 4000);
  }

  function blink() {
    if (!running || !introDone) return;
    blinkTimer = setTimeout(() => { state.blink = state.blink ? 0 : 1; onFrame(state); blink(); }, state.blink ? 700 : 900);
  }

  return {
    state,
    draw: push,
    start() {
      if (running) return;
      running = true;
      if (!introDone) {
        live = createTimeline({ defaults: { ease: 'linear' }, frameRate: FPS, onUpdate: push, onComplete: () => { live = null; introDone = true; settle(); blink(); again(); } })
          .add(rows, { p: [0, 1], duration: ROLL_MS, delay: stagger(320, { start: 300 }) }, 0);
      } else { blink(); again(); }
    },
    stop() {
      running = false;
      clearTimeout(timer);
      clearTimeout(blinkTimer);
      if (live) { live.pause(); }
    },
    resume() {
      if (running) return;
      running = true;
      if (live) live.play();
      else { blink(); again(); }
    },
  };
}

/**
 * The picture behind the home page's "Kaip jis galvoja" band listens to the band's one clock (stepclock.js), which the
 * list on the page plays once as it comes into view; this only hands the picture that clock's state. The clock is not
 * started or stopped here: the list does not wait for the picture. A draw follows each change, and the current state
 * whenever the picture comes back on screen.
 */
import { road } from './stepclock.js';

export function createSteps(onFrame) {
  road.watch(onFrame);
  const draw = () => onFrame(road.state);
  return { state: road.state, draw, start: draw, resume: draw, stop() {} };
}

/**
 * The clock of the page bands (direction k, src/art/hero/k.frag.glsl). One family, one kind of motion, played in a loop for
 * as long as the band is on the screen; anime's engine sleeps between changes and the pauses are setTimeouts, so a band owes
 * the page no requestAnimationFrame while its digits are still. state.g is a glyph per cell (main row at 0, sub row at 14),
 * state.p the glyph each cell had before its last change and state.r how much of that old glyph still shows (1 to 0, 0 = at
 * rest): a changed digit fades to the next, dot by dot. At the start g is the still and r is 0, so the first live frame is the still.
 *   dial     a caller ID is dialled digit by digit, the call timer runs, the number goes back to dashes (calls)
 *   count    a balance drains to nothing while the loss under it counts up, then comes back (money)
 *   tick     a countdown ticks once a second and starts over, as a shop's fake sale timer does (shops, ten)
 *   code     six masked digits arrive one by one while the code's own countdown runs, then go back to dashes (codes)
 *   pulse    the unread count ticks up, the minute turns over, it all goes back (heart)
 *   rise     a score climbs to 100%, stays, sinks back (score)
 *   elapsed  the time this page has been on the screen, counting up: nobody is hurrying you here (plain)
 */
const CELL_CODE = { '-': 13, ' ': 14 };
const MORPH_MS = 480;

export function createBand(onFrame, name) {
  const f = FAMILIES[name] || FAMILIES.plain;
  const [mainN, subN] = cellCount(name);
  const rest = restCells(name);
  const state = { g: Float32Array.from(rest), p: Float32Array.from(rest).subarray(0, MAIN_CELLS + SUB_CELLS), r: new Float32Array(MAIN_CELLS + SUB_CELLS) };
  let running = false;
  let timer = 0;
  let seconds = 0;
  const lives = new Set();
  const push = () => onFrame(state);
  const setRow = (str, base, n) => state.g.set(glyphs(str, n), base);
  const setMain = (str) => setRow(str, 0, mainN);
  const setSub = (str) => setRow(str, MAIN_CELLS, subN);
  const wait = (ms, fn) => { clearTimeout(timer); if (running) timer = setTimeout(fn, ms); };
  const sleep = () => wait(2200, round);
  const halt = () => { for (const a of lives) a.pause(); lives.clear(); state.r.fill(0); };
  /** [ms, fn] pairs, run one after the other; a stop drops the rest */
  function steps(list, done) {
    let i = 0;
    const go = () => {
      if (i >= list.length) { done(); return; }
      const [ms, fn] = list[i++];
      wait(ms, () => { fn(); push(); go(); });
    };
    go();
  }
  /** a step that sets some cells: those that changed fade from the old glyph to the new one */
  const change = (fn) => () => {
    const before = Float32Array.from(state.g);
    fn();
    const cells = [];
    for (let i = 0; i < state.r.length; i++) if (state.g[i] !== before[i]) { cells.push(i); state.p[i] = before[i]; state.r[i] = 1; }
    if (!cells.length) return;
    const v = { r: 1 };
    const a = animate(v, {
      r: [1, 0], duration: MORPH_MS, ease: 'inOutSine', frameRate: 40,
      onUpdate: () => { for (const i of cells) state.r[i] = v.r; push(); },
      onComplete: () => { for (const i of cells) state.r[i] = 0; lives.delete(a); push(); },
    });
    lives.add(a);
  };
  /** v.x runs to end, then `then`; show() draws each step */
  const run = (v, end, ms, show, then) => {
    const a = animate(v, { x: [v.x, end], duration: ms, ease: 'inOutQuad', frameRate: 30, onUpdate: show, onComplete: () => { v.x = end; lives.delete(a); show(); then(); } });
    lives.add(a);
  };
  const dashCells = () => Array.from(f.main, (c, i) => (c === '-' ? i + mainN - f.main.length : -1)).filter((c) => c >= 0);
  const toDash = (c) => change(() => { state.g[c] = CELL_CODE['-']; });

  function dial() {
    const dashes = dashCells();
    const digits = dashes.map((_, k) => (k === 0 ? 0 : Math.floor(Math.random() * 10)));
    const out = dashes.map((c, k) => [170, change(() => { state.g[c] = digits[k]; })]);
    for (let t = 1; t <= 3; t++) out.push([1000, change(() => setSub(`00:0${t}`))]);
    out.push([1000, () => {}]);
    [...dashes].reverse().forEach((c) => out.push([110, toDash(c)]));
    out.push([300, change(() => setSub(f.sub))]);
    steps(out, sleep);
  }

  const thousands = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  function count() {
    const v = { x: f.from };
    const show = () => { setMain(`${thousands(v.x)}.00`); setSub(`-${thousands(f.from - v.x)}.00`); push(); };
    run(v, 0, 2800, show, () => wait(1500, () => run(v, f.from, 1400, show, sleep)));
  }

  function rise() {
    const v = { x: 0 };
    const show = () => { setMain(`${Math.round(v.x)}%`); push(); };
    run(v, 100, 3000, show, () => wait(1800, () => run(v, 0, 1400, show, sleep)));
  }

  const clockText = (s) => {
    const two = (n) => String(n).padStart(2, '0');
    return f.fmt === 'hms' ? `${two(Math.floor(s / 3600))}:${two(Math.floor(s / 60) % 60)}:${two(s % 60)}` : `${two(Math.floor(s / 60))}:${two(s % 60)}`;
  };
  function tick() {
    const out = [];
    for (let k = 1; k <= f.ticks; k++) out.push([1000, change(() => setMain(clockText(f.start - k)))]);
    out.push([1600, change(() => setMain(clockText(f.start)))]);
    steps(out, sleep);
  }

  function elapsed() {
    wait(1000, () => { seconds = (seconds + 1) % 3600; change(() => setMain(clockText(seconds)))(); push(); elapsed(); });
  }

  function code() {
    const cells = dashCells();
    const out = cells.map((c) => [260, change(() => { state.g[c] = Math.floor(Math.random() * 10); })]);
    for (let t = 1; t <= 3; t++) out.push([1000, change(() => setSub(`00:${30 - t}`))]);
    [...cells].reverse().forEach((c) => out.push([110, toDash(c)]));
    out.push([300, change(() => setSub(f.sub))]);
    steps(out, sleep);
  }

  function pulse() {
    const colon = mainN - 3;
    steps([
      [900, change(() => { state.g[colon] = CELL_CODE[' ']; })],
      [500, change(() => { state.g[colon] = 11; })],
      [800, change(() => setSub('+4'))],
      [1100, change(() => setSub('+5'))],
      [900, change(() => setMain('02:48'))],
      [1800, change(() => { setMain(f.main); setSub(f.sub); })],
    ], sleep);
  }

  function round() {
    if (!running) return;
    ({ dial, count, tick, code, pulse, rise, elapsed }[f.kind] || tick)();
  }

  return {
    state,
    draw: push,
    start() { if (running) return; running = true; wait(1200, round); },
    stop() { running = false; clearTimeout(timer); halt(); },
    resume() {
      if (running) return;
      running = true;
      if (f.kind !== 'elapsed') state.g.set(rest);
      push();
      wait(900, round);
    },
  };
}
