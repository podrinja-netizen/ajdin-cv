import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      // live screenshot previews for the web directory
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "**.microlink.io" },
    ],
  },
  // view transitions between / and /cv
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
