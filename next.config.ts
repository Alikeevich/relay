import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project to silence the multiple-lockfile
  // warning when there are stray lockfiles in parent directories. `cwd()` is
  // ESM-safe (no `__dirname` needed).
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;