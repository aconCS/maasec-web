import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — the site is deployed to GitHub Pages, which serves
  // files only and cannot run a Next.js server. Anything requiring a server
  // (route handlers, ISR, image optimization) is unavailable by design.
  output: "export",

  // GitHub Pages has no image-optimization backend, so next/image must serve
  // the original files rather than requesting /_next/image.
  images: { unoptimized: true },
};

export default nextConfig;
