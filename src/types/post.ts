export type PostStatus = "Published" | "Writing" | "Planned";
export interface Post {
  id: string;
  date: { start_date: string };
  slug: string;
  tags?: string[];
  category?: string[];
  summary?: string;
  title: string;
  status: PostStatus[];
  createdTime: string;
}
