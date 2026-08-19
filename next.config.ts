import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: stray lockfiles/node_modules in the parent
  // "taskflow" folder previously made Turbopack infer the wrong root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
