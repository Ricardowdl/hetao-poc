import type { NextConfig } from "next";

const repoName = "hetao-poc";
const isGitHubPages = process.env.NEXT_PUBLIC_GH_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages
    ? {
      basePath: `/${repoName}`,
      assetPrefix: `/${repoName}/`,
    }
    : {}),
};

export default nextConfig;
