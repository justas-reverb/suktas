import { letters } from '../../lib/triukai.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// RSS 2.0, the letters only: the same words as the page, read without giving anyone an address.
export function GET({ site }) {
  const items = letters
    .map(({ slug, date, title, description }) => {
      const url = new URL(`/triukai/${slug}/`, site);
      return `    <item>\n      <title>${esc(title)}</title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${new Date(`${date}T08:00:00Z`).toUTCString()}</pubDate>\n      <description>${esc(description)}</description>\n    </item>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Suktas: Savaitės triukas</title>\n    <link>${new URL('/triukai/', site)}</link>\n    <description>Vienas sukčių triukas per savaitę.</description>\n    <language>lt</language>\n${items}\n  </channel>\n</rss>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
