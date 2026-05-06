/**
 * Site footer component — appears on every page.
 * Repeats contact information from the header for accessibility.
 */

export function Footer() {
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
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6 text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Jack Hsu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
