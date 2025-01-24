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
};
