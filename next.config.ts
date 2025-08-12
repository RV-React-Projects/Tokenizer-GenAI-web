import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//   },
//   basePath: "/Tokenizer-GenAI-web",
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
