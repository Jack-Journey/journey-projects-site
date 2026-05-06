"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollSave } from "./ScrollMemory";

interface ProjectCardProps {
  slug: string;
  client: string;
  title: string;
  description: string;
  image: string;
}

export function ProjectCard({
  slug,
  client,
  title,
  description,
  image,
}: ProjectCardProps) {
  const saveScroll = useScrollSave();

  return (
    <Link
      href={`/${slug}`}
      onClick={saveScroll}
      className="group block overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={`${client} — ${title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {client}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
    </Link>
  );
}
