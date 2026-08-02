/**
 * color.mjs — colour parsing, colour-space conversion, and WCAG contrast math
 * for the a11y gate.
 *
 * Purpose: convert every colour form that appears in the built CSS into sRGB
 * so contrast ratios are computed on real values. Chrome and Tailwind v4 emit
 * oklab()/oklch() and color-mix(in oklab, ...) — a naive parser that reads
 * oklab channels as sRGB components resolves white to near-black (this exact
 * failure produced two false findings in the 2026-08-02 conformance review,
 * §1 "A note on the instrument"). The oklab path here is explicit and is
 * exercised by the control-arm battery.
 *
 * Key exports:
 *   parseColor(str, vars)  -> { r, g, b, a } in sRGB, channels 0..1, or null
 *   compositeOver(fg, bg)  -> opaque sRGB colour (fg alpha-composited over bg)
 *   contrastRatio(c1, c2)  -> WCAG 2.x contrast ratio (both must be opaque)
 *   toHex(c)               -> "#rrggbb" for reporting
 *
 * External dependencies: none.
 */

/** Resolve var(--x) / var(--x, fallback) references against a custom-property map. */
function resolveVars(str, vars, depth = 0) {
  if (depth > 8) return str; // cycle guard
  const m = str.match(/var\((--[a-zA-Z0-9-]+)\s*(?:,\s*([^)]+))?\)/);
  if (!m) return str;
  const val = vars[m[1]] !== undefined ? vars[m[1]] : (m[2] !== undefined ? m[2] : "");
  return resolveVars(str.replace(m[0], val.trim()), vars, depth + 1);
}

/** Parse a number token that may be a percentage; pctScale = value that 100% maps to. */
function num(tok, pctScale = 1) {
  tok = tok.trim();
  if (tok.endsWith("%")) return (parseFloat(tok) / 100) * pctScale;
  return parseFloat(tok);
}

/** Split "L a b / alpha"-style function arguments into channel tokens + alpha. */
function splitChannels(body) {
  let alpha = 1;
  const slash = body.indexOf("/");
  if (slash !== -1) {
    alpha = num(body.slice(slash + 1), 1);
    body = body.slice(0, slash);
  }
  const parts = body.trim().split(/[\s,]+/).filter(Boolean);
  return { parts, alpha };
}

const clamp01 = (x) => Math.min(1, Math.max(0, x));

/** Linear-light value -> gamma-encoded sRGB channel. */
function gammaEncode(c) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/**
 * oklab -> sRGB (Björn Ottosson's reference matrices).
 * Input: L (0..1), a, b. Output: sRGB channels 0..1, clamped to gamut.
 */
function oklabToSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return {
    r: clamp01(gammaEncode(rLin)),
    g: clamp01(gammaEncode(gLin)),
    b: clamp01(gammaEncode(bLin)),
  };
}

/** sRGB -> oklab, used by colorMix so mixing happens in the space the CSS names. */
function srgbToOklab({ r, g, b }) {
  const dec = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rl = dec(r), gl = dec(g), bl = dec(b);
  const l = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl);
  const m = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl);
  const s = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

const NAMED = {
  white: { r: 1, g: 1, b: 1, a: 1 },
  black: { r: 0, g: 0, b: 0, a: 1 },
  transparent: { r: 0, g: 0, b: 0, a: 0 },
};

/**
 * Parse a CSS colour string into { r, g, b, a } (sRGB, 0..1).
 * Handles: #hex (3/4/6/8), rgb()/rgba(), oklab(), oklch(),
 * color-mix(in oklab|oklch, A p%, B q%), named white/black/transparent,
 * and var() references resolved against `vars`.
 * Returns null for anything it cannot resolve (caller decides how to react —
 * the gate treats an unparseable colour on a graded element as an error, not
 * a silent pass).
 */
