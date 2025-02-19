import { getComments } from "@/apis/comments";
import { queryOptions } from "@tanstack/react-query";

export const queries = {
  posts: {
    all: () => ["posts"],
    list: () => [queries.posts.all(), "list"],
    detail: (slug: string) => [queries.posts.all(), "detail", slug],
  },
  comments: {
    all: () => ["comments"],
    detail: (postId: string) =>
      queryOptions({
        queryKey: [queries.comments.all(), "detail", postId],
        queryFn: async () => {
          return await getComments(postId);
        },
      }),
  },
};
