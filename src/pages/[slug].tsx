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
import { HeadConfig } from "@/components/HeadConfig";

import fs from "fs";
import path from "path";
import { CommentBox } from "@/components/CommentBox";
import { EmoticonBox } from "@/components/EmoticonBox";
import queryOptions from "@/queryOptions";
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
    queryKey: queryOptions.posts.list(),
    queryFn: () => posts,
  });

  const detailPost = posts.find((post) => post.slug === params.slug);
  const recordMap = await getRecordMap(uuidToId(detailPost.id));

  await queryClient.prefetchQuery({
    queryKey: queryOptions.posts.detail(params.slug),
    queryFn: () => ({ ...detailPost, recordMap }),
  });

  // ✅ 디버깅 데이터 JSON 파일로 저장
  const debugFilePath = path.join(
    process.cwd(),
    "public",
    "debug",
    `debug-${params.slug}.json`
  );

  fs.writeFileSync(
    debugFilePath,
    JSON.stringify({ posts, recordMap }, null, 2)
  );

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
    queryKey: queryOptions.posts.detail(params.slug),
  });

  const post = query.data;

  return (
    <>
      <HeadConfig
        title={post.title}
        summary={post.summary}
        tags={post.tags}
        slug={params.slug}
      />
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
        <EmoticonBox />
        <CommentBox />
      </Wrapper>
    </>
  );
}
