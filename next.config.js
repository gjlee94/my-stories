import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src"),
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
    unoptimized: true, // SSG (output: export)에서는 이미지 최적화 불가능
  },
  trailingSlash: true, // URL 경로에 슬래시 추가
};

export default nextConfig;
