import { Flex } from "@/components/common/Flex";
import { Tag } from "@/components/common/Tag";
import { Typography } from "@/components/common/Typography";
import markdownToHtml from "@/lib/markdownToHtml";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import type { Post } from "@/types/post";
import { PostBody } from "../../components/PostBody";
import { format } from "date-fns";
import styled from "@emotion/styled";
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

const Wrapper = styled(Flex)`
  max-width: 800px;
  flex: 1 1 800px;

  padding: 24px;
  margin: 24px 12px;
  max-height: fit-content;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 12px;
  background-color: white;
`;

interface PostDetailPageProps {
  post: Post;
  content: string;
}

export default function PostDetailPage({ post, content }: PostDetailPageProps) {
  return (
    <Wrapper direction="column" gap={20}>
      <Typography as="h1" variant="title3">
        {post.title}
      </Typography>
      <Typography as="p" variant="body3">
        {format(post.date, "yyyy년 MM월 dd일")}
      </Typography>
      <Flex gap={6}>
        {post.tags.map((tag) => (
          <Tag>{tag}</Tag>
        ))}
      </Flex>
      <PostBody content={content} />
    </Wrapper>
  );
}
