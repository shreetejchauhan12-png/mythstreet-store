/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
