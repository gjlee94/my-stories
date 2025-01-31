import { Flex } from "@/components/common/Flex";
import { Tag } from "@/components/common/Tag";
import { Typography } from "@/components/common/Typography";
import markdownToHtml from "@/lib/markdownToHtml";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import type { Post } from "@/types/post";
import { PostBody } from "../../components/PostBody";
import { format } from "date-fns";

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
  const content = await markdownToHtml(post.content || "");

  return {
    props: { post, content },
  };
}

interface PostDetailPageProps {
  post: Post;
  content: string;
}

export default function PostDetailPage({ post, content }: PostDetailPageProps) {
  return (
    <Flex direction="column" gap={20}>
      <Typography as="h1" variant="title1">
        {post.title}
      </Typography>
      <Typography as="p" variant="body6">
        {format(post.date, "yyyy년 MM월 dd일")}
      </Typography>
      <Flex gap={6}>
        {post.tags.map((tag) => (
          <Tag>{tag}</Tag>
        ))}
      </Flex>
      <PostBody content={content} />
    </Flex>
  );
}
