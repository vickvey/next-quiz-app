import type { NextConfig } from "next";

const repo = "next-quiz-app";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;
