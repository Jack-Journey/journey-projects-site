import { notFound } from "next/navigation";
import Image from "next/image";
import { projectsBySlug, allProjectSlugs } from "@/data/projects";
import { BackButton } from "@/components/BackButton";
import type { ProjectData, ProcessSection } from "@/data/types";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return allProjectSlugs.map((slug) => ({ slug }));
}

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
    description: project.description[0],
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
    <div>
      <BackButton title={project.title} />
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <ProjectProcess sections={project.processSections} />
      <NdaNotice notice={project.journey.ndaNotice} />
    </div>
  );
}

function ProjectHero({ project }: { project: ProjectData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-8 md:px-8 md:pt-12">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
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

function ProjectContent({ project }: { project: ProjectData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Context
            </h2>
            <div className="mt-3 space-y-4">
              {project.context.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Description
            </h2>
            <div className="mt-3 space-y-4">
              {project.description.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {project.keyBenefits && (
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Key Benefits
              </h2>
              <ul className="mt-3 space-y-2">
                {project.keyBenefits.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-base leading-relaxed text-neutral-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {project.keyBenefits.summary && (
                <p className="mt-4 text-base leading-relaxed text-neutral-700">
                  {project.keyBenefits.summary}
                </p>
              )}
            </div>
          )}
        </div>

        <MetadataSidebar project={project} />
      </div>

      <div className="mt-10 rounded-lg bg-neutral-50 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          The Journey
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          {project.journey.text}
        </p>
      </div>
    </section>
  );
}

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
            {section.description && (
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {section.description}
              </p>
            )}
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

function NdaNotice({ notice }: { notice: string }) {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8">
        <p className="text-center text-sm italic text-neutral-400">{notice}</p>
      </div>
    </section>
  );
}
