const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
};

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true, // 영구 리디렉션 (301)
      },
    ];
  },
  output: "export",
  images: {
    unoptimized: true, // ssg(output: export)에서는 이미지 최적화 불가능
  },
};
