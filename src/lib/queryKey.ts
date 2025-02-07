export const queryKey = {
  posts: () => ["posts"],
  post: (slug: string) => ["posts", slug],
};
