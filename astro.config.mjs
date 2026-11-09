// @ts-check
import { defineConfig } from 'astro/config';
import llmsTxt from './tools/llms-txt.mjs';
import stripForServer from './tools/strip-deploy.mjs';
import privacyGate from './tools/check-privacy.mjs';
import pageDates from './tools/page-dates.mjs';
import termLinks from './tools/term-links.mjs';
import searchIndex from './tools/search-index.mjs';

export default defineConfig({
  site: 'https://suktas.lt',
  devToolbar: { enabled: false },

  build: {
    // Styles always ship as files. The CSP allows `style-src 'self'` and nothing
    // inline, so an inlined stylesheet would be refused by the reader's browser.
    inlineStylesheets: 'never',
  },

  vite: {
    build: {
      // Never turn a font or an image into a data: URI; the CSP refuses those too.
      assetsInlineLimit: 0,
      // Without targets, Lightning CSS assumes the newest browsers and strips vendor
      // prefixes the source wrote on purpose. Measured in the Portfolio, whose
      // astro.config.mjs explains it and uses the same list.
      cssTarget: ['safari15.4', 'ios15.4', 'chrome109', 'edge109', 'firefox115'],
    },
  },

  // Order matters: term links go in first (they add links, never words); then llms.txt and the search index (paieska.json) are written from the built pages, so the gates read them; comments come out next (nothing but the site reaches Plesk),
  // then the privacy gate reads exactly what will ship. page-dates checks the sitemap's
  // <lastmod> against git before the build and the built sitemap after it.
  integrations: [termLinks(), llmsTxt(), searchIndex(), stripForServer(), privacyGate(), pageDates()],
});
