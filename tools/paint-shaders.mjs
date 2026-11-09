/**
 * Turns the annotated shader sources in src/art/*.glsl into src/art/shaders.gen.js.
 *
 * The shaders are written with comments, because the art is the part of the site people
 * will want to read. The deploy gate (tools/strip-deploy.mjs) refuses any comment in the
 * built tree, and a comment inside a template string is still a comment to it. So the
 * built site gets this file: the same GLSL with its comments and blank lines removed.
 *
 *   node tools/paint-shaders.mjs
 *
 * `npm run build` and `npm run dev` run it first (the pre* scripts in package.json), and
 * tools/paint-art.mjs runs it before painting a still, so the stills and the live art are
 * always made from the same text.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES = [
  ['VERT', 'src/art/scene.vert.glsl'],
  ['FRAG', 'src/art/scene.frag.glsl'],
];

/** Drops // and block comments, trailing spaces and blank lines. Keeps newlines, because
 *  preprocessor lines (#version, #define, #ifdef) must stay on their own lines. */
export function stripGlsl(src) {
  let out = '';
  for (let i = 0; i < src.length; ) {
    if (src[i] === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
    } else if (src[i] === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      out += ' ';
    } else {
      out += src[i++];
    }
  }
  return out
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/g, '').replace(/^[ \t]+/g, ''))
    .filter((l) => l.length)
    .join('\n');
}

export async function generate() {
  const parts = [];
  for (const [name, file] of SOURCES) {
    const text = stripGlsl(await readFile(path.join(ROOT, file), 'utf8'));
    if (text.includes('`') || text.includes('${')) throw new Error(`${file}: a backtick or \${ would break the template string`);
    parts.push(`export const ${name} = \`${text}\n\`;`);
  }
  const common = await readFile(path.join(ROOT, 'src/art/hero/common.glsl'), 'utf8');
  const dots = await readFile(path.join(ROOT, 'src/art/hero/dots.glsl'), 'utf8');
  for (const d of ['a', 'b', 'c', 't', 'k']) {
    const text = stripGlsl(common + '\n' + (d === 'b' || d === 't' || d === 'k' ? dots + '\n' : '') + (await readFile(path.join(ROOT, `src/art/hero/${d}.frag.glsl`), 'utf8')));
    if (text.includes('`') || text.includes('${')) throw new Error(`hero/${d}.frag.glsl: a backtick or \${ would break the template string`);
    parts.push(`export const HERO_${d.toUpperCase()} = \`${text}\n\`;`);
  }
  const out = parts.join('\n') + '\n';
  const dest = path.join(ROOT, 'src/art/shaders.gen.js');
  let old = '';
  try { old = await readFile(dest, 'utf8'); } catch {}
  if (old !== out) await writeFile(dest, out, 'utf8');
  return out.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const n = await generate();
  console.log(`src/art/shaders.gen.js: ${n} characters`);
}
