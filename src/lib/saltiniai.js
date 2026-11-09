/**
 * Reads docs/copy/saltiniai.md into the Šaltiniai page's entries. A line that does not fit the
 * pattern, a source that is not an https: link or a page link that is not site-relative stops the
 * build: these hrefs go into the page as they are written in the copy. tools/test-gates.mjs breaks
 * a copy of the file to prove each throw.
 */
const links = (s) => [...s.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)].map((m) => [m[1], m[2]]);
const noComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();

const ENTRY = /^- \*\*(F\d+)\.\*\* (.+?) <!-- F\d+ --> Šaltinis: \[(.+?)\]\((\S+?)\)\. (.+?)\. (?:Šaltinio data: (.+?)\. )?Perskaityta (\S+?)\. Naudojama: (.+)\.$/;
const GAP = /^- \*\*(F\d+)\.\*\* (.+?) <!-- F\d+ --> Naudojama: (.+)\.$/;

function pages(id, s) {
  const used = links(s);
  for (const [, href] of used) if (!/^\/(?!\/)/.test(href)) throw new Error(`saltiniai.md: ${id} links a page that is not on this site: ${href}`);
  return used;
}

export function readSources(raw) {
  const text = raw.replace(/\r/g, '');
  const body = text.slice(text.indexOf('\n---\n') + 5);
  const [mainPart, gapPart] = body.split('\n## Ko neradome');

  const entries = mainPart.split('\n').filter((l) => l.startsWith('- **F')).map((line) => {
    const m = line.match(ENTRY);
    if (!m) throw new Error(`saltiniai.md: entry does not fit the pattern: ${line.slice(0, 80)}`);
    const [, id, claim, srcName, srcUrl, kind, date, read, used] = m;
    if (srcName.includes('](')) throw new Error(`saltiniai.md: ${id} has more than one source link: ${srcName.slice(0, 60)}`);
    if (!/^https:\/\/[^/\s]/.test(srcUrl)) throw new Error(`saltiniai.md: ${id}'s source is not an https: link: ${srcUrl}`);
    return { id, claim: noComments(claim), srcName, srcUrl, kind, date, read, used: pages(id, used) };
  });

  const gaps = gapPart.split('\n').filter((l) => l.startsWith('- **F')).map((line) => {
    const m = line.match(GAP);
    if (!m) throw new Error(`saltiniai.md: gap does not fit the pattern: ${line.slice(0, 80)}`);
    return { id: m[1], claim: noComments(m[2]), used: pages(m[1], m[3]) };
  });
  if (entries.length < 80 || gaps.length < 2) throw new Error('saltiniai.md: too few entries read');
  return { entries, gaps };
}
