import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";
const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";
const repo = "Tokenizer-GenAI-web";

const nextConfig: NextConfig = {
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  crossOrigin: "anonymous",
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: isVercel ? "" : (isGhPages && isProd ? `/${repo}` : ""),
  assetPrefix: isVercel ? "" : (isGhPages && isProd ? `/${repo}/` : ""),
};

export default nextConfig;
