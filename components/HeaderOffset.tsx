/**
 * HeaderOffset — publishes the sticky header's live height as the CSS custom
 * property `--jp-header-h` on the document element. Renders no markup.
 *
 * Why this exists. Everything that has to sit below the sticky header (the
 * back bar's `top` offset, the scroll band reserved in globals.css) needs the
 * header's height, and CSS has no portable way to read another element's box.
 * The previous code hardcoded 61px, which is correct only at a 16px root font
 * size: at 200% text zoom the header grows and the back bar stayed pinned at
 * 61px, ending up entirely behind the header — and `elementFromPoint` at the
 * back arrow's centre returned the header wordmark, so a click activated the
 * wrong link (bug-tester BUG 3, PR #16 panel; SC 1.4.4 Resize Text, AA).
 *
 * Why a rem constant is not enough. `globals.css` carries a rem-derived
 * fallback that is exact for a one-line header, and that alone would have
 * fixed wide viewports. It does not fix narrow ones: at 200% text zoom on a
 * 390px viewport the wordmark WRAPS and the header measures 177px against the
 * fallback's 121px. A static value cannot see a reflow, so the real height is
 * measured here and the fallback is overwritten. With JS off the fallback
 * still applies and still scales with text size — degraded, but strictly
 * better than the fixed px it replaces.
 *
 * A ResizeObserver rather than a resize listener: it fires for every cause of
 * a height change — text zoom, viewport width, and late webfont swap — and
 * not for viewport changes that leave the header's box alone.
 *
 * Fail-open contract. This component must never be able to break a page. It
 * runs in the root layout, so a throw here takes down all 11 routes, and the
 * thing it would take down is a rem fallback that was already working. The
 * observer is therefore feature-detected AND wrapped in try/catch, and the
 * height is published before either guard — so the degraded states are, in
 * order: observer works (offset tracks the header exactly) > observer
 * unavailable or throwing (offset is correct at load, then stale if the
 * header later reflows) > JS off entirely (rem fallback, exact for a
 * one-line header at any text size). None of them is a broken page.
 *
 * External dependencies: react (client component; the App Router root layout
 * renders it alongside Header).
 */

"use client";

import { useEffect } from "react";

/** Custom property consumed by BackButton's sticky offset and by scroll-padding-top. */
const HEADER_HEIGHT_VAR = "--jp-header-h";

export function HeaderOffset() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (header === null) {
      return;
    }
    const root = document.documentElement;

    // SIDE EFFECT: writes an inline custom property on <html>, overriding the
    // rem-derived fallback declared on :root in globals.css.
    const publish = () => {
      root.style.setProperty(
        HEADER_HEIGHT_VAR,
        `${header.getBoundingClientRect().height}px`,
      );
    };

    // Publish BEFORE the observer is constructed. This ordering is the whole
    // fail-open design: by this point the property already holds the correct
    // height, so everything below is an enhancement that keeps it correct as
    // the header changes — never the mechanism that makes it correct.
    publish();

    // Everything from here is guarded twice, because this effect runs in the
    // ROOT layout: an exception here propagates above every route segment,
    // and the repo ships no app/error.tsx or app/global-error.tsx, so it
    // would reach Next's default GlobalError and replace the whole document
    // with "Application error: a client-side exception has occurred" — on all
    // 11 pages, including the two that have no back bar at all (availability
    // finding A-4, PR #16 panel; measured, not theorised).
    //
    // The failure would also be perverse: the CSS fallback in globals.css
    // fails OPEN by construction, so the only thing that could take the site
    // down is the code whose sole job is to improve on that fallback. Degrade
    // to it instead — an unscaled-but-present sticky offset is a cosmetic
    // defect at 200% text zoom; a blank document is a total outage.
    //
    // Two guards, because they catch different things: the feature detection
    // covers the constructor being absent (older or stripped-down engines),
    // and the try/catch covers it being present but throwing.
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    let observer: ResizeObserver;
    try {
      // SIDE EFFECT: observes the header element for box-size changes.
      observer = new ResizeObserver(publish);
      observer.observe(header);
    } catch {
      return;
    }

    return () => {
      // SIDE EFFECT: detaches the observer and restores the CSS fallback.
      observer.disconnect();
      root.style.removeProperty(HEADER_HEIGHT_VAR);
    };
  }, []);

  return null;
}
