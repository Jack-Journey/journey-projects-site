/**
 * Homepage — hero section, featured work grid, and discography timeline.
 * Consumes structured content from data/homepage.ts.
 */

import Image from "next/image";
import Link from "next/link";
import { hero, featuredProjects, discography } from "@/data/homepage";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWorkSection />
      <DiscographySection />
    </>
  );
}

/** Hero — intro heading, origin, bio, and highlight stats */
function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
            {hero.heading}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            {hero.origin.map((item) => (
              <span
                key={item}
                className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm text-neutral-600"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600">
            {hero.bio}
          </p>

          <ul className="mt-8 space-y-3">
            {hero.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm text-neutral-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">
          <Image
            src={hero.profileImage}
            alt="Jack Hsu"
            width={200}
            height={200}
            className="rounded-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/** Featured work — grid of 8 case study cards linking to subpages */
function FeaturedWorkSection() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Featured Work
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/${project.slug}`}
              className="group block overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image
                  src={project.image}
                  alt={`${project.client} — ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {project.client}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Discography — chronological timeline of all projects 2009-2024 */
function DiscographySection() {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Discography
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Happy to chat about these
        </p>

        <div className="mt-10 space-y-12">
          {discography.map((yearGroup) => (
            <div key={yearGroup.year}>
              <h3 className="text-lg font-bold text-neutral-900">
                {yearGroup.year}
              </h3>
              <div className="mt-4 space-y-4">
                {yearGroup.entries.map((entry, entryIndex) => (
                  <div
                    key={`${yearGroup.year}-${entryIndex}`}
                    className="border-l-2 border-neutral-200 pl-4"
                  >
                    <p className="text-sm font-semibold text-neutral-700">
                      {entry.client}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
