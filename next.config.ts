import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],

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