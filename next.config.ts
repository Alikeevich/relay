import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Intentionally minimal — no remotePatterns since we use plain <img> for
  // the hero mascot (decorative, no Next image optimisation needed).
};

export default nextConfig;
