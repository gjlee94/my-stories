type PostType = "Post" | "Paper" | "Page";
type PostStatus = "Private" | "Public" | "PublicOnDetail";
export interface Post {
  id: string;
  date: { start_date: string };
  type: PostType[];
  slug: string;
  tags?: string[];
  category?: string[];
  summary?: string;
  title: string;
  status: PostStatus[];
  createdTime: string;
}
