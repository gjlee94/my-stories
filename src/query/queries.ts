import { getComments } from "@/apis/comments";
import { getUser } from "@/apis/user";
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
  user: {
    all: () => ["user"],
    detail: () =>
      queryOptions({
        queryKey: [queries.user.all(), "detail"],
        queryFn: async () => {
          return await getUser();
        },
      }),
  },
};
