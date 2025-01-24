import { Flex } from "@/components/common/Flex";
import { Tag } from "@/components/common/Tag";
import { Typography } from "@/components/common/Typography";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import type { Post } from "@/types/post";

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: { slug: slug.replace(/\.md$/, "") },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return {
    props: { post },
  };
}

interface PostDetailPageProps {
  post: Post;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  return (
    <Flex direction="column" gap={20}>
      <Typography as="h1" variant="title1">
        {post.title}
      </Typography>
      <Typography as="p" variant="body6">
        {post.date}
      </Typography>
      <Flex gap={6}>
        {post.tags.map((tag) => (
          <Tag>{tag}</Tag>
        ))}
      </Flex>
      <Typography as="p" variant="body6">
        {post.content}
      </Typography>
    </Flex>
  );
}
