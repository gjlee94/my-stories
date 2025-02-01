import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  /** next build 실행 시 Webpack이 최종 번들링을 수행함. */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  /** 개발 환경에서의 빌드 속도를 극대화하기 위해 Turbopack이 사용됨. */
  experimental: {
    turbo: {
      resolveAlias: {
        "@": path.resolve(process.cwd(), "src"),
      },
      rules: {
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
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
