import { Flex } from "@/components/common/Flex";
import { Tag } from "@/components/common/Tag";
import { Typography } from "@/components/common/Typography";
import type { Post } from "@/types/post";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { getPosts } from "@/apis/getPosts";
import { queryClient } from "@/lib/queryClient";
import { queryKey } from "@/lib/queryKey";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { getRecordMap } from "@/apis/getRecordMap";
import { uuidToId } from "notion-utils";
import NotionRenderer from "@/components/NotionRenderer";
import { ExtendedRecordMap } from "notion-types";

export async function getStaticPaths() {
  const posts = await getPosts();
  const slugs = posts.map((post) => post.slug);
  return {
    paths: slugs.map((slug) => `/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const posts = await getPosts();

  await queryClient.prefetchQuery({
    queryKey: queryKey.posts(),
    queryFn: () => posts,
  });

  const detailPost = posts.find((post) => post.slug === params.slug);
  const recordMap = await getRecordMap(uuidToId(detailPost.id));

  await queryClient.prefetchQuery({
    queryKey: queryKey.post(params.slug),
    queryFn: () => ({ ...detailPost, recordMap }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params: { slug: params.slug },
    },
  };
}
const Wrapper = styled(Flex)`
  max-width: 1200px;
  width: calc(100% - 60px);
  padding: 24px;
  margin: 24px 12px;
  max-height: fit-content;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 12px;
  background-color: white;
`;

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const query = useQuery<Post & { recordMap: ExtendedRecordMap }>({
    queryKey: queryKey.post(params.slug),
  });

  const post = query.data;

  return (
    <Wrapper direction="column" gap={20}>
      <Typography as="h1" variant="title3">
        {post.title}
      </Typography>
      <Typography as="p" variant="body3">
        {format(post.createdTime, "yyyy년 MM월 dd일")}
      </Typography>
      <Flex gap={6}>
        {post.tags.map((tag, idx) => (
          <Tag key={tag + idx}>{tag}</Tag>
        ))}
      </Flex>
      <NotionRenderer posts={post.recordMap} />
    </Wrapper>
  );
}
