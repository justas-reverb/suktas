/**
 * A full-page screenshot that is true to the page at any height.
 *
 * Chrome's single full-page capture wraps past 16,384 device pixels: everything below that
 * repeats the top of the page. Measured on suktai.lt (2026-10-02): a 390x844@2 page 22,054 px
 * tall showed the hero again two thirds of the way down, and the 2560x1440@1.5 shot did the
 * same, so a review of either looked at the hero twice and never saw the footer. Clipped
 * captures are correct at any depth, so the page is taken in chunks and stitched.
 *
 * The page's size comes from the DevTools protocol (Page.getLayoutMetrics), not from page
 * JavaScript, so this works with JavaScript off too (where page.evaluate never settles).
 */
import sharp from 'sharp';

/** The page's content size in CSS pixels, read without running page JavaScript. */
export async function contentSize(page) {
  const cdp = await page.context().newCDPSession(page);
  try {
    const m = await cdp.send('Page.getLayoutMetrics');
    const s = m.cssContentSize || m.contentSize;
    return { width: Math.ceil(s.width), height: Math.ceil(s.height) };
  } finally {
    await cdp.detach().catch(() => {});
  }
}

/**
 * The whole page as the reader's own viewport lays it out, by scrolling and capturing one viewport
 * at a time. fullShot's beyond-viewport capture resizes the window to 1x1 and back, and on
 * 2026-10-25 the page was laid out at a narrower width for some captures (stage 682 px higher,
 * narrow header art), so the contrast check measured lines over the wrong pixels. Needs page
 * JavaScript. Sticky elements move as it scrolls; the caller sets them static first.
 */
export async function scrollShot(page, dpr) {
  const { width, height } = await contentSize(page);
  const vh = await page.evaluate(() => innerHeight);
  const parts = [];
  for (let y = 0; ; y += vh) {
    const at = await page.evaluate(async (y) => {
      scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      return scrollY;
    }, y);
    parts.push({ input: await page.screenshot({ timeout: 60000 }), top: Math.round(at * dpr), left: 0 });
    if (at + vh >= height) break;
  }
  await page.evaluate(() => scrollTo(0, 0));
  const png = await sharp({ create: { width: Math.round(width * dpr), height: Math.round(height * dpr), channels: 4, background: '#ffffff' }, limitInputPixels: false })
    .composite(parts)
    .png()
    .toBuffer();
  return { png, width, height };
}

/* limitInputPixels: Šaltiniai at 2560x1440@1.5 passed sharp's default 268 Mpx on 2026-11-01. */
/** Returns a PNG buffer of the whole page, and writes it to `file` when given. */
export async function fullShot(page, dpr, file) {
  const { width, height } = await contentSize(page);
  /* A chunk a multiple of 4 CSS px tall lands on whole device pixels at 1, 1.25, 1.5, 2 and 3. */
  const chunk = Math.max(4, Math.floor(8000 / dpr / 4) * 4);
  const parts = [];
  for (let y = 0; y < height; y += chunk) {
    const h = Math.min(chunk, height - y);
    const input = await page.screenshot({ fullPage: true, clip: { x: 0, y, width, height: h }, timeout: 60000 });
    parts.push({ input, top: Math.round(y * dpr), left: 0 });
  }
  const png = await sharp({ create: { width: Math.round(width * dpr), height: Math.round(height * dpr), channels: 4, background: '#ffffff' }, limitInputPixels: false })
    .composite(parts)
    .png()
    .toBuffer();
  if (file) await sharp(png, { limitInputPixels: false }).toFile(file);
  return { png, width, height };
}
