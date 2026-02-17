import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // disabilita lightningcss
  },
  images: {
  domains: ["cdn.sanity.io"],
},
};

export default nextConfig;

