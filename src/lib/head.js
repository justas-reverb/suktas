/**
 * The header bar's colour on scroll, and its sticking from 60rem up.
 * A page that opens on a stage-indigo band (data-top="stage") gets an indigo bar at the top; once the page is a little
 * scrolled the bar turns to the day colour with a short time-based fade (system.css, 200 ms ease-out), so no resting state is
 * ever a half-mixed colour. One IntersectionObserver watches a probe at the top of the page; there is no scroll listener.
 * `head-live` on <html> is what lets the bar stick and fade, so with no script, or no IntersectionObserver, the bar is a static
 * bar in its first colour, legible on its ground. --head-h carries the bar's real height to the hero's size and to scroll-padding.
 */
export function wireHead() {
  const head = document.querySelector('.head');
  if (!head || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  const size = () => root.style.setProperty('--head-h', head.offsetHeight + 'px');
  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(head);
  const probe = document.createElement('div');
  probe.className = 'head__probe';
  probe.setAttribute('aria-hidden', 'true');
  document.body.prepend(probe);
  new IntersectionObserver((e) => {
    head.classList.toggle('is-scrolled', !e[e.length - 1].isIntersecting);
    // the first report is the page as it arrived: no fade for it
    requestAnimationFrame(() => root.classList.add('head-live'));
  }).observe(probe);
}
