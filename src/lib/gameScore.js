/**
 * The games' score: invented money left in an invented account (docs/GAMES-PLAN.md). In memory only, gone with
 * the page. Time never enters it: rushing the reader is the scammer's tool. Each step's first choice counts.
 * Tested by `node tools/game-check.mjs --self-test`.
 */
export const newRun = (start) => ({ start, left: start, picks: new Map() });

/** Spends a step's first choice; a later choice in that step returns false and costs nothing. */
export function choose(run, step, cost) {
  if (run.picks.has(step)) return false;
  run.picks.set(step, cost);
  run.left = Math.max(0, run.left - cost);
  return true;
}

/** Which of the three endings the money left earns: untouched, half or more, less than half. */
export const ending = (run) => (run.left === run.start ? 'all' : run.left * 2 >= run.start ? 'some' : 'little');

/** "2 400 €" with no-break spaces, as the site writes sums. */
export const euros = (n) => `${String(n).replace(/\B(?=(\d{3})+$)/g, ' ')} €`;
