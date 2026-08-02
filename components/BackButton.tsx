/**
 * Sticky back bar — the single back-control used by project pages and /qr.
 *
 * Rendered as a real <Link> (finding 2.2.2, SC 2.4.6 / 4.1.2): navigation gets
 * the link role, new-tab/middle-click behaviour, and an exposed destination.
 * The arrow glyph is always aria-hidden — it is decoration; the name comes
 * from text.
 *
 * Two modes, one component (Jack ruling, #915 sitting — "don't fork a
 * near-duplicate"):
 *
 * - **text mode** (`visibleText` non-null, project pages): the visible string is
 *   arrow + title only; the "Back to all work — " prefix lives in an `sr-only`
 *   span INSIDE the link. A hidden span *composes* into the accessible name
 *   (announced: "Back to all work — Nucleus Smart App, link") while leaving the
 *   visible string inside it, so speech input on "click Nucleus Smart App"
 *   still matches (SC 2.5.3 Label in Name, Level A).
 *
 *   The merit of the hidden span over `aria-label` is **sync-safety, not 2.5.3
 *   per se** (accessibility-lead correction, PR #16 panel — the earlier note
 *   here claimed `aria-label` "would have broken 2.5.3", which is over-general
 *   and wrong as stated). `aria-label="Back to all work"` alone would indeed
 *   fail 2.5.3, but `aria-label={`Back to all work — ${visibleText}`}` would
 *   pass it. The real argument is that `visibleText` is dynamic per project:
 *   an `aria-label` has to re-interpolate that same value, so any later change
 *   to the visible string can silently desynchronise the accessible name with
 *   nothing to catch it. Composing the name from the real DOM text makes that
 *   drift structurally impossible.
 *
 * - **arrow-only mode** (`visibleText` null, /qr): there is no visible text for
 *   an `aria-label` to contradict, so 2.5.3 does not bite and `aria-label` is
 *   the correct mechanism for naming the icon-only control (SC 4.1.2). The hit
 *   area is 44x44 CSS px, reached by padding the box and never by growing the
 *   glyph. 44 is not the WCAG number: SC 2.5.8 Target Size (Minimum, AA) asks
 *   only for 24x24. It is JP's floor for a primary control, softened from the
 *   house 56px standard to Apple's 44px because the bar is 49px tall and a
 *   56px target could not fit without changing the bar's height (design-qa
 *   Finding 1, PR #16 panel — this is the page's only exit, and was the
 *   smallest target on the site at 36x36).
 *
 * Text colour is neutral-600: the bar is bg-white/95 and composites over tinted
 * (neutral-50/neutral-100) surfaces while sticky, where neutral-500 is
 * marginal-to-failing (finding 2.2.1 companion; 4.35:1 on neutral-100).
 */

import Link from "next/link";

/** Props for the shared sticky back bar. */
type BackButtonProps = {
  /** Destination route, e.g. "/#work" or "/". */
  href: string;
  /**
   * Text rendered visibly after the arrow. Pass `null` for an arrow-only
   * control, in which case `srLabel` becomes the entire accessible name.
   */
  visibleText: string | null;
  /**
   * In text mode: the screen-reader-only prefix announced before
   * `visibleText` (include its own trailing separator and space).
   * In arrow-only mode: the complete accessible name, applied as `aria-label`.
   */
  srLabel: string;
};

export function BackButton({ href, visibleText, srLabel }: BackButtonProps) {
  // The offset is the header's live height, published as --jp-header-h by
  // components/HeaderOffset.tsx with a rem-derived fallback in globals.css.
  // It used to be a hardcoded 61px, which matched the header only at a 16px
  // root: at 200% text zoom the header grows (measured 121px at 1280px wide,
  // 177px at 390px where the wordmark wraps) while the bar stayed at 61px,
  // leaving it entirely behind the header — and a click at the arrow's centre
  // landed on the header wordmark instead (bug-tester BUG 3, PR #16 panel;
  // SC 1.4.4 Resize Text, AA).
  return (
    <div className="sticky top-[var(--jp-header-h)] z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-3 md:px-8">
        {visibleText === null ? (
          // 44x44 CSS px of interactive area (measured on the built output,
          // up from 36x36), grown entirely by sizing the box around the glyph
          // — the glyph itself is untouched at both sizes.
          //
          // Vertical: the negative margin cuts the box's LAYOUT contribution
          // to 20px (44 - 2*12), which is under the 24px line box the bar's
          // inner element inherits from the body type. The line box therefore
          // sets the bar's height, not the target — so both modes measure the
          // same 49px, and stay equal under text zoom (measured 97px at 200%
          // in both modes). This is the same relationship the old 36px target
          // had (36 - 2*8 = 20); only the padding around the glyph grew.
          // Keeping the contribution strictly BELOW the line box rather than
          // equal to it matters: at parity the inline box's baseline alignment
          // adds a 2px residue at 200% zoom that desynchronises the two bars.
          // (The "44px height" stated here before the panel was a
          // miscalculation — it assumed a 20px small-text line box, but this
          // inner element sets no text size, so the strut comes from the 16px
          // body type. Measured, both bars are 49px.)
          //
          // Horizontal: pulling the box left by the same amount as its own
          // left padding puts the glyph's box on the page gutter exactly.
          // Centring the glyph in the box instead left it 2.15px right of the
          // gutter every other element on the site sits on, which the old
          // comment claimed it was on (design-qa Finding 2, PR #16 panel).
          // Expressing it as margin/padding rather than a pixel nudge keeps it
          // correct under text zoom and independent of the glyph's own metrics.
          <Link
            href={href}
            aria-label={srLabel}
            className="-my-3 -ml-2.5 inline-flex h-11 w-11 items-center justify-start pl-2.5 rounded-md text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
          </Link>
        ) : (
          <Link
            href={href}
            className="inline-flex max-w-full items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <span aria-hidden="true" className="shrink-0">&larr;</span>
            <span className="sr-only">{srLabel}</span>
            <span className="truncate">{visibleText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
