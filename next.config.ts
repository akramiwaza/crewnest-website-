import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "[::1]",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Disable image optimization for localhost to avoid private IP resolution issues
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
