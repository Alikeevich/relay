import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Whitelist Unsplash for next/image hot-linking (hero mascot photo).
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
