const queryOptions = {
  posts: {
    all: () => ['posts'],
    list: () => [...queryOptions.posts.all(), 'list'],
    detail: (slug: string) => [...queryOptions.posts.all(), slug],
  },
};

export default queryOptions;
