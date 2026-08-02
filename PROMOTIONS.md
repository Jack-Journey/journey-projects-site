# Promotion log

Newest first. Each entry = one dev → main sweep.

| Date | Tag | Cards | PRs | Cohort size | Notes |
|---|---|---|---|---|---|
| 2026-08-02 | live-2026-08-02-02 | JPT #916, #917 | #10, #11, #16 | 3 | **Accessibility cohort.** WCAG 2.2 AA conformance review of the live site (10 findings: 1 serious / 4 moderate / 3 minor / 2 to-verify) → ruled remediation plan → hero-6 gated → shipped. PR #11 Tier-B a11y gate (usage-derived contrast oracle, template checks, enumerated jsx-a11y subset, baselined ratchet + the repo's first CI). PR #10 the fix set — `neutral-400` retired as a text colour site-wide (2.52:1 → 7.81:1, the only Serious finding, cleared by one token), homepage `h1`, distinct 404 title, back control → link semantics, scroll offset; baseline emptied 22 → 0 with a three-arm ratchet demo. PR #16 back-nav refinements (Jack rulings: hide the prefix visually keep it announced · `/qr` arrow-only bar · suppress the `/qr` footer self-link) + the SC 1.4.4 text-zoom fix and a root-layout crash guard the amend gate caught. 23 lens reviews across the three PRs, 0 NO-GO at merge. Retest ledger: 5 fixed / 1 partial / 0 regressed / 0 new. No conformance claim — method-limited review, no AT or keyboard hardware. |
| 2026-08-02 | live-2026-08-02-01 | JPT #181, #182 | #7, #8, #9, #12 | 2 | First feature cohort. `/qr` static QR page (#181/PR #7) + JP favicon/icon set & site title (#182/PR #8), both phone-merged to dev 2026-08-01. Carries PR #9 (back-merge restoring `--ff-only` ancestry after the 06-02 sweep never back-synced — the anomaly `dev-tier-promotion` documents by name) and PR #12 (footer "Share this site" link to `/qr`, Jack override at the #915 sitting superseding a11y-plan ruling A10; 7-lens gate 6 GO + 1 GO-WITH-FIXES). Go-live had been HELD 08-01 on the `/qr` nav design question; design-director pass + Jack ruling cleared it 08-02. |
| 2026-06-02 | live-2026-06-02-01 | JPT #16, #197 | _(local dev-only init, no PR)_ | 2 | dev-tier infrastructure init: X-Robots-Tag noindex header for branch-deploy context (`1aa3ca5`) + PROMOTIONS.md scaffold (`1cfc3ad`). Surfaced as stale dev branch (12d) by `/start` Step 1.7 on 2026-06-02; promoted inline same session. |

<!--
Initialised 2026-05-21 per JPT #197 Phase 1 dev-tier infrastructure setup.
Format is canonical per skills/dev-tier-promotion/SKILL.md §"Promotion mechanic" — PROMOTIONS.md.
Each future dev → main sweep prepends a row.
Commit body via the promote heredoc carries the full PR-title detail for git-log audit.
-->
