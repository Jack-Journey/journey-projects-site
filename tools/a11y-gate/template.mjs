/**
 * template.mjs — structural template checks over the built pages in out/.
 *
 * Checks (all machine-decidable, low-false-positive, fixable-in-PR — the
 * skills/accessibility §3 governing rule for Tier B):
 *   h1-count       : exactly one <h1> per page (SC 1.3.1 territory; heading
 *                    HIERARCHY judgement stays non-blocking per §3)
 *   title-missing  : <title> present and non-empty (SC 2.4.2)
 *   title-duplicate: non-homepage pages must not carry the homepage's exact
 *                    <title> (the 404-inherits-site-title defect class)
 *   lang-missing   : <html lang> present and non-empty (SC 3.1.1)
 *   main-count     : exactly one <main> landmark
 *   banner-missing / contentinfo-missing : <header> and <footer> present
 *                    (landmark sanity — every page here uses the root layout)
 *
 * aria-hidden h1s do not count toward h1-count (not exposed to AT).
 */

import { parseHtml, walk, attr, findAll, directText } from "./dom.mjs";

function pageTitle(doc) {
  const titles = findAll(doc, "title");
  // first <title> in head order is the one that counts
  return titles.length ? directText(titles[0]).trim() : null;
}

/**
 * Run template checks over one page.
 * homepageTitle: the resolved <title> of index.html (null when grading index itself).
 */
export function checkTemplate(page, html, homepageTitle) {
  const doc = parseHtml(html);
  const findings = [];
  const add = (key, message) =>
    findings.push({ id: `template|${page}|${key}`, check: "template", page, message });

  // h1 count — exclude aria-hidden
  let h1 = 0;
  walk(doc, (n) => {
    if (attr(n, "aria-hidden") === "true") return false;
    if (n.tagName === "h1") h1++;
  });
  if (h1 !== 1) add("h1-count", `page has ${h1} <h1> elements — required exactly 1`);

  // title
  const title = pageTitle(doc);
  if (!title) {
    add("title-missing", "page has no non-empty <title>");
  } else if (homepageTitle !== null && page !== "index.html" && title === homepageTitle) {
    add(
      "title-duplicate-of-homepage",
      `page <title> ("${title}") is identical to the homepage title — does not describe this page`
    );
  }

  // lang
  const htmlEl = findAll(doc, "html")[0];
  const lang = htmlEl ? attr(htmlEl, "lang") : null;
  if (!lang || !lang.trim()) add("lang-missing", "<html> has no lang attribute");

  // landmarks
  const mains = findAll(doc, "main").length;
  if (mains !== 1) add("main-count", `page has ${mains} <main> landmarks — required exactly 1`);
  if (findAll(doc, "header").length === 0) add("banner-missing", "page has no <header> landmark");
  if (findAll(doc, "footer").length === 0) add("contentinfo-missing", "page has no <footer> landmark");

  return findings;
}

export { pageTitle };
