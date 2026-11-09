/**
 * The list of "Kaip jis galvoja" on the home page: a mint road runs along the line from ring 1 to ring 5 and each ring
 * fills as it is reached (src/styles/home.css draws it from the classes this sets: is-go on a step whose stretch of road
 * is running, is-done on a step that has been reached). The text never changes. It starts when the list is well into the
 * screen, loops on the one clock the picture also follows (stepclock.js, fetched only here), and stops and rewinds when
 * the whole band has left the screen. It does not depend on the picture. Nothing runs under reduced motion or without
 * JavaScript: the list stays as the page was written.
 */
const band = document.querySelector('.think');
const list = band && band.querySelector('.beats');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

if (list && 'IntersectionObserver' in window) {
  const items = [...list.children];
  let clock = null;
  let loading = null;
  let played = false;
  let wanted = false;

  const load = () => loading || (loading = import('./stepclock.js').then((m) => {
    clock = m.road;
    clock.onEvent((name, k) => {
      if (name === 'reset') { for (const li of items) li.classList.remove('is-go', 'is-done'); return; }
      const li = items[k - 1];
      if (li) li.classList.add(name === 'go' ? 'is-go' : 'is-done');
    });
  }, () => { loading = null; }));

  // started when the top of the list is above 60% of the screen's height: the road is in view while it runs
  new IntersectionObserver((entries) => {
    wanted = entries[entries.length - 1].isIntersecting;
    if (!wanted || played || reduced.matches) return;
    played = true;
    load().then(() => { if (clock && wanted && played) clock.play(); });
  }, { rootMargin: '0px 0px -40% 0px' }).observe(list);

  // fetched a little before, so the road starts at once
  new IntersectionObserver((entries, o) => { if (entries[entries.length - 1].isIntersecting && !reduced.matches) { load(); o.disconnect(); } }, { rootMargin: '600px 0px' }).observe(band);

  // the whole band has left the screen: the next visit plays again
  const rewind = () => { played = false; if (clock) clock.reset(); };
  new IntersectionObserver((entries) => { if (!entries[entries.length - 1].isIntersecting) rewind(); }).observe(band);
  reduced.addEventListener('change', () => { if (reduced.matches) rewind(); });
}
