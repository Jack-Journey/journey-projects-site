/**
 * Sticky back bar on project pages — returns the user to the work grid.
 *
 * Rendered as a real <Link> (finding 2.2.2, SC 2.4.6 / 4.1.2): navigation
 * gets the link role, new-tab/middle-click behaviour, and an exposed
 * destination. The accessible name leads with the action ("Back to all
 * work") with the project title as secondary context, so screen-reader
 * and voice-control users hear the control's purpose, not the name of
 * the page they are already on. The arrow glyph stays aria-hidden.
 *
 * Text colour is neutral-600: the bar is bg-white/95 and composites over
 * tinted (neutral-50/neutral-100) surfaces while sticky, where neutral-500
 * is marginal-to-failing (finding 2.2.1 companion; 4.35:1 on neutral-100).
 */

import Link from "next/link";

export function BackButton({ title }: { title: string }) {
  return (
    <div className="sticky top-14 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-3 md:px-8">
        <Link
          href="/#work"
          className="inline-flex max-w-full items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <span aria-hidden="true" className="shrink-0">&larr;</span>
          <span className="truncate">Back to all work &mdash; {title}</span>
        </Link>
      </div>
    </div>
  );
}
