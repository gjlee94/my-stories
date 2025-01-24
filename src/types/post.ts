export interface Post {
  slug: string; // 동적 라우팅 경로
  title: string; // 제목
  date: string; // 작성일
  excerpt: string; // 요약문
  ogImage: {
    // 썸네일
    url: string;
  };
  content: string; // 본문
  tags: string[]; // 태그
  category: string; // 카테고리
}