export function parseColor(input, vars = {}) {
  if (!input) return null;
  let str = resolveVars(String(input).trim(), vars).trim().toLowerCase();

  if (NAMED[str]) return { ...NAMED[str] };

  // #hex forms
  let m = str.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    const h = m[1];
    const from = (s) => parseInt(s, 16);
    if (h.length === 3 || h.length === 4) {
      return {
        r: from(h[0] + h[0]) / 255,
        g: from(h[1] + h[1]) / 255,
        b: from(h[2] + h[2]) / 255,
        a: h.length === 4 ? from(h[3] + h[3]) / 255 : 1,
      };
    }
    if (h.length === 6 || h.length === 8) {
      return {
        r: from(h.slice(0, 2)) / 255,
        g: from(h.slice(2, 4)) / 255,
        b: from(h.slice(4, 6)) / 255,
        a: h.length === 8 ? from(h.slice(6, 8)) / 255 : 1,
      };
    }
    return null;
  }

  // rgb() / rgba()
  m = str.match(/^rgba?\((.+)\)$/);
  if (m) {
    const { parts, alpha } = splitChannels(m[1]);
    if (parts.length < 3) return null;
    let a = alpha;
    if (parts.length === 4) a = num(parts[3], 1); // legacy comma form
    // num() with pctScale 255 maps both "128" and "50%" onto the 0..255 scale
    return {
      r: clamp01(num(parts[0], 255) / 255),
      g: clamp01(num(parts[1], 255) / 255),
      b: clamp01(num(parts[2], 255) / 255),
      a,
    };
  }

  // oklab(L a b [/ alpha]) — L may be % (100% -> 1); a/b % maps to ±0.4
  m = str.match(/^oklab\((.+)\)$/);
  if (m) {
    const { parts, alpha } = splitChannels(m[1]);
    if (parts.length < 3) return null;
    const L = num(parts[0], 1);
    const a = parts[1].includes("%") ? num(parts[1], 0.4) : parseFloat(parts[1]);
    const b = parts[2].includes("%") ? num(parts[2], 0.4) : parseFloat(parts[2]);
    return { ...oklabToSrgb(L, a, b), a: alpha };
  }

  // oklch(L C H [/ alpha]) — C % maps to 0.4; H in degrees
  m = str.match(/^oklch\((.+)\)$/);
  if (m) {
    const { parts, alpha } = splitChannels(m[1]);
    if (parts.length < 3) return null;
    const L = num(parts[0], 1);
    const C = parts[1].includes("%") ? num(parts[1], 0.4) : parseFloat(parts[1]);
    const H = (parseFloat(parts[2]) * Math.PI) / 180;
    return { ...oklabToSrgb(L, C * Math.cos(H), C * Math.sin(H)), a: alpha };
  }

  // color-mix(in oklab|oklch, A [p%], B [q%]) — premultiplied-alpha mix per spec
  m = str.match(/^color-mix\(in\s+(oklab|oklch)\s*,(.+)\)$/);
  if (m) {
    const args = splitTopLevel(m[2]);
    if (args.length !== 2) return null;
    const parseArg = (arg) => {
      const pm = arg.trim().match(/^(.*?)\s+([\d.]+%)$/);
      return pm
        ? { color: parseColor(pm[1], vars), w: parseFloat(pm[2]) / 100 }
        : { color: parseColor(arg.trim(), vars), w: null };
    };
    const A = parseArg(args[0]);
    const B = parseArg(args[1]);
    if (!A.color || !B.color) return null;
    if (A.w === null && B.w === null) { A.w = 0.5; B.w = 0.5; }
    else if (A.w === null) A.w = 1 - B.w;
    else if (B.w === null) B.w = 1 - A.w;
    const wSum = A.w + B.w || 1;
    const w1 = A.w / wSum, w2 = B.w / wSum;
    const la = srgbToOklab(A.color), lb = srgbToOklab(B.color);
    const aOut = A.color.a * w1 + B.color.a * w2;
    if (aOut === 0) return { r: 0, g: 0, b: 0, a: 0 };
    // premultiply channels by their alpha, mix, then un-premultiply
    const mix = (x, y) => (x * A.color.a * w1 + y * B.color.a * w2) / aOut;
    const rgb = oklabToSrgb(mix(la.L, lb.L), mix(la.a, lb.a), mix(la.b, lb.b));
    return { ...rgb, a: aOut };
  }

  return null;
}

/** Split a comma-separated argument list, respecting nested parentheses. */
function splitTopLevel(s) {
  const out = [];
  let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

/** Composite a (possibly translucent) colour over an opaque background. */
export function compositeOver(fg, bg) {
  if (fg.a >= 1) return { r: fg.r, g: fg.g, b: fg.b, a: 1 };
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

/** WCAG 2.x relative luminance of an opaque sRGB colour. */
function luminance({ r, g, b }) {
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG 2.x contrast ratio between two opaque colours. */
export function contrastRatio(c1, c2) {
  const l1 = luminance(c1), l2 = luminance(c2);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** "#rrggbb" for reporting. */
export function toHex({ r, g, b }) {
  const h = (c) => Math.round(clamp01(c) * 255).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}
