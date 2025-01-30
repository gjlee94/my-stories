import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  experimental: {
    turbo: {
      resolveAlias: {
        "@": path.resolve(process.cwd(), "src"),
      },
      rules: {
        // SVG 설정
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "react",
        },
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
