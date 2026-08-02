/**
 * css.mjs — extracts the usage oracle from the BUILT stylesheet(s) in out/.
 *
 * Purpose: the jp-site theme is an 11-step neutral ramp in app/globals.css with
 * no token pair table, so the contrast oracle derives from what Tailwind
 * actually emitted: custom-property definitions plus a map of
 * single-class utility selectors -> the declarations the gate grades
 * (color, background-color, font-size, font-weight).
 *
 * Context handling (mirrors a modern browser at the BASE viewport):
 *   - descend into @layer and @supports blocks (both apply; the @supports
 *     color-mix() branch is what a current Chrome uses, so its declarations
 *     override the hex fallbacks exactly as they do live)
 *   - skip @media blocks entirely: grading is mobile-first/base-viewport.
 *     Responsive font-size bumps (md:text-3xl) are ignored, which is the
 *     CONSERVATIVE direction — smaller assumed text means the stricter 4.5:1
 *     threshold applies.
 *   - only selectors that are exactly one class with no combinators or
 *     pseudo-classes are mapped; hover:/focus: variants (.hover\:x:hover)
 *     drop out automatically, so transient states are not graded.
 *
 * Key exports:
 *   extractCss(cssText) -> { vars, classes, defaults }
 *     vars     : { "--color-neutral-400": "#a3a3a3", ... }
 *     classes  : { "text-neutral-400": { decls: {color: "..."}, order: N } }
 *     defaults : body-level { color, backgroundColor, fontSize } strings
 *
 * External dependencies: none (hand-rolled scanner; the built CSS is a single
 * minified file, not arbitrary authored CSS).
 */

/** Unescape CSS identifier escapes we meet in Tailwind class selectors (\/ \: \. \[ \] etc.). */
function unescapeClass(s) {
  return s.replace(/\\([^a-fA-F0-9])/g, "$1").replace(/\\([0-9a-fA-F]{1,6})\s?/g, (m, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  );
}

/** Parse "prop:val;prop:val" into an object (last write wins). */
function parseDecls(body) {
  const out = {};
  let depth = 0, cur = "";
  const decls = [];
  for (const ch of body) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) { decls.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) decls.push(cur);
  for (const d of decls) {
    const idx = d.indexOf(":");
    if (idx === -1) continue;
    const prop = d.slice(0, idx).trim().toLowerCase();
    const val = d.slice(idx + 1).trim();
    if (prop) out[prop] = val;
  }
  return out;
}

const GRADED_PROPS = ["color", "background-color", "font-size", "font-weight"];

/**
 * Scan the built CSS. Tracks at-rule context with a small state stack rather
 * than a full CSS parser — sufficient and dependency-free for Tailwind output.
 */
export function extractCss(cssText) {
  const vars = {};
  const classes = {};
  const defaults = {};
  let order = 0;

  // context stack entries: "layer" | "supports" | "media" | "rule"
  const stack = [];
  let i = 0;
  const n = cssText.length;
  let buf = "";

  const inSkippedMedia = () => stack.includes("media");

  const handleRule = (selectorText, body) => {
    if (inSkippedMedia()) return;
    const decls = parseDecls(body);

    // collect custom-property definitions from any rule (":root,:host", "@layer theme", etc.)
    for (const [prop, val] of Object.entries(decls)) {
      if (prop.startsWith("--")) vars[prop] = val;
    }

    const selectors = selectorText.split(",").map((s) => s.trim());
    for (const sel of selectors) {
      // body/html defaults (globals.css sets body color + background-color)
      if (sel === "body" || sel === "html" || sel === "html,body") {
        for (const p of GRADED_PROPS) {
          if (decls[p] !== undefined) defaults[p] = decls[p];
        }
        continue;
      }
      // single-class selectors only: ".foo" with no combinator/pseudo/attr tail
      const m = sel.match(/^\.((?:\\.|[^\s.:>+~[\]()])+)$/);
      if (!m) continue;
      const cls = unescapeClass(m[1]);
      const graded = {};
      for (const p of GRADED_PROPS) {
        if (decls[p] !== undefined) graded[p] = decls[p];
      }
      if (Object.keys(graded).length === 0) continue;
      if (!classes[cls]) classes[cls] = { decls: {}, order: 0 };
      Object.assign(classes[cls].decls, graded);
      classes[cls].order = ++order; // later stylesheet position wins ties (cascade)
    }
  };

  while (i < n) {
    const ch = cssText[i];
    if (ch === "@") {
      // read at-rule prelude up to '{' or ';'
      let j = i;
      while (j < n && cssText[j] !== "{" && cssText[j] !== ";") j++;
      const prelude = cssText.slice(i, j);
      if (cssText[j] === ";") { i = j + 1; buf = ""; continue; } // e.g. @import, @layer statement
      if (/^@media/i.test(prelude)) stack.push("media");
      else if (/^@supports/i.test(prelude)) stack.push("supports");
      else if (/^@layer/i.test(prelude)) stack.push("layer");
      else stack.push("atrule-opaque"); // @keyframes, @font-face, @property — contents not graded
      i = j + 1;
      buf = "";
      continue;
    }
    if (ch === "{") {
      // style rule: buf holds the selector; find matching close brace (no nesting in Tailwind output style rules)
      const selector = buf.trim();
      let j = i + 1, depth = 1;
      while (j < n && depth > 0) {
        if (cssText[j] === "{") depth++;
        else if (cssText[j] === "}") depth--;
        j++;
      }
      const body = cssText.slice(i + 1, j - 1);
      if (stack[stack.length - 1] !== "atrule-opaque" && !body.includes("{")) {
        handleRule(selector, body);
      }
      i = j;
      buf = "";
      continue;
    }
    if (ch === "}") {
      // closes an at-rule block
      stack.pop();
      i++;
      buf = "";
      continue;
    }
    buf += ch;
    i++;
  }

  return { vars, classes, defaults };
}

/** Convert a font-size declaration value to px (rem*16, px passthrough), resolving vars. */
export function fontSizePx(value, vars) {
  if (!value) return null;
  let v = value.trim();
  for (let d = 0; d < 8; d++) {
    const m = v.match(/var\((--[a-zA-Z0-9-]+)\s*(?:,\s*([^)]+))?\)/);
    if (!m) break;
    v = v.replace(m[0], vars[m[1]] !== undefined ? vars[m[1]] : (m[2] || "")).trim();
  }
  let m = v.match(/^([\d.]+)rem$/);
  if (m) return parseFloat(m[1]) * 16;
  m = v.match(/^([\d.]+)px$/);
  if (m) return parseFloat(m[1]);
  m = v.match(/^([\d.]+)em$/);
  if (m) return parseFloat(m[1]) * 16; // approximation: em vs root — not used by Tailwind sizes
  return null;
}

/** Convert a font-weight declaration value to a number, resolving vars. */
export function fontWeightNum(value, vars) {
  if (!value) return null;
  let v = value.trim();
  for (let d = 0; d < 8; d++) {
    const m = v.match(/var\((--[a-zA-Z0-9-]+)\s*(?:,\s*([^)]+))?\)/);
    if (!m) break;
    v = v.replace(m[0], vars[m[1]] !== undefined ? vars[m[1]] : (m[2] || "")).trim();
  }
  if (/^\d+$/.test(v)) return parseInt(v, 10);
  if (v === "bold") return 700;
  if (v === "normal") return 400;
  return null;
}
