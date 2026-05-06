"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function BackButton({ title }: { title: string }) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push("/#work");
    },
    [router]
  );

  return (
    <div className="sticky top-14 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-3 md:px-8">
        <button
          onClick={handleClick}
          className="inline-flex max-w-full items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <span aria-hidden="true" className="shrink-0">&larr;</span>
          <span className="truncate">{title}</span>
        </button>
      </div>
    </div>
  );
}
