import path from "path";
import type { NextConfig } from "next";

const modernPolyfillPath = path.join(
  process.cwd(),
  "src/polyfills/modern-polyfills.ts",
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": modernPolyfillPath,
      "next/dist/esm/build/polyfills/polyfill-module": modernPolyfillPath,
      "@next/polyfill-module": modernPolyfillPath,
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "next/dist/build/polyfills/polyfill-module": modernPolyfillPath,
      "next/dist/esm/build/polyfills/polyfill-module": modernPolyfillPath,
      "@next/polyfill-module": modernPolyfillPath,
    };

    return config;
  },
};

export default nextConfig;
