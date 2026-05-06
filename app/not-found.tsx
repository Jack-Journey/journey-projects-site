/**
 * Custom 404 page — shown when a route does not match any project slug.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-32 text-center md:px-8">
      <h1 className="text-6xl font-bold text-neutral-900">404</h1>
      <p className="mt-4 text-lg text-neutral-500">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
      >
        Back to home
      </Link>
    </section>
  );
}
