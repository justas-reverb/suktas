/**
 * The WebGL2 side of the art: compile the scene shader, upload a scene, draw it.
 *
 * It never reads a pixel back (no readPixels, no toDataURL: tools/check-privacy.mjs and
 * tools/shoot.mjs both watch for that) and it fetches nothing. It is shared by the live
 * hero (hero.js) and by the paint pages that render the stills (tools/paint/).
 *
 * Two ways to start it:
 *
 *   createEngine(canvas)                     compiles at once and is ready to draw. The paint pages
 *                                            use this, where waiting costs nobody anything.
 *   createEngine(canvas, { pending: true })  hands the shader to the driver and returns at once.
 *                                            With KHR_parallel_shader_compile the page is not
 *                                            held while the driver works (79 ms on the RTX 5080,
 *                                            several times that on a weak laptop). Poll ready(),
 *                                            then call finish(). Without the extension ready() is
 *                                            true at once and finish() waits, as before.
 *
 * The context is asked for with failIfMajorPerformanceCaveat, so a machine whose WebGL is only
 * the CPU's software renderer gets null and the painted still stays, instead of a page that
 * hangs. The renderer is never read to find that out: reading it is fingerprinting.
 */
import { VERT, FRAG } from './shaders.gen.js';
import { hexToLinear } from './presets.js';

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

function mustCompile(gl, sh) {
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) || 'no log';
    gl.deleteShader(sh);
    throw new Error('shader: ' + log);
  }
}

/** Returns null when WebGL2 is not there (LibreWolf, Tor Browser on Safest, an old phone) or is only software. */
export function createEngine(canvas, { lite = false, pending = false } = {}) {
  const gl = canvas.getContext('webgl2', {
    alpha: false, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'default',
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;

  const parallel = pending ? gl.getExtension('KHR_parallel_shader_compile') : null;
  const fragSrc = lite ? FRAG.replace('\n', '\n#define LITE 1\n') : FRAG;
  const prog = gl.createProgram();
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  const loc = {};
  const ptr = new Float32Array(12 * 4);
  let vao = null;
  let usable = false;

  const eng = {
    gl,
    lite,
    get usable() { return usable; },
    lost: () => gl.isContextLost(),

    /** True once the driver has finished compiling and linking (always true without the extension). */
    ready() {
      return !parallel || gl.isContextLost() || !!gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR);
    },

    /** Checks the compile and the link, and gets the program ready to draw. Throws if either failed. */
    finish() {
      if (usable) return;
      mustCompile(gl, vs);
      mustCompile(gl, fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link: ' + gl.getProgramInfoLog(prog));
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.useProgram(prog);
      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      for (const name of ['uRes', 'uTime', 'uCam', 'uSun', 'uFx', 'uTrail', 'uTrail2', 'uTree', 'uPrint', 'uComp', 'uMist', 'uPal', 'uPtr', 'uBg', 'uTop', 'uXtra', 'uFlat']) {
        loc[name] = gl.getUniformLocation(prog, name);
      }
      usable = true;
    },

    /** Sets the drawing-buffer size; the caller owns the canvas's CSS size. */
    resize(w, h) {
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(loc.uRes, w, h);
    },

    /** Uploads everything that does not change from frame to frame. */
    setScene(sc) {
      gl.uniform4fv(loc.uCam, sc.cam.length === 4 ? sc.cam : [...sc.cam, 0]);
      gl.uniform4fv(loc.uSun, sc.sun);
      gl.uniform4fv(loc.uFx, sc.fx);
      gl.uniform4fv(loc.uTrail, sc.trail);
      gl.uniform4fv(loc.uTrail2, sc.trail2);
      gl.uniform4fv(loc.uTree, sc.tree);
      gl.uniform4fv(loc.uPrint, sc.print);
      gl.uniform4fv(loc.uComp, sc.comp);
      gl.uniform4fv(loc.uMist, sc.mist);
      gl.uniform3fv(loc.uPal, sc.pal);
      gl.uniform3fv(loc.uBg, hexToSrgb(sc.bg));
      gl.uniform4fv(loc.uTop, sc.top ? [...hexToSrgb(sc.top[0]), sc.top[1]] : [0, 0, 0, 0]);
      gl.uniform4fv(loc.uXtra, sc.xtra);
      gl.uniform1f(loc.uFlat, sc.flat);
    },

    /** wipes: up to 12 [groundX, groundZ, strength 0..1, radiusMetres] */
    draw(time, wipes) {
      gl.uniform1f(loc.uTime, time);
      ptr.fill(0);
      if (wipes) for (let i = 0; i < Math.min(12, wipes.length); i++) ptr.set(wipes[i], i * 4);
      gl.uniform4fv(loc.uPtr, ptr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    dispose() {
      gl.deleteProgram(prog);
      if (vao) gl.deleteVertexArray(vao);
    },
  };

  if (!parallel) eng.finish();
  return eng;
}

function hexToSrgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
