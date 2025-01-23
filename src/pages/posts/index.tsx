import { Flex } from "@/components/common/Flex";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/pages/type/post";
import { Typography } from "@/components/common/Typography";
import { Tag } from "@/components/common/Tag";
import Link from "next/link";

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}

interface PostsPageProps {
  posts: Post[];
}

export default function PostsPage({ posts }: PostsPageProps) {
  const recentPost = posts[0];

  const remainingPosts = posts.slice(1);

  return (
    <Link href={`/posts/${recentPost.slug}`}>
      <Flex as="main" direction="column" justify="center" gap={20}>
        {posts.map((post) => (
          <section key={post.slug}>
            <Flex direction="column" gap={10}>
              <Typography as="h2" variant="title2">
                {post.title}
              </Typography>
              <Typography as="p" variant="body6">
                {post.date}
              </Typography>
              <Typography as="p" variant="body6">
                {post.excerpt}
              </Typography>
              <Flex gap={6}>
                {post.tags.map((tag) => (
                  <Tag>{tag}</Tag>
                ))}
              </Flex>
            </Flex>
          </section>
        ))}
      </Flex>
    </Link>
  );
}
