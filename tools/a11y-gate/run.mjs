/**
 * run.mjs — a11y gate runner: build the static export, grade the REAL built
 * output, compare against the baseline, exit red/green.
 *
 * Ratchet semantics (plan amendment A3 — gate-first baselined ratchet):
 *   - every current failure must appear in baseline.json  -> otherwise RED (new defect)
 *   - every baseline entry must still be failing          -> otherwise RED (stale entry:
 *     the defect was fixed, so the SAME PR must remove its baseline entry —
 *     the shrinking baseline is the machine-readable retest ledger)
 *   - a baselined contrast defect must not WORSEN beyond its recorded ratio
 *     (magnitude guard, BT F2)                            -> otherwise RED
 *   - a baselined contrast defect must not grow NEW INSTANCES beyond its
 *     recorded count (instance ceiling, SD-4)             -> otherwise RED
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
import { join, dirname, resolve, relative } from "node:path";
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

  // --- load corpus (RECURSIVE: nested routes must not silently drop out of
  // coverage if trailingSlash flips or a new route nests — DI F2 / BT F1;
  // must hold before PR-D adds a route) ---
  const listHtml = (dir) => {
    const found = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "_next") continue; // build assets, never pages
      const full = join(dir, entry.name);
      if (entry.isDirectory()) found.push(...listHtml(full));
      else if (entry.name.endsWith(".html")) found.push(relative(outDir, full));
    }
    return found;
  };
  const pages = listHtml(outDir).sort();
  if (pages.length === 0) {
    console.error(`[a11y-gate] ERROR: no HTML pages in ${outDir} — an empty corpus must never read as green`);
    process.exit(2);
  }

  const cssDir = join(outDir, "_next", "static", "css");
  // sorted for deterministic concat order (DI F3)
  const cssFiles = existsSync(cssDir) ? readdirSync(cssDir).filter((f) => f.endsWith(".css")).sort() : [];
  if (cssFiles.length === 0) {
    console.error("[a11y-gate] ERROR: no built CSS found — the contrast oracle has nothing to derive from");
    process.exit(2);
  }
  const cssText = cssFiles.map((f) => readFileSync(join(cssDir, f), "utf8")).join("\n");
  const oracle = extractCss(cssText);

  // --- instrument check (SD-1): a synthetic fixture with a known-bad and a
  // known-good pair runs through the FULL pipeline (extractCss -> var
  // resolution -> color-mix-in-oklab parse -> DOM walk -> compositing ->
  // thresholds) before any real grading is trusted. Forward-proof: depends on
  // no live class (the previous "does text-neutral-400 exist" probe was
  // self-satisfying while any file kept the literal in the Tailwind census,
  // and a forward-block once remediation deleted the class), and it can
  // actually FAIL: any pipeline break changes the graded result.
  const CANARY_CSS =
    ":root{--canary-bad:#a3a3a3;--canary-good:#525252;--canary-white:#fff}" +
    ".canary-bad{color:var(--canary-bad)}.canary-good{color:var(--canary-good)}" +
    ".canary-bg{background-color:color-mix(in oklab,var(--canary-white) 95%,transparent)}";
  const CANARY_HTML =
    '<!DOCTYPE html><html lang="en"><head><title>canary</title></head><body>' +
    '<div class="canary-bg"><p class="canary-bad">known-bad pair</p>' +
    '<p class="canary-good">known-good pair</p></div></body></html>';
  const canary = checkContrast("__canary__", CANARY_HTML, extractCss(CANARY_CSS));
  const canaryBad = canary.findings.find((f) => f.id.includes("canary-bad"));
  const canaryOk =
    canary.errors.length === 0 &&
    canary.findings.length === 1 &&
    canaryBad !== undefined &&
    Math.abs(canaryBad.ratio - 2.52) < 0.01;
  if (!canaryOk) {
    console.error(
      "[a11y-gate] ERROR: instrument check FAILED — the contrast pipeline did not grade the synthetic fixture to its known values (expected exactly one failing pair: canary-bad at 2.52:1). Refusing to grade blind."
    );
    console.error(
      `  got: ${canary.findings.length} finding(s) [${canary.findings.map((f) => `${f.id} @ ${f.ratio}`).join(", ") || "none"}], ${canary.errors.length} error(s)`
    );
    process.exit(2);
  }

  // real-oracle blindness guard: a built CSS with zero color-bearing utility
  // classes means every element would grade against defaults — loud, never silent
  if (Object.values(oracle.classes).filter((c) => c.decls["color"] !== undefined).length === 0) {
    console.error("[a11y-gate] ERROR: built CSS yielded zero color-bearing utility classes — oracle is blind, refusing to grade");
    process.exit(2);
  }

  // --- run checks ---
  const failures = [];
  const advisories = [];
  const errors = [];
  let gradedTotal = 0;

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
    gradedTotal += c.graded;
    failures.push(...c.findings);
    errors.push(...c.errors);
    const t = checkTemplate(page, html, homepageTitle);
    failures.push(...t.findings);
    advisories.push(...t.advisories);
  }

  if (errors.length > 0) {
    console.error("[a11y-gate] ORACLE ERRORS (these are gate bugs or corpus problems, not baselined defects):");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(2);
  }

  if (gradedTotal === 0) {
    console.error("[a11y-gate] ERROR: zero text elements graded across the whole corpus — a census that sees nothing must not read as green");
    process.exit(2);
  }

  // advisory channel — REPORTED, never blocking (skills/accessibility §3:
  // heading-hierarchy judgement is on the must-NOT-block list)
  if (advisories.length > 0) {
    console.log(`[a11y-gate] ${advisories.length} advisory note(s) — non-blocking:`);
    for (const a of advisories) console.log(`  • ${a.id}: ${a.message}`);
  }

  // --- baseline ratchet ---
  if (flag("--update-baseline")) {
    // merge-preserve (DI F1): regen must never destroy the finding-ID mapping
    // or the file comment — they are what makes the baseline a retest ledger
    // rather than a suppression list. Retained ids keep every existing field;
    // note + measured ratio refresh; new ids get a loud UNMAPPED placeholder.
    let prev = { entries: [] };
    if (existsSync(baselinePath)) {
      try {
        prev = JSON.parse(readFileSync(baselinePath, "utf8"));
      } catch {
        /* corrupt baseline: rebuild from scratch, diff review catches it */
      }
    }
    const prevById = new Map((prev.entries || []).map((e) => [e.id, e]));
    const entries = failures.map((f) => {
      const old = prevById.get(f.id) || {
        id: f.id,
        finding: "UNMAPPED — map to a conformance-review finding ID before committing",
      };
      const next = { ...old, note: f.message };
      if (f.ratio !== undefined) next.ratio = f.ratio;
      if (f.count !== undefined) next.count = f.count; // instance-count ceiling (SD-4)
      return next;
    });
    const doc = { ...(prev.comment !== undefined ? { comment: prev.comment } : {}), entries };
    writeFileSync(baselinePath, JSON.stringify(doc, null, 2) + "\n");
    const unmapped = entries.filter((e) => String(e.finding || "").startsWith("UNMAPPED")).length;
    console.log(`[a11y-gate] baseline rewritten with ${entries.length} entries (${unmapped} unmapped) -> ${baselinePath}`);
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

  // magnitude guard (BT F2): the ratchet keys on entry IDENTITY, so without
  // this a baselined 2.52:1 defect could silently degrade to 1.34:1 and stay
  // green. Baseline contrast entries carry their measured ratio; a current
  // measurement worse than recorded (beyond a small tolerance) goes RED.
  const WORSEN_TOLERANCE = 0.1;
  const failureById = new Map(failures.map((f) => [f.id, f]));
  const worsened = baseline.entries.filter((e) => {
    if (e.ratio === undefined) return false;
    const f = failureById.get(e.id);
    return f && f.ratio !== undefined && f.ratio < e.ratio - WORSEN_TOLERANCE;
  });

  // instance-count ceiling (SD-4): the ratchet keys on tuple identity, so
  // without this a genuinely NEW instance of a baselined (class, bg, page)
  // tuple would hide under the existing entry and stay green.
  const exceeded = baseline.entries.filter((e) => {
    if (e.count === undefined) return false;
    const f = failureById.get(e.id);
    return f && f.count !== undefined && f.count > e.count;
  });

  console.log(`[a11y-gate] graded ${pages.length} pages — ${failures.length} failing checks (${knownCount} baselined known defects)`);

  if (newFailures.length === 0 && staleEntries.length === 0 && worsened.length === 0 && exceeded.length === 0) {
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
  if (worsened.length > 0) {
    console.error(`\n[a11y-gate] RED — ${worsened.length} baselined defect(s) WORSENED beyond the recorded measurement (a known defect must not degrade under cover of its baseline entry):`);
    for (const e of worsened) {
      const f = failureById.get(e.id);
      console.error(`  ✗ ${e.id}`);
      console.error(`      baselined at ${e.ratio}:1, now measures ${f.ratio}:1`);
    }
  }
  if (exceeded.length > 0) {
    console.error(`\n[a11y-gate] RED — ${exceeded.length} baselined defect(s) grew NEW INSTANCES beyond the recorded count (a new instance of a known defect class is a new defect):`);
    for (const e of exceeded) {
      const f = failureById.get(e.id);
      console.error(`  ✗ ${e.id}`);
      console.error(`      baselined at ${e.count} instance(s), now ${f.count}`);
    }
  }
  process.exit(1);
} catch (err) {
  console.error(`[a11y-gate] INTERNAL ERROR: ${err && err.stack ? err.stack : err}`);
  process.exit(2);
}
