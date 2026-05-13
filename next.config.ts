import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Intentionally minimal — Turbopack picks the project root automatically.
  // Do NOT use `__dirname` here: when this file is loaded as ESM (Bolt / some
  // Node setups) it is not defined, which crashes `next dev`.
};

export default nextConfig;
