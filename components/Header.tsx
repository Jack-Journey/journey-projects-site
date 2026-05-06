/**
 * Site header component — appears on every page.
 * Contains the brand name, contact details, and LinkedIn link.
 * Sticky positioning for persistent navigation.
 */

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 hover:text-neutral-700 transition-colors"
        >
          JackWorks
        </Link>

        <nav className="flex items-center gap-4 text-sm text-neutral-600 md:gap-6">
          <a
            href="mailto:jack@journeyprojects.co"
            className="hidden hover:text-neutral-900 transition-colors sm:inline"
          >
            jack@journeyprojects.co
          </a>
          <a
            href="tel:+436704060560"
            className="hidden hover:text-neutral-900 transition-colors md:inline"
          >
            +43 670 406 0560
          </a>
          <a
            href="https://www.linkedin.com/in/jackhsu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 transition-colors"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon />
          </a>
        </nav>
      </div>
    </header>
  );
}

/** Inline LinkedIn SVG icon — avoids external dependency for a single icon */
function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
