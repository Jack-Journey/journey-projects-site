# Promotion log

Newest first. Each entry = one dev → main sweep.

| Date | Tag | Cards | PRs | Cohort size | Notes |
|---|---|---|---|---|---|
| 2026-08-02 | live-2026-08-02-01 | JPT #181, #182 | #7, #8, #9, #12 | 2 | First feature cohort. `/qr` static QR page (#181/PR #7) + JP favicon/icon set & site title (#182/PR #8), both phone-merged to dev 2026-08-01. Carries PR #9 (back-merge restoring `--ff-only` ancestry after the 06-02 sweep never back-synced — the anomaly `dev-tier-promotion` documents by name) and PR #12 (footer "Share this site" link to `/qr`, Jack override at the #915 sitting superseding a11y-plan ruling A10; 7-lens gate 6 GO + 1 GO-WITH-FIXES). Go-live had been HELD 08-01 on the `/qr` nav design question; design-director pass + Jack ruling cleared it 08-02. |
| 2026-06-02 | live-2026-06-02-01 | JPT #16, #197 | _(local dev-only init, no PR)_ | 2 | dev-tier infrastructure init: X-Robots-Tag noindex header for branch-deploy context (`1aa3ca5`) + PROMOTIONS.md scaffold (`1cfc3ad`). Surfaced as stale dev branch (12d) by `/start` Step 1.7 on 2026-06-02; promoted inline same session. |

<!--
Initialised 2026-05-21 per JPT #197 Phase 1 dev-tier infrastructure setup.
Format is canonical per skills/dev-tier-promotion/SKILL.md §"Promotion mechanic" — PROMOTIONS.md.
Each future dev → main sweep prepends a row.
Commit body via the promote heredoc carries the full PR-title detail for git-log audit.
-->
