import type { NextConfig } from "next";

// ROOT_BASE lo define scripts/build-root.sh: exporta la app como estática bajo /<carpeta> del sitio root.
const base = process.env.ROOT_BASE;

const nextConfig: NextConfig = base
  ? { output: "export", basePath: base, trailingSlash: true, images: { unoptimized: true } }
  : {};

export default nextConfig;
