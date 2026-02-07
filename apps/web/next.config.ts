import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // disabilita lightningcss
  },
};

export default nextConfig;
