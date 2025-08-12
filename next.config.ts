import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";
const isProd = process.env.NODE_ENV === "production";
const repo = "Tokenizer-GenAI-web";

const nextConfig: NextConfig = {
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: false },
  reactStrictMode: true,
  crossOrigin: "anonymous",
  typescript: { ignoreBuildErrors: false },
  images: {
    unoptimized: true,
    loader: "akamai",
    path: "/",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  output: "export",
  basePath: isGhPages && isProd ? `/${repo}` : "",
  assetPrefix: isGhPages && isProd ? `/${repo}/` : "",
};

export default nextConfig;
