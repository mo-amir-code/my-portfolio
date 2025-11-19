/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com"],
  },
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
