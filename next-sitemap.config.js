/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://dz8loj6wyz9a4.cloudfront.net", // 🚀 실제 도메인으로 변경
  generateRobotsTxt: true, // ✅ robots.txt 자동 생성
  sitemapSize: 5000, // 한 개의 Sitemap에 포함될 최대 URL 개수
  exclude: [], // ❌ 검색에서 제외할 페이지
  changefreq: "daily",
  priority: 0.7,
};
