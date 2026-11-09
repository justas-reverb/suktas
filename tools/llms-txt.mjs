/**
 * Writes dist/llms.txt (llmstxt.org): the site's name, the home page's description, and
 * every page in the sitemap with its title and description, read from the built pages
 * themselves so it can never list a page that does not exist or describe one wrongly.
 *
 * It runs on `astro:build:done` before the strip and the gates; the strip gate allows it by exact path and reads it for comments; the privacy gate fails any URL in it off suktas.lt.
 * A page in the sitemap without a built file, a title or a description fails the build, and so
 * does a title over 65 characters with „ – Suktas".
 */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const decode = (s) =>
  s.replace(/&(#x[\da-f]+|#\d+|amp|quot|lt|gt|apos|#39);/gi, (_, e) => {
    const named = { amp: '&', quot: '"', lt: '<', gt: '>', apos: "'" };
    if (named[e.toLowerCase()]) return named[e.toLowerCase()];
    return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  });

// The panel's SEO check warns above this (`title_len`, Panel docs/SEO.md), suffix included.
const TITLE_MAX = 65;

export function build(sitemap, readPage) {
  const bad = [];
  const pages = [];
  for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const html = readPage(new URL(loc).pathname);
    const title = html && html.match(/<title>([^<]*)<\/title>/)?.[1];
    const desc = html && html.match(/<meta name="description" content="([^"]*)"/)?.[1];
    if (!html) bad.push(`${loc}: no built page`);
    else if (!title || !desc) bad.push(`${loc}: no title or description`);
    else if ([...decode(title)].length > TITLE_MAX) bad.push(`${loc}: title ${[...decode(title)].length} characters, at most ${TITLE_MAX}`);
    else pages.push({ loc, title: decode(title).replace(/ – Suktas$/, ''), desc: decode(desc) });
  }
  const home = pages.find((p) => new URL(p.loc).pathname === '/');
  if (!home) bad.push('the home page is not in the sitemap');
  if (bad.length) return { bad };
  const list = pages
    .filter((p) => p !== home)
    .map((p) => `- [${p.title.replace(/[[\]]/g, '')}](${p.loc}): ${p.desc}`)
    .join('\n');
  return { bad, text: `# Suktas\n\n> ${home.desc}\n\n## Puslapiai\n\n- [Pradžia](${home.loc}): ${home.desc}\n${list}\n` };
}

export default function llmsTxt() {
  return {
    name: 'llms-txt',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const readPage = (p) => {
          try { return fs.readFileSync(`${root}${p.replace(/^\//, '')}index.html`, 'utf8'); } catch { return null; }
        };
        const { bad, text } = build(fs.readFileSync(`${root}sitemap.xml`, 'utf8'), readPage);
        if (bad.length) {
          for (const b of bad) logger.error(b);
          throw new Error(`llms.txt: ${bad.length} page(s) could not be listed`);
        }
        fs.writeFileSync(`${root}llms.txt`, text);
        logger.info(`llms.txt: ${text.split('\n- ').length - 1} pages listed`);
      },
    },
  };
}
