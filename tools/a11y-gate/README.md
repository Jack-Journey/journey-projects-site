# a11y-gate — Tier-B accessibility merge gate

Machine-decidable, low-false-positive, fixable-in-PR accessibility checks over
the **real built output** (`out/`, the Next.js static export), plus a baselined
ratchet so the gate could land *before* the defects it guards were fixed.

Doctrine: `skills/accessibility` §3 (four-tier merge gate) and §3.0 (vacuous-green
battery). Plan: `team/context/a11y-remediation-plan-2026-08-02.md`, amendments
A3 (gate-first baselined ratchet), A4 (usage-derived contrast oracle), A5 (PR-A scope).

## What runs

| Check | What it grades | WCAG |
|---|---|---|
| contrast | Every text/background combo actually occurring in the built HTML, colors resolved from the built CSS (hex, rgb, **oklab**, **oklch**, `color-mix(in oklab, …)`, `var()` chains, alpha composited through the ancestor stack). 4.5:1 normal / 3:1 large (≥24px, or ≥18.66px at weight ≥700). | 1.4.3 |
| template / h1-count | Exactly one `<h1>` per page (aria-hidden excluded) | 1.3.1 |
| template / title | `<title>` present, non-empty, and not a duplicate of the homepage title on non-homepage pages | 2.4.2 |
| template / lang | `<html lang>` present, non-empty | 3.1.1 |
| template / landmarks | Exactly one `<main>`; `<header>` and `<footer>` present | 1.3.1 |
| jsx-a11y subset | Enumerated error-level rule IDs in `eslint.config.mjs` (invoked via `npm run lint:a11y`, separate from this script) | various |

**Why usage-derived:** the theme is an 11-step neutral ramp with no token pair
table. A gate that validates a *declared* pair table passes trivially by
omission (vacuous-green class). This oracle derives from what Tailwind emitted
and what the pages actually use — a new bad combo anywhere in the DOM goes RED.

**Why explicit oklab handling:** Chrome/Tailwind v4 emit `oklab()`/`color-mix(in oklab, …)`;
a naive sRGB parse reads oklab channels as RGB and resolves white to near-black
(this produced two false findings in the 2026-08-02 conformance review before
the instrument was corrected). `color.mjs` converts explicitly.

## Ratchet semantics (amendment A3)

`baseline.json` lists today's known defects, each mapped to its conformance-review
finding ID. The gate is:

- **GREEN** — current failures and baseline entries match exactly
- **RED** — a failure not in the baseline (new defect, **or** a baseline entry
  was removed while its defect persists — the per-PR control arm)
- **RED** — a baseline entry whose defect is no longer detected (the fixing PR
  must remove its entries in the same PR, so the shrinking baseline stays a
  true machine-readable retest ledger)

Baseline **additions** in any PR diff are new known defects and must be
justified in that PR. `--update-baseline` exists for bootstrap/maintenance;
review the diff it produces, never trust it blind.

## Usage

```
npm run a11y:gate                              # build + grade (what CI runs)
node tools/a11y-gate/run.mjs --skip-build      # grade existing out/
node tools/a11y-gate/run.mjs --out DIR         # grade a mutated copy (control-arm runs)
node tools/a11y-gate/run.mjs --baseline FILE   # alternative baseline (control-arm runs)
```

Exit codes: `0` green · `1` red · `2` oracle/internal error (an unparseable
color or empty corpus is loud, never a silent pass).

## Known blind spots (documented, deliberate — low-FP discipline)

- Base viewport only: `@media` overrides (responsive size bumps, `hover:`)
  are not graded; ignoring size bumps applies the *stricter* threshold.
- `aria-hidden` subtrees and `.sr-only` text are not graded (not visually perceived).
- Text over `background-image` is not graded (no such text surface in this codebase).
- Alt-text *quality*, heading *hierarchy*, focus order: judgement calls,
  non-blocking by doctrine (§3 "must NOT block") — they live in review, not CI.
