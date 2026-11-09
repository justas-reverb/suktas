/**
 * The header's search. With JavaScript off the button is a link to /turinys/, the whole map. With it on,
 * the button opens a <dialog>, the first open fetches /paieska.json (tools/search-index.mjs) from this
 * site, and every keystroke searches it in memory: nothing is sent anywhere and nothing is stored.
 *
 * Matching folds case and Lithuanian marks („slaptazodis" finds „Slaptažodis"), matches word beginnings,
 * and cuts the last letters of a long word so another ending still finds it („slaptažodžių"). Every word
 * of the query must match somewhere. tools/search-index.mjs --self-test checks it.
 */

/* A space either side of the input, same length between, so position i + 1 in the folded text is i in the original. */
const fold = (s) =>
  ' ' + s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\p{L}\p{N}]/gu, (c) => ' '.repeat(c.length)) + ' ';
/* A word of one or two letters („ID", „PIN" is three) matches whole words only, or „id" would find „įdiegti". */
const needle = (t) => ' ' + t + (t.length <= 2 ? ' ' : '');
/* shortcut: a crude stem for Lithuanian endings; a real stemmer if results get noisy. */
const stem = (w) => (w.length > 4 ? w.slice(0, Math.max(4, w.length - 3)) : w);
const terms = (q) => fold(q).split(' ').filter(Boolean).map(stem);

/** Adds the folded fields search() reads. NFD on a precomposed letter plus dropping its mark keeps one
 *  character per character for Lithuanian text, so positions line up for the snippet. */
export function prepare(it) {
  return { ...it, ft: fold(it.t), fd: fold(it.d), fx: fold(it.x), fh: it.h.map(([t]) => fold(t)) };
}

const WEIGHT = { ft: 8, fd: 3, fx: 1 };

/** Ranked hits: { it, href, score }. Pages come before Šaltiniai's entries, which back them up. */
export function search(items, q, max = 30) {
  const ts = terms(q);
  if (!ts.length) return [];
  const out = [];
  for (const it of items) {
    let score = 0;
    const heads = it.fh.map(() => 0);
    for (const t of ts) {
      const w = needle(t);
      let s = 0;
      for (const f in WEIGHT) if (it[f].includes(w)) s += WEIGHT[f];
      // The body counts each use, up to four, so a page about the word beats one that names it once.
      for (let i = it.fx.indexOf(w), n = 0; i >= 0 && ++n < 4; i = it.fx.indexOf(w, i + 1)) s += 1;
      it.fh.forEach((h, i) => { if (h.includes(w)) { heads[i]++; s += 5; } });
      if (!s) { score = 0; break; }
      score += s;
    }
    if (!score) continue;
    const best = Math.max(0, ...heads);
    const hi = best ? heads.indexOf(best) : -1;
    out.push({ it, score, href: hi >= 0 && !it.u.includes('#') ? `${it.u}#${it.h[hi][1]}` : it.u, head: hi >= 0 ? it.h[hi][0] : '' });
  }
  const by = (a, b) => b.score - a.score;
  const pages = out.filter((h) => h.it.k !== 'Šaltinis').sort(by);
  const srcs = out.filter((h) => h.it.k === 'Šaltinis').sort(by);
  // Sources keep up to SRC_ROOM places of their own, so a word many pages share never pushes them all off the list.
  const room = Math.min(srcs.length, Math.max(max - pages.length, SRC_ROOM));
  return [...pages.slice(0, max - room), ...srcs.slice(0, room)];
}
const SRC_ROOM = 5;

/** The original text with each matched word beginning wrapped in <mark>. `folded` is fold() of it: one leading space, then character for character. */
function marked(orig, folded, ts) {
  const frag = document.createDocumentFragment();
  const hits = [];
  // A hit runs to the end of its word, so a cut stem („smar") still marks the whole „Smart".
  const end = (e) => { while (e < orig.length && folded[e + 1] !== ' ') e++; return e; };
  for (const t of ts) for (let i = folded.indexOf(needle(t)); i >= 0; i = folded.indexOf(needle(t), i + 1)) hits.push([i, end(i + t.length)]);
  hits.sort((a, b) => a[0] - b[0]);
  // „Smart-ID": two hits a hyphen apart are one mark.
  for (let i = hits.length - 1; i > 0; i--) if (/^-+$/.test(orig.slice(hits[i - 1][1], hits[i][0]))) hits.splice(i - 1, 2, [hits[i - 1][0], hits[i][1]]);
  let at = 0;
  for (const [s, e] of hits) {
    if (s < at) continue;
    frag.append(orig.slice(at, s));
    const m = document.createElement('mark');
    m.textContent = orig.slice(s, e);
    frag.append(m);
    at = e;
  }
  frag.append(orig.slice(at));
  return frag;
}

