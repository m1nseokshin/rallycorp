import type { NextConfig } from "next";

// GitHub Pages serves this repo at github.io/rallycorp/ (a project page, not
// a user page), so every built asset needs that prefix. Both basePath and the
// NEXT_PUBLIC_BASE_PATH the asset() helper reads are driven by the same env
// var, set only in the Pages deploy workflow — local dev and `next build`
// without it stay unprefixed.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    // next/image's default loader needs a server to resize images; static
    // export has none, so every <Image> ships the source file as-is.
    unoptimized: true,
  },
};

export default nextConfig;
