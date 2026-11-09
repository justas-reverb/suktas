/** The phone menu and the wide drop-downs are native <details>; this only closes them the way a menu should close. */
export function wireMenu() {
  const all = [...document.querySelectorAll('[data-menu], [data-drop]')];
  if (!all.length) return;
  const closeAll = (except) => all.forEach((d) => { if (d !== except) d.open = false; });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = all.find((d) => d.open);
    if (open) { open.open = false; open.querySelector('summary').focus(); }
  });
  document.addEventListener('click', (e) => {
    all.forEach((d) => { if (d.open && !d.contains(e.target)) d.open = false; });
    if (e.target.closest('.menu__list a, .drop__list a')) closeAll();
  });
  document.querySelector('[data-menu]')?.addEventListener('toggle', (e) => { if (e.target.open) window.scrollTo(0, 0); });
  matchMedia('(min-width: 64rem)').addEventListener('change', () => closeAll());
}