/** A line of the page's text around its first match, when the description does not show the words. */
function snippet(it, ts) {
  if (ts.every((t) => it.fd.includes(needle(t)))) return marked(it.d, it.fd, ts);
  const i = Math.min(...ts.map((t) => it.fx.indexOf(needle(t))).filter((n) => n >= 0));
  if (!Number.isFinite(i)) return marked(it.d, it.fd, ts);
  let s = Math.max(0, i - 70);
  let e = Math.min(it.x.length, i + 150);
  if (s > 0) s = it.x.indexOf(' ', s) + 1;
  if (e < it.x.length) e = it.x.lastIndexOf(' ', e);
  const frag = document.createDocumentFragment();
  if (s > 0) frag.append('… ');
  frag.append(marked(it.x.slice(s, e), it.fx.slice(s, e + 1), ts));
  if (e < it.x.length) frag.append(' …');
  return frag;
}

export function wireFind() {
  const dlg = document.querySelector('[data-find-dialog]');
  if (!dlg) return;
  const input = dlg.querySelector('input');
  const list = dlg.querySelector('[data-find-list]');
  const status = dlg.querySelector('[data-find-status]');
  const hint = dlg.querySelector('[data-find-hint]');
  let items = null;
  let loading = null;

  const load = () =>
    (loading ??= fetch('/paieska.json')
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((raw) => { items = raw.map(prepare); })
      .catch(() => { loading = null; }));

  function render() {
    const q = input.value;
    list.replaceChildren();
    hint.hidden = !!q.trim();
    if (!q.trim()) { status.textContent = ''; return; }
    if (!items) { status.textContent = loading ? 'Kraunama…' : 'Paieška dabar neveikia. Visą turinį rasi puslapyje „Turinys“.'; return; }
    const ts = terms(q);
    const hits = search(items, q);
    status.textContent = hits.length ? (hits.length === 30 ? 'Rodome 30 tinkamiausių. Patikslink paiešką, jei ieškai kito.' : `Rasta: ${hits.length}`) : 'Nieko neradome. Pabandyk kitą žodį arba žiūrėk visą turinį.';
    let srcHead = false;
    for (const { it, href, head } of hits) {
      if (it.k === 'Šaltinis' && !srcHead) {
        srcHead = true;
        const h = document.createElement('li');
        h.className = 'find__sect';
        h.textContent = 'Šaltiniai';
        list.append(h);
      }
      const a = document.createElement('a');
      a.href = href;
      a.className = `find__r${it.k === 'Šaltinis' ? ' find__r--src' : ''}`;
      const k = document.createElement('span');
      k.className = 'find__kind';
      const kn = document.createElement('b');
      kn.textContent = it.k;
      k.append(kn);
      if (head) k.append(`, skyrius „${head}“`);
      const t = document.createElement('strong');
      t.append(marked(it.t, it.ft, ts));
      const d = document.createElement('span');
      d.className = 'find__snip';
      d.append(snippet(it, ts));
      a.append(k, t, d);
      const li = document.createElement('li');
      li.append(a);
      list.append(li);
    }
  }

  let opener = null;
  document.querySelectorAll('[data-find]').forEach((a) => {
    // A hand on its way to the button starts the index loading, so the first open has it ready.
    a.addEventListener('pointerenter', load);
    a.addEventListener('focus', load);
    a.addEventListener('click', (e) => {
      e.preventDefault();
      opener = a;
      dlg.showModal();
      input.select();
      load().then(render);
      render();
    });
  });
  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') list.querySelector('a')?.click();
    // Chrome's own Esc in a search box only empties it; one Esc closes the search and keeps the query.
    if (e.key === 'Escape') { e.preventDefault(); dlg.close(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); list.querySelector('a')?.focus(); }
  });
  // Arrow keys walk the results; Up from the first goes back to the box.
  list.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const all = [...list.querySelectorAll('a')];
    const i = all.indexOf(document.activeElement) + (e.key === 'ArrowDown' ? 1 : -1);
    (all[i] || (i < 0 ? input : null))?.focus();
  });
  // Opened from the phone's Meniu, the opener is hidden once the sheet closes: focus goes back to Meniu.
  dlg.addEventListener('close', () => { if (opener && !opener.checkVisibility()) opener.closest('details')?.querySelector('summary')?.focus(); });
  dlg.querySelector('[data-find-close]').addEventListener('click', () => dlg.close());
  // A click on the backdrop lands on the dialog itself; inside it, on a child.
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.querySelectorAll('[data-find-try]').forEach((b) =>
    b.addEventListener('click', () => { input.value = b.textContent; input.focus(); render(); }));
  // A link to a section of the page already open only scrolls; the dialog must go.
  list.addEventListener('click', (e) => { if (e.target.closest('a')) dlg.close(); });
}
