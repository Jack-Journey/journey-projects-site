/**
 * contrast.mjs — usage-derived text/background contrast check (WCAG 2.2 AA,
 * SC 1.4.3: 4.5:1 normal text, 3:1 large text).
 *
 * How it grades: for every element in the built HTML that directly contains
 * visible text, resolve
 *   - effective foreground: nearest self-or-ancestor utility class carrying a
 *     `color` declaration, else the body default (globals.css: neutral-900);
 *     translucent fg is composited over the effective background
 *   - effective background: the ancestor background-color stack composited
 *     outer->inner over the page default (globals.css body: #ffffff), so
 *     translucent layers like bg-white/95 (color-mix in oklab) resolve to the
 *     value a browser actually paints
 *   - size class: nearest font-size/font-weight declarations (base viewport);
 *     large text = >=24px, or >=18.66px at weight >=700 (b/strong count as 700)
 *
 * What it deliberately does NOT grade (documented blind spots, kept for
 * low-false-positive discipline per skills/accessibility §3 governing rule):
 *   - aria-hidden subtrees and .sr-only text (not visually perceived)
 *   - hover/focus states and responsive (@media) overrides — base state only
 *   - text over background-image (none in this codebase's text surfaces)
 *
 * Finding granularity: one finding per (page, fg source, resolved bg, size
 * class). A count rides on the finding for reporting; count changes alone do
 * not flip the gate.
 */

import { parseColor, compositeOver, contrastRatio, toHex } from "./color.mjs";
import { fontSizePx, fontWeightNum } from "./css.mjs";
import { parseHtml, walk, attr, classList, directText } from "./dom.mjs";

const SKIP_TAGS = new Set(["script", "style", "noscript", "title", "svg", "head", "meta", "link"]);

/** Pick the winning declaration for `prop` among an element's class tokens (cascade = CSS order). */
function declFor(node, prop, classes) {
  let best = null;
  for (const cls of classList(node)) {
    const entry = classes[cls];
    if (entry && entry.decls[prop] !== undefined) {
      if (!best || entry.order > best.order) best = { value: entry.decls[prop], order: entry.order, cls };
    }
  }
  return best;
}

/**
 * Run the contrast check over one page.
 * Returns { findings: [...], errors: [...] } — errors are unparseable colours
 * on graded elements (an oracle failure must be loud, never a silent pass).
 */
export function checkContrast(page, html, oracle) {
  const { vars, classes, defaults } = oracle;
  const doc = parseHtml(html);
  const findings = new Map();
  const errors = [];

  const pageDefaultBg = parseColor(defaults["background-color"] || "#ffffff", vars) || { r: 1, g: 1, b: 1, a: 1 };
  const pageDefaultFg = parseColor(defaults["color"] || "#000000", vars) || { r: 0, g: 0, b: 0, a: 1 };

  // stack of inherited state as we walk
  function visit(node, inherited) {
    if (SKIP_TAGS.has(node.tagName)) return;
    if (attr(node, "aria-hidden") === "true") return;
    if (attr(node, "hidden") !== null) return;
    const cl = classList(node);
    if (cl.includes("sr-only")) return; // visually hidden — contrast not applicable

    const state = { ...inherited };

    // background: composite this element's bg (if any) over the running stack
    const bgDecl = declFor(node, "background-color", classes);
    if (bgDecl) {
      const c = parseColor(bgDecl.value, vars);
      if (!c) {
        errors.push(`${page}: unparseable background-color "${bgDecl.value}" on .${bgDecl.cls}`);
      } else {
        state.bg = compositeOver(c, state.bg);
      }
    }

    // foreground: an own color declaration replaces the inherited one
    const fgDecl = declFor(node, "color", classes);
    if (fgDecl) {
      const c = parseColor(fgDecl.value, vars);
      if (!c) {
        errors.push(`${page}: unparseable color "${fgDecl.value}" on .${fgDecl.cls}`);
      } else {
        state.fg = c;
        state.fgSource = fgDecl.cls;
      }
    }

    const fsDecl = declFor(node, "font-size", classes);
    if (fsDecl) {
      const px = fontSizePx(fsDecl.value, vars);
      if (px) state.fontSize = px;
    }
    const fwDecl = declFor(node, "font-weight", classes);
    if (fwDecl) {
      const w = fontWeightNum(fwDecl.value, vars);
      if (w) state.fontWeight = w;
    }
    // preflight: b/strong render bold even with no utility class
    if ((node.tagName === "strong" || node.tagName === "b") && !fwDecl) state.fontWeight = 700;

    // grade direct text
    const text = directText(node).replace(/\s+/g, " ").trim();
    if (text.length > 0) {
      const fg = compositeOver(state.fg, state.bg);
      const ratio = contrastRatio(fg, state.bg);
      const large = state.fontSize >= 24 || (state.fontSize >= 18.66 && state.fontWeight >= 700);
      const threshold = large ? 3.0 : 4.5;
      if (ratio < threshold) {
        const id = `contrast|${page}|${state.fgSource} on ${toHex(state.bg)}|${large ? "large" : "normal"}`;
        const prev = findings.get(id);
        if (prev) {
          prev.count += 1;
        } else {
          findings.set(id, {
            id,
            check: "contrast",
            page,
            message:
              `${state.fgSource} (${toHex(fg)}) on ${toHex(state.bg)} = ` +
              `${ratio.toFixed(2)}:1 — requires ${threshold}:1 (${large ? "large" : "normal"} text)`,
            ratio: Number(ratio.toFixed(2)),
            required: threshold,
            count: 1,
            example: text.slice(0, 60),
          });
        }
      }
    }

    for (const child of node.childNodes || []) {
      if (child.tagName) visit(child, state);
    }
  }

  const start = {
    bg: pageDefaultBg,
    fg: pageDefaultFg,
    fgSource: "body-default",
    fontSize: 16,
    fontWeight: 400,
  };
  walk(doc, (n) => {
    if (n.tagName === "body") {
      visit(n, start);
      return false;
    }
  });

  return { findings: [...findings.values()], errors };
}
