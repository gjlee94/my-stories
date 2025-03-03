import { getComments } from "@/apis/comments";
import { getReactions } from "@/apis/reactions";
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
        staleTime: 60 * 1000 * 3,
      }),
  },
  reactions: {
    all: () => ["reactions"],
    detail: (pageId: string) =>
      queryOptions({
        queryKey: [queries.reactions.all(), "detail", pageId],
        queryFn: async () => {
          return await getReactions(pageId);
        },
      }),
  },
  portfolio: {
    all: () => ["portfolio"],
    get: () => [queries.portfolio.all(), "get"],
  },
};
