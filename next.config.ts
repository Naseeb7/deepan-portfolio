import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "example.com"], // Allow images from Cloudinary
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    }, // Enable server actions
  },
};

export default nextConfig;
