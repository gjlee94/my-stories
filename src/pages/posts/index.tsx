import { Flex } from "@/components/common/Flex";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/types/post";
import { PreviewContent } from "@/components/PreviewContent";
import Link from "next/link";

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
}

interface PostsPageProps {
  posts: Post[];
  categories: string[];
}

export default function PostsPage({ posts }: PostsPageProps) {
  return (
    <Flex
      direction="column"
      justify="center"
      gap={20}
      css={{ padding: "20px 0" }}
    >
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`}>
          <PreviewContent post={post} />
        </Link>
      ))}
    </Flex>
  );
}
