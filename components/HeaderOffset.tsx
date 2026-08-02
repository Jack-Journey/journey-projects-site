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

    publish();

    // SIDE EFFECT: observes the header element for box-size changes.
    const observer = new ResizeObserver(publish);
    observer.observe(header);

    return () => {
      // SIDE EFFECT: detaches the observer and restores the CSS fallback.
      observer.disconnect();
      root.style.removeProperty(HEADER_HEIGHT_VAR);
    };
  }, []);

  return null;
}
