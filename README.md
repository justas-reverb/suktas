# Suktas

**Suktas (suktas.lt) – lietuviška svetainė apie kibernetinį saugumą, parašyta iš sukčiaus pusės: kiekvienas
puslapis parodo, kaip veikia apgaulė, ir baigiasi vienu veiksmu, kuris ją sustabdo. Čia yra visas
svetainės kodas, kiekvienas jos faktas su šaltiniu ir kiekvieno puslapio tekstas, kad bet kas galėtų juos
patikrinti. Radai klaidą? Rašyk info@suktas.lt.**

Suktas is a Lithuanian-language website about cybersecurity for ordinary people. Each page shows an
attack (a scam call, a fake shop, a leaked password) from the attacker's side and ends on the one move
that stops it. It never teaches anyone to deceive people or to break into what is not theirs.

This repository is the site's source, published so that anyone can check the code and every fact. It is
copied by hand from the working repository, so it can lag a little behind the live site.

## What is here

| Path | What it is |
|---|---|
| `src/` | the site: Astro pages, components, layouts, styles and the painted WebGL art |
| `public/` | static files served as they are (logo, stills, fonts' licences, the visit counter) |
| `docs/FACTS.md` | every fact a page uses, numbered (F1, F2, ...), each with its source, date and how it was read |
| `docs/copy/` | the Lithuanian words of each page, with the fact numbers as `<!-- F12 -->` tags after each claim |
| `tools/` | the build steps, the gates the build must pass, and the checks and paint tools |

## Building it

Needs Node.js 22.12 or newer.

```
npm ci
npm run build      # writes dist/; fails if a gate fails
npm run check      # runs the two gates again on dist/
npm run dev        # a local server while editing
```

The build is checked by its own gates: `tools/check-privacy.mjs` refuses anything loaded from another
server, anything stored in the reader's browser and anything inline the Content Security Policy would
block; `tools/strip-deploy.mjs` strips comments and refuses Markdown or SVG in what ships;
`tools/page-dates.mjs` sets each page's sitemap date to the day its own words last changed (with no git
history it uses the committed `src/data/page-dates.json`). `node tools/check-copy.mjs` (after a build)
checks that each page's words in `docs/copy/` reach the built page word for word.

The browser checks and the paint tools (`tools/shoot.mjs`, `tools/paint-*.mjs`, ...) drive an installed
Google Chrome through `playwright-core`.

## How the facts are sourced

Every claim on a page carries a tag such as `<!-- F201 -->` in `docs/copy/` (and in the page's source,
stripped from the built HTML). The number leads to `docs/FACTS.md`, which gives the source (an official
page, a bank's or the police's statement, a news report), the date it was read, and whether it is primary
or secondary. The site's own page /saltiniai/ lists the sources for readers. Facts that could not be
confirmed are listed as gaps, not written on a page.

## Reporting an error

If a fact is wrong, out of date or badly sourced, write to **info@suktas.lt** with the page and, if you
can, a better source. Corrections are dated on the site's page /kas-pasikeite/.

## Licence

- **The code:** MIT, see `LICENSE`.
- **The words and the facts** (`docs/copy/`, `docs/FACTS.md` and the text of the pages):
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit Suktas and link to https://suktas.lt.
- **The logo and the painted art** (the images in `public/`, `src/art/` and `tools/paint/`): all rights
  reserved, and not covered by either licence above.
- The fonts keep their own licences, which travel with them in `public/`.
