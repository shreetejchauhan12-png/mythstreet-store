import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 70, 75, 85, 90],

    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-9c0965644e474895961885db47dde810.r2.dev",
      },
    ],

    deviceSizes: [
      320,
      420,
      768,
      1024,
      1200,
      1920,
    ],

    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
  },

  compress: true,

  poweredByHeader: false,

  reactStrictMode: true,
};

export default nextConfig;