/**
 * Where the text really is. The art keeps its numbers out from under the words, and a block's own box is far wider than
 * its words (a lead paragraph's max-width, a flex row's full width), so the boxes are the text's own lines: one rectangle
 * per line of every text node under the matched elements, in viewport pixels. Lines in the same row (a flex row's pieces)
 * join into one; when there are more than `limit`, the two nearest rows are joined until there are not.
 */
export function textLines(scope, selector, limit = 16) {
  const rects = [];
  const range = document.createRange();
  for (const el of scope.querySelectorAll(selector)) {
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walk.nextNode()) {
      const n = walk.currentNode;
      if (!n.data.trim()) continue;
      const cs = getComputedStyle(n.parentElement);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      range.selectNodeContents(n);
      for (const b of range.getClientRects()) if (b.width > 1 && b.height > 1) rects.push({ l: b.left, t: b.top, r: b.right, b: b.bottom });
    }
  }
  // pieces of one line (same row, overlapping heights) become one rectangle
  rects.sort((a, c) => a.t - c.t || a.l - c.l);
  const rows = [];
  for (const q of rects) {
    const last = rows[rows.length - 1];
    const overlap = last && Math.min(last.b, q.b) - Math.max(last.t, q.t);
    if (last && overlap > 0.5 * Math.min(last.b - last.t, q.b - q.t)) {
      last.l = Math.min(last.l, q.l); last.r = Math.max(last.r, q.r); last.t = Math.min(last.t, q.t); last.b = Math.max(last.b, q.b);
    } else rows.push({ ...q });
  }
  while (rows.length > limit) {
    let at = 0;
    let gap = Infinity;
    for (let i = 0; i + 1 < rows.length; i++) { const g = rows[i + 1].t - rows[i].b; if (g < gap) { gap = g; at = i; } }
    const a = rows[at];
    const c = rows.splice(at + 1, 1)[0];
    a.l = Math.min(a.l, c.l); a.r = Math.max(a.r, c.r); a.t = Math.min(a.t, c.t); a.b = Math.max(a.b, c.b);
  }
  return rows;
}
