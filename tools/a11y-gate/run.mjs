/**
 * run.mjs — a11y gate runner: build the static export, grade the REAL built
 * output, compare against the baseline, exit red/green.
 *
 * Ratchet semantics (plan amendment A3 — gate-first baselined ratchet):
 *   - every current failure must appear in baseline.json  -> otherwise RED (new defect)
 *   - every baseline entry must still be failing          -> otherwise RED (stale entry:
 *     the defect was fixed, so the SAME PR must remove its baseline entry —
 *     the shrinking baseline is the machine-readable retest ledger)
 *   - green = current failures and baseline entries match exactly
 * Removing a baseline entry while its defect persists therefore lands in the
 * "new defect" arm and goes RED — the per-PR control arm.
 *
 * Usage:
 *   node tools/a11y-gate/run.mjs                 # npm run build, then grade out/
 *   node tools/a11y-gate/run.mjs --skip-build    # grade an existing out/ (control-arm runs)
 *   node tools/a11y-gate/run.mjs --out DIR       # grade a different export dir
 *   node tools/a11y-gate/run.mjs --baseline FILE # grade against a different baseline
 *   node tools/a11y-gate/run.mjs --update-baseline  # rewrite baseline from current
 *        failures (bootstrap/maintenance only — any baseline ADDITION in a PR
 *        diff is a new known defect and must be justified in that PR)
 *
 * Exit codes: 0 green · 1 red · 2 internal/oracle error.
 *
 * External dependencies: parse5 (via dom.mjs). Node >=18.
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { extractCss } from "./css.mjs";
import { checkContrast } from "./contrast.mjs";
import { checkTemplate, pageTitle } from "./template.mjs";
import { parseHtml } from "./dom.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");

// --- CLI ---
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, dflt) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : dflt;
};

const outDir = resolve(repoRoot, opt("--out", "out"));
const baselinePath = resolve(repoRoot, opt("--baseline", join("tools", "a11y-gate", "baseline.json")));

try {
  if (!flag("--skip-build")) {
    console.log("[a11y-gate] building static export (npm run build)...");
    execSync("npm run build", { cwd: repoRoot, stdio: "inherit" });
  }

  if (!existsSync(outDir)) {
    console.error(`[a11y-gate] ERROR: export dir not found: ${outDir}`);
    process.exit(2);
  }

  // --- load corpus ---
  const pages = readdirSync(outDir).filter((f) => f.endsWith(".html")).sort();
  if (pages.length === 0) {
    console.error(`[a11y-gate] ERROR: no HTML pages in ${outDir} — an empty corpus must never read as green`);
    process.exit(2);
  }

  const cssDir = join(outDir, "_next", "static", "css");
  const cssFiles = existsSync(cssDir) ? readdirSync(cssDir).filter((f) => f.endsWith(".css")) : [];
  if (cssFiles.length === 0) {
    console.error("[a11y-gate] ERROR: no built CSS found — the contrast oracle has nothing to derive from");
    process.exit(2);
  }
  const cssText = cssFiles.map((f) => readFileSync(join(cssDir, f), "utf8")).join("\n");
  const oracle = extractCss(cssText);

  // oracle sanity: the neutral ramp must be visible to the parser
  if (!oracle.vars["--color-neutral-400"] || !oracle.classes["text-neutral-400"]) {
    console.error("[a11y-gate] ERROR: oracle failed to extract the neutral ramp from built CSS — refusing to grade blind");
    process.exit(2);
  }

  // --- run checks ---
  const failures = [];
  const errors = [];

  const indexHtml = pages.includes("index.html") ? readFileSync(join(outDir, "index.html"), "utf8") : null;
  const homepageTitle = indexHtml ? pageTitle(parseHtml(indexHtml)) : null;

  for (const page of pages) {
    const html = readFileSync(join(outDir, page), "utf8");

    // blank-page guard (skills/accessibility §3.0: a route that renders nothing
    // returns zero findings and must not read as a pass)
    if (!/<body[\s>]/i.test(html) || html.length < 500) {
      errors.push(`${page}: page is empty or has no <body> — cannot grade`);
      continue;
    }

    const c = checkContrast(page, html, oracle);
    failures.push(...c.findings);
    errors.push(...c.errors);
    failures.push(...checkTemplate(page, html, homepageTitle));
  }

  if (errors.length > 0) {
    console.error("[a11y-gate] ORACLE ERRORS (these are gate bugs or corpus problems, not baselined defects):");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(2);
  }

  // --- baseline ratchet ---
  if (flag("--update-baseline")) {
    const entries = failures.map((f) => ({ id: f.id, note: f.message }));
    writeFileSync(baselinePath, JSON.stringify({ entries }, null, 2) + "\n");
    console.log(`[a11y-gate] baseline rewritten with ${entries.length} entries -> ${baselinePath}`);
    process.exit(0);
  }

  let baseline = { entries: [] };
  if (existsSync(baselinePath)) {
    baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  } else {
    console.error(`[a11y-gate] ERROR: baseline file not found: ${baselinePath}`);
    process.exit(2);
  }

  const baselineIds = new Set(baseline.entries.map((e) => e.id));
  const failureIds = new Set(failures.map((f) => f.id));

  const newFailures = failures.filter((f) => !baselineIds.has(f.id));
  const staleEntries = baseline.entries.filter((e) => !failureIds.has(e.id));
  const knownCount = failures.length - newFailures.length;

  console.log(`[a11y-gate] graded ${pages.length} pages — ${failures.length} failing checks (${knownCount} baselined known defects)`);

  if (newFailures.length === 0 && staleEntries.length === 0) {
    console.log("[a11y-gate] GREEN — no new defects; baseline matches current state exactly");
    process.exit(0);
  }

  if (newFailures.length > 0) {
    console.error(`\n[a11y-gate] RED — ${newFailures.length} defect(s) NOT in baseline (new defect, or a baseline entry was removed while its defect persists):`);
    for (const f of newFailures) {
      console.error(`  ✗ ${f.id}`);
      console.error(`      ${f.message}${f.count > 1 ? ` (${f.count} instances)` : ""}${f.example ? ` — e.g. "${f.example}"` : ""}`);
    }
  }
  if (staleEntries.length > 0) {
    console.error(`\n[a11y-gate] RED — ${staleEntries.length} stale baseline entr(y/ies): defect no longer detected. Remove these from tools/a11y-gate/baseline.json in THIS PR so the ledger stays true:`);
    for (const e of staleEntries) console.error(`  ✗ ${e.id}`);
  }
  process.exit(1);
} catch (err) {
  console.error(`[a11y-gate] INTERNAL ERROR: ${err && err.stack ? err.stack : err}`);
  process.exit(2);
}
