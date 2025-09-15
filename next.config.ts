import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // This disables the Image Optimization API
  },
};

export default nextConfig;
