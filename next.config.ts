import type { NextConfig } from "next";

// Project pages on the default *.github.io/<repo>/ URL are served under a
// /<repo> path prefix, so asset requests need that prefix too. The custom
// domain (maasec.com) serves from the root instead, so this must be unset
// once DNS points there — leaving it set would break every asset path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static HTML export — the site is deployed to GitHub Pages, which serves
  // files only and cannot run a Next.js server. Anything requiring a server
  // (route handlers, ISR, image optimization) is unavailable by design.
  output: "export",

  basePath,
  assetPrefix: basePath,

  // GitHub Pages has no image-optimization backend, so next/image must serve
  // the original files rather than requesting /_next/image.
  images: { unoptimized: true },
};

export default nextConfig;
