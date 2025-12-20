/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com", "res.cloudinary.com", "media.moamir.cloud"],
  },
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
