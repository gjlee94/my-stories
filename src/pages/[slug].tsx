import { Flex } from "@/components/common/Flex";
import { Tag } from "@/components/common/Tag";
import { Typography } from "@/components/common/Typography";
import type { Post } from "@/types/post";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { getPosts } from "@/apis/posts";
import { queryClient } from "@/query/queryClient";
import { dehydrate, useMutation, useQuery } from "@tanstack/react-query";
import { getRecordMap } from "@/components/NotionRenderer/getRecordMap";

import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import NotionRenderer from "@/components/NotionRenderer";

import { HeadConfig } from "@/components/HeadConfig";

import fs from "fs";
import path from "path";
import { CommentBox } from "@/components/CommentBox";
import { EmoticonBox } from "@/components/EmoticonBox";
import { queries } from "@/query/queries";
import { useEffect, useState } from "react";
import { getAccessToken, openLoginPopup } from "@/utils/auth";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { ko } from "date-fns/locale";

const uuidToId = (uuid: string) => uuid.replaceAll("-", "");

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
    queryKey: queries.posts.list(),
    queryFn: () => posts,
  });

  const detailPost = posts.find((post) => post.slug === params.slug);
  const recordMap = await getRecordMap(uuidToId(detailPost.id));

  await queryClient.prefetchQuery({
    queryKey: queries.posts.detail(params.slug),
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

  @media screen and (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 12px;
  }
`;

const RequireLoginRegion = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ disabled }) => disabled && `cursor: not-allowed;`}
`;

type PostDetail = Post & {
  recordMap: {
    page: PageObjectResponse;
    blocks: BlockObjectResponse[];
  };
};

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [token, setToken] = useState<string>();

  const { isDesktop } = useBreakpoints();

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  const handleLogin = () => {
    openLoginPopup();

    queryClient.invalidateQueries({
      queryKey: queries.user.all(),
    });

    setToken(getAccessToken());
  };

  const postDetailQuery = useQuery<PostDetail>({
    queryKey: queries.posts.detail(params.slug),
  });

  const userQuery = useQuery(queries.user.detail());

  const post = postDetailQuery.data;

  return (
    <>
      <HeadConfig
        title={post.title}
        summary={post.summary}
        tags={post.tags}
        slug={params.slug}
      />
      <Wrapper direction="column" gap={20}>
        <Typography as="h1" variant={isDesktop ? "title3" : "title4"}>
          {post.title}
        </Typography>
        <Typography as="p" variant="body3">
          {format(post.createdTime, "yyyy년 MM월 dd일", { locale: ko })}
        </Typography>
        <Flex gap={6} css={{ flexWrap: "wrap" }}>
          {post.tags.map((tag, idx) => (
            <Tag key={tag + idx}>{tag}</Tag>
          ))}
        </Flex>
        <NotionRenderer posts={post.recordMap} />
        <RequireLoginRegion disabled={!token}>
          <EmoticonBox
            id={post.id}
            username={userQuery.data?.preferred_username ?? "-"}
            token={token}
          />
          <CommentBox
            slug={params.slug}
            token={token}
            handleLogin={handleLogin}
            username={userQuery.data?.preferred_username ?? "-"}
          />
        </RequireLoginRegion>
      </Wrapper>
    </>
  );
}
