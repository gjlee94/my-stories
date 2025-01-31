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
        // SVG를 React 컴포넌트로 변환 (중복 파일명 방지)
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [{ name: "removeViewBox", active: false }],
            },
          },
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
