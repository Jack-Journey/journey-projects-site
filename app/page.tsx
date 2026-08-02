/**
 * Homepage — hero section, featured work grid, and discography timeline.
 * Consumes structured content from data/homepage.ts.
 */

import Image from "next/image";
import { hero, featuredProjects, discography } from "@/data/homepage";
import { ScrollRestorer } from "@/components/ScrollMemory";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <>
      <ScrollRestorer />
      <HeroSection />
      <FeaturedWorkSection />
      <DiscographySection />
    </>
  );
}

/** Hero — profile photo, intro, origin with flags, bio paragraphs with bold emphasis */
function HeroSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <div className="mb-8">
        <Image
          src={hero.profileImage}
          alt="Jack Hsu"
          width={80}
          height={80}
          className="rounded-full"
          priority
        />
      </div>

      <div className="space-y-1 text-base text-neutral-800">
        <p>
          Hi, I&apos;m <strong>Jack</strong>.
        </p>
        {/* The page's single h1 (finding 2.1.1, SC 1.3.1). The positioning line
            is promoted from <p> — Tailwind preflight resets heading size/weight
            to inherit, so this renders identically; the change is semantic only. */}
        <h1>
          <strong>Fractional product design partner</strong> for businesses
          since 2009
        </h1>
      </div>

      <div className="mt-4 space-y-0.5 text-base text-neutral-600">
        {hero.origin.map((item) => (
          <p key={item.text}>
            {item.text} {item.emoji}
          </p>
        ))}
      </div>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-600">
        {hero.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

/** Featured work — grid of 8 case study cards linking to subpages */
function FeaturedWorkSection() {
  return (
    <section id="work" className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Featured Work
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              client={project.client}
              title={project.title}
              description={project.description}
              image={project.image}
            />
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
