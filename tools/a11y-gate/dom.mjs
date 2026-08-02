/**
 * dom.mjs — parse5 traversal helpers for the a11y gate.
 *
 * Purpose: one place that knows the parse5 node shape, so the checks read as
 * intent. Grading works on the SERVED static HTML in out/ — a real-DOM corpus
 * that the static export gives us for free.
 *
 * Key exports:
 *   parseHtml(html)          -> parse5 document
 *   walk(node, fn)           -> depth-first visit of element nodes; fn may
 *                               return false to skip a subtree
 *   attr(node, name)         -> attribute value or null
 *   classList(node)          -> array of class tokens
 *   directText(node)         -> concatenated direct child text (not descendants)
 *   findAll(doc, tagName)    -> all element nodes with that tag
 *
 * External dependencies: parse5 (exact-pinned devDependency; no install scripts).
 */

import { parse } from "parse5";

export function parseHtml(html) {
  return parse(html);
}

export function attr(node, name) {
  if (!node.attrs) return null;
  const a = node.attrs.find((x) => x.name === name);
  return a ? a.value : null;
}

export function classList(node) {
  const c = attr(node, "class");
  return c ? c.split(/\s+/).filter(Boolean) : [];
}

/** Depth-first walk over ELEMENT nodes. Visitor returns false to prune the subtree. */
export function walk(node, fn) {
  if (node.tagName) {
    if (fn(node) === false) return;
  }
  const kids = node.childNodes || [];
  for (const child of kids) {
    // template elements keep children under .content
    if (child.tagName === "template" && child.content) {
      walk(child.content, fn);
      continue;
    }
    walk(child, fn);
  }
}

/** Direct child text nodes only (descendant elements carry their own text). */
export function directText(node) {
  let out = "";
  for (const child of node.childNodes || []) {
    if (child.nodeName === "#text") out += child.value;
  }
  return out;
}

export function findAll(doc, tagName) {
  const out = [];
  walk(doc, (n) => {
    if (n.tagName === tagName) out.push(n);
  });
  return out;
}
