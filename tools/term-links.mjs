/**
 * Links the first PIN1, PIN2 or "phishing" on each built page to the page that explains it
 * (`linkTerms` and its TERMS in src/lib/typo.js). Only the whole page knows which mention is the first,
 * so this runs on `astro:build:done`, first of the integrations; the words do not change, only a link
 * is added. First it colours the tokens in headings (`colourHeadings`), which come from too many
 * components to pass each through `nbHtml`. `npm run dev` shows neither.
 *
 *   node tools/term-links.mjs --self-test
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { colourHeadings, linkTerms, sourceName } from '../src/lib/typo.js';

const walk = (d) => fs.readdirSync(d, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []));

export default function termLinks() {
  return {
    name: 'term-links',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let n = 0;
        for (const file of walk(root)) {
          const pathname = `/${path.relative(root, path.dirname(file)).split(path.sep).join('/')}/`.replace(/^\/\/$/, '/');
          const html = fs.readFileSync(file, 'utf8');
          const out = linkTerms(colourHeadings(html), pathname);
          if (out !== html) { fs.writeFileSync(file, out); n += out.split('class="tk-term"').length - 1; }
        }
        logger.info(`term links: ${n} added`);
      },
    },
  };
}

if (process.argv[2] === '--self-test') {
  const span = (t, k = 'code') => `<span class="tk tk--${k}">${t}</span>`;
  const page = `<a href="/">${span('PIN1')}</a><main><p><a href="/x/">${span('PIN1')}</a> ${span('PIN1')} ${span('PIN1')} ${span('PIN2')} ${span('Phishing', 'term')}</p></main>`;
  const out = linkTerms(page, '/scenarijai/x/');
  const links = out.match(/<a class="tk-term" href="[^"]+">/g) || [];
  console.assert(links.length === 3, `three links, got ${links.length}`);
  console.assert(out.startsWith(`<a href="/">${span('PIN1')}</a><main><p><a href="/x/">${span('PIN1')}</a> <a class="tk-term"`), 'skips outside <main> and inside a link');
  console.assert(linkTerms(page, '/sustok/kodai-ir-pin/').match(/tk-term/g).length === 1, 'no link to the page itself');
  console.assert(out.replace(/<[^>]+>/g, '') === page.replace(/<[^>]+>/g, ''), 'words unchanged');
  const head = '<h1 id="h">Kodų ir <em>PIN</em> už 150 €</h1><h2>Jau ' + span('PIN') + ' ir PUK</h2>';
  const coloured = colourHeadings(head);
  console.assert(coloured.startsWith(`<h1 id="h">Kodų ir <em>${span('PIN')}</em> už ${span('150 €', 'money')}</h1>`), 'colours a heading, inside its tags');
  console.assert(coloured.endsWith('<h2>Jau ' + span('PIN') + ' ir PUK</h2>'), 'leaves a heading already coloured alone');
  const b = (t) => `<b class="src-name">${t}</b>`;
  console.assert(sourceName('15min (Vakarų ekspresas), 2026-04-24: x') === `${b('15min')} (Vakarų ekspresas), 2026-04-24: x`, 'name before a date, brackets plain');
  console.assert(sourceName('Varėnos, Vilniaus ir Lietuvos policija (TV3): x') === `${b('Varėnos, Vilniaus ir Lietuvos policija')} (TV3): x`, 'a comma before a capital stays in the name');
  console.assert(sourceName('„Artea“ (LRT), „Ignitis“ (LRT) ir „Luminor“: x') === `${b('„Artea“')} (LRT), ${b('„Ignitis“')} (LRT) ir ${b('„Luminor“')}: x`, 'several names');
  console.assert(sourceName('„Sodros“ atvejis (2026-07-13).') === `${b('„Sodros“')} atvejis (2026-07-13).`, 'no colon: the leading quoted name');
  console.assert(sourceName('Prašymas, kurio nepradėjai: x') === 'Prašymas, kurio nepradėjai: x', 'skip list');
  console.log('term-links self-test done');
}
