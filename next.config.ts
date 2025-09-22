import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-9f3006068d46453b82913f81f7877447.r2.dev",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
