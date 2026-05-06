/**
 * Dynamic case study page — renders any of the 8 project subpages.
 * Uses a single reusable template fed by per-project data from data/projects/.
 * generateStaticParams ensures all pages are pre-rendered at build time.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projectsBySlug, allProjectSlugs } from "@/data/projects";
import type { ProjectData, ProcessSection } from "@/data/types";

/** Params type for Next.js 15 async params */
type PageParams = { slug: string };

/** Pre-render all project pages at build time for static export */
export function generateStaticParams(): PageParams[] {
  return allProjectSlugs.map((slug) => ({ slug }));
}

/** Dynamic metadata per project page */
export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project) return {};

  return {
    title: `${project.client} — ${project.title} | Jack Hsu`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <ProjectProcess sections={project.processSections} />
      <NdaNotice notice={project.journey.ndaNotice} />
    </>
  );
}

/** Hero section — project title and hero image */
function ProjectHero({ project }: { project: ProjectData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 md:px-8 md:pt-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <span aria-hidden="true">&larr;</span>
        Back to all work
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
        {project.client} &mdash; {project.title}
      </h1>

      <div className="mt-8 overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={project.heroImage}
          alt={`${project.client} — ${project.title}`}
          width={1200}
          height={675}
          className="h-auto w-full object-cover"
          priority
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
      </div>
    </section>
  );
}

/** Content section — context, description, metadata sidebar, and journey */
function ProjectContent({ project }: { project: ProjectData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Context
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-700">
              {project.context}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Description
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-700">
              {project.description}
            </p>
          </div>

          <div className="mt-10 rounded-lg bg-neutral-50 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              The Journey
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-neutral-400">Team</p>
                <p className="mt-1 text-sm font-medium text-neutral-700">
                  {project.journey.teamSize}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Duration</p>
                <p className="mt-1 text-sm font-medium text-neutral-700">
                  {project.journey.duration}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Launch</p>
                <p className="mt-1 text-sm font-medium text-neutral-700">
                  {project.journey.launchDate}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="mailto:jack@journeyprojects.co"
                className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <MetadataSidebar project={project} />
      </div>
    </section>
  );
}

/** Metadata sidebar — platform, services, tools, awards, link */
function MetadataSidebar({ project }: { project: ProjectData }) {
  const { metadata } = project;

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <MetadataBlock label="Platform" items={metadata.platform} />
      <MetadataBlock label="Services" items={metadata.services} />
      <MetadataBlock label="Tools" items={metadata.tools} />

      {metadata.awards && metadata.awards.length > 0 && (
        <MetadataBlock label="Awards" items={metadata.awards} />
      )}

      {metadata.link && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Link
          </p>
          <a
            href={metadata.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-neutral-700 underline underline-offset-4 hover:text-neutral-900 transition-colors"
          >
            {metadata.link.label}
          </a>
        </div>
      )}
    </aside>
  );
}

/** Reusable metadata label + tag list */
function MetadataBlock({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Process sections — image galleries showing the design process */
function ProjectProcess({ sections }: { sections: ProcessSection[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {sections.map((section) => (
          <div key={section.title} className="mt-12 first:mt-0">
            <h3 className="text-lg font-semibold text-neutral-900">
              {section.title}
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.images.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-lg bg-white"
                >
                  <Image
                    src={image}
                    alt={`${section.title} process image`}
                    width={800}
                    height={500}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** NDA notice — appears on every case study page */
function NdaNotice({ notice }: { notice: string }) {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8">
        <p className="text-center text-sm italic text-neutral-400">{notice}</p>
      </div>
    </section>
  );
}
