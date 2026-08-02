/**
 * Site footer component — appears on every page.
 * Repeats contact information from the header for accessibility.
 * Includes a utility link to /qr (Jack override 2026-08-02, #915 sitting —
 * supersedes a11y plan ruling A10 "no footer entry").
 * Label is "Share this site", not "QR card": /qr encodes the site URL, not
 * scannable contact data, so a business-card label would mis-set expectations
 * sitting fourth under email/phone/LinkedIn (design-qa, Jack-ruled same sitting).
 *
 * The /qr link is suppressed while the user is already on /qr — a footer item
 * pointing at the current page reads as a broken link (design-qa, PR #12).
 * Jack ruled suppress, not `aria-current` + still clickable (#915 sitting).
 *
 * Why a client component: the footer lives in the root layout, and a server
 * component in a layout has no access to the current route. `usePathname` is
 * the App Router mechanism, and under `output: "export"` every route is
 * prerendered individually, so the suppression is baked into the static HTML —
 * it is not a client-side removal of a link that shipped in the markup. That
 * property is asserted by the built-HTML check in the PR, not assumed.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Route whose footer must not link to itself. */
const QR_ROUTE = "/qr";

export function Footer() {
  // Reads the current route from the App Router context. Resolved at prerender
  // time for each statically exported page.
  const pathname = usePathname();
  // trailingSlash is off today, but normalise so "/qr/" never slips through.
  const showQrLink = pathname !== QR_ROUTE && pathname !== `${QR_ROUTE}/`;

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-600">
            <p className="font-medium text-neutral-900">Jack Hsu</p>
            <p className="mt-1">Fractional Product Design Partner</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-neutral-600 sm:items-end">
            <a
              href="mailto:jack@journeyprojects.co"
              className="hover:text-neutral-900 transition-colors"
            >
              jack@journeyprojects.co
            </a>
            <a
              href="tel:+436704060560"
              className="hover:text-neutral-900 transition-colors"
            >
              +43 670 406 0560
            </a>
            <a
              href="https://www.linkedin.com/in/jackhsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              LinkedIn
            </a>
            {showQrLink && (
              <Link
                href={QR_ROUTE}
                className="hover:text-neutral-900 transition-colors"
              >
                Share this site
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6 text-xs text-neutral-600">
          <p>&copy; {new Date().getFullYear()} Jack Hsu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
