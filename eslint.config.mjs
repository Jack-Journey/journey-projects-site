import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * a11y gate — enumerated jsx-a11y ERROR subset (Tier B of the four-tier merge
 * gate, skills/accessibility §3).
 *
 * Enumerated by explicit rule ID, never "error-level wholesale": an
 * unenumerated subset silently drifts to include high-false-positive rules on
 * plugin updates, and a high-FP Block tier gets routed around (§3 forward-note).
 * Every rule here is machine-decidable, low-false-positive, and fixable-in-PR
 * by the author.
 *
 * Deliberately EXCLUDED from error level (stay at next/core-web-vitals' warn,
 * per §3 "must NOT block" — judgement calls breed bypass habits):
 *   anchor-is-valid (Next.js <Link> false positives),
 *   click-events-have-key-events / no-static-element-interactions /
 *   mouse-events-have-key-events (interaction-pattern judgement),
 *   label-has-associated-control (custom-component false positives),
 *   img-redundant-alt (alt QUALITY is non-blocking; alt PRESENCE blocks),
 *   no-autofocus, media-has-caption (content/context judgement).
 *
 * The jsx-a11y plugin itself is registered by next/core-web-vitals (same
 * exact-pinned version, deduped to one module instance); this block only
 * raises the enumerated rules to error.
 */
const a11yErrorSubset = {
  settings: {
    "jsx-a11y": {
      // Map Next's <Link> onto <a> so the anchor rules actually see this
      // codebase's links — without this mapping an empty <Link> produces ZERO
      // lint output, leaving the empty-link failure class only nominally
      // covered on a site that navigates entirely through <Link>
      // (a11y-lead F3, hero-6 PR#11 panel 2026-08-02).
      components: { Link: "a" },
    },
  },
  rules: {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/html-has-lang": "error",
    "jsx-a11y/iframe-has-title": "error",
    "jsx-a11y/lang": "error",
    "jsx-a11y/no-access-key": "error",
    "jsx-a11y/no-distracting-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/scope": "error",
    "jsx-a11y/tabindex-no-positive": "error",
  },
};

const eslintConfig = [
  // build output and vendored dirs are never linted (eslint is invoked
  // directly — `next lint` is deprecated in Next 15 and removed in 16)
  { ignores: ["out/**", ".next/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals"),
  a11yErrorSubset,
];

export default eslintConfig;
