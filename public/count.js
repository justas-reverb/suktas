// The visit counter's page script (Panel docs/VISITS.md). On a page that is shown, one page view; after
// eight seconds of VISIBLE time or one real input, one "engaged". A page the browser only prerendered,
// or a background tab, waits until it is looked at. No cookie; one localStorage key, set only by a
// visit with ?notrack (the owner's own browser: its visits are tagged, not counted) and cleared by ?track.
// A client's hint may only exclude a visit, never include one. With data-tag, the page view's answer (the visitor's
// first campaign tag of the day) is handed to the page as window.countTag and a 'count-tag' event, for the site's own
// booking form; nothing of it is stored (Panel docs/CAMPAIGNS.md).
(function () {
  var me = document.currentScript;
  var site = me && me.getAttribute('data-site');
  if (!site || !window.JSON) return;
  var wantTag = me.hasAttribute('data-tag');
  // only on the site itself: a local preview, a test run or a copy saved elsewhere sends nothing
  if (location.protocol !== 'https:' || (location.hostname !== site && location.hostname !== 'www.' + site)) return;
  var url = 'https://count.sudievu.lt/e.php';
  const KEY = 'sudievu-count-off';
  var hint = '';
  try {
    var q = new URLSearchParams(location.search);
    if (q.has('notrack')) localStorage.setItem(KEY, '1');
    if (q.has('track')) localStorage.removeItem(KEY);
    if (localStorage.getItem(KEY) === '1') hint = 'owner';
  } catch (e) { /* storage refused: counted as anyone */ }
  if (navigator.webdriver) hint = 'automation';
  // a campaign's link: its three tags, only when all three are well-formed (Panel docs/CAMPAIGNS.md); nothing else of the query
  var tags = null;
  try {
    var t = new URLSearchParams(location.search);
    // a missing one is null, which test() would read as the word "null"
    var ok = function (v) { return typeof v === 'string' && /^[a-z0-9-]{1,40}$/.test(v); };
    var uc = t.get('utm_campaign'), us = t.get('utm_source'), um = t.get('utm_medium');
    if (ok(uc) && ok(us) && ok(um)) tags = { uc: uc, us: us, um: um };
  } catch (e) { tags = null; }
  var ref = '';
  try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { ref = ''; }
  // no referrer, but the link names the site it was on (ChatGPT's utm_source=chatgpt.com): that site referred it
  if (!ref) try {
    var src = new URLSearchParams(location.search).get('utm_source');
    if (src && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(src)) ref = src;
  } catch (e) { ref = ''; }

  function send(t) {
    var e = { s: site, p: location.pathname, r: ref, t: t, x: hint };
    if (tags) { e.uc = tags.uc; e.us = tags.us; e.um = tags.um; }
    var body = JSON.stringify(e);
    if (t === 'pv' && wantTag && window.fetch) return told(body);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, body)) return;
    } catch (e) { /* fall through */ }
    try { fetch(url, { method: 'POST', body: body, keepalive: true, mode: 'cors', credentials: 'omit' }); } catch (e) { /* lost */ }
  }

  // the page view sent so its answer can be read: {tag, source, medium}, each '' or a well-formed tag
  function told(body) {
    var part = function (v) { return typeof v === 'string' && /^([a-z0-9-]{1,40})?$/.test(v); };
    fetch(url, { method: 'POST', body: body, keepalive: true, mode: 'cors', credentials: 'omit' })
      .then(function (r) { return r.status === 200 ? r.json() : null; })
      .then(function (a) {
        if (!a || !part(a.tag) || !part(a.source) || !part(a.medium)) return;
        window.countTag = Object.freeze({ tag: a.tag, source: a.source, medium: a.medium });
        dispatchEvent(new CustomEvent('count-tag', { detail: window.countTag }));
      })
      .catch(function () { /* no answer: the page treats the visit as untagged */ });
  }

  var viewed = false, engaged = false, seen = 0, since = 0, timer = 0;
  function looking() { return document.visibilityState === 'visible' && !document.prerendering; }
  function engage() {
    if (engaged) return;
    engaged = true;
    stop();
    send('en');
    document.removeEventListener('visibilitychange', onVis);
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (k) { removeEventListener(k, onInput, true); });
  }
  function start() {
    if (engaged || timer) return;
    since = Date.now();
    timer = setTimeout(engage, Math.max(0, 8000 - seen));
  }
  function stop() {
    if (!timer) return;
    clearTimeout(timer);
    timer = 0;
    seen += Date.now() - since;
  }
  function onVis() {
    if (looking()) {
      if (!viewed) { viewed = true; send('pv'); }
      start();
    } else {
      stop();
    }
  }
  // a press, a key, a wheel or a touch: a script cannot make one trusted (a scroll it causes is trusted, so not that)
  function onInput(e) { if (viewed && e && e.isTrusted) engage(); }

  document.addEventListener('visibilitychange', onVis);
  document.addEventListener('prerenderingchange', onVis);
  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (k) { addEventListener(k, onInput, { capture: true, passive: true }); });
  onVis();
})();
