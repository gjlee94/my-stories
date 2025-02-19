const queries = {
  posts: {
    all: () => ["posts"],
    list: () => [queries.posts.all(), "list"],
    detail: (slug: string) => [queries.posts.all(), "detail", slug],
  },
  comments: {
    all: () => ["comments"],
    list: () => [...queries.comments.all(), "list"],
    detail: (id: string) => [...queries.comments.all(), id],
  },
};

export default queries;
