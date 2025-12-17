/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com", "res.cloudinary.com", "media.mekyu.cloud"],
  },
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
