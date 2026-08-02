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
 *   still matches (SC 2.5.3 Label in Name, Level A). `aria-label` would have
 *   *replaced* the name and broken that match — it is deliberately not used here.
 *
 * - **arrow-only mode** (`visibleText` null, /qr): there is no visible text for
 *   an `aria-label` to contradict, so 2.5.3 does not bite and `aria-label` is
 *   the correct mechanism for naming the icon-only control (SC 4.1.2). The hit
 *   area is padded to 36x36 CSS px — comfortably over the 24x24 floor of
 *   SC 2.5.8 Target Size (Minimum, AA) — by padding, never by growing the glyph.
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
  // The 61px offset matches the header's real rendered height (60px content
  // + 1px border) — the previous 56px offset left the bar's top 5px
  // underneath the z-50 header (finding 2.2.3, measured).
  return (
    <div className="sticky top-[61px] z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-3 md:px-8">
        {visibleText === null ? (
          // h-9/w-9 = 36x36 CSS px of interactive area. The -my-2 cancels the
          // vertical growth in layout terms (36 - 16 = 20px, the same text-sm
          // line box the text-mode bar occupies), so both bars render at the
          // same 44px height; -ml-2 keeps the glyph box on the page gutter.
          <Link
            href={href}
            aria-label={srLabel}
            className="-my-2 -ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
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
