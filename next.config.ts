import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  eslint: {
    // a11y lint gates PRs via CI (lint:a11y); the production build path stays
    // lint-free so a hotfix always deploys (availability F-1, hero-6 PR#11
    // panel 2026-08-02). Next 16 removes build-time lint anyway — this pins
    // the intended behaviour across the bump.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
