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
import { addComment } from "@/apis/comments";

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
`;

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const query = useQuery<
    Post & {
      recordMap: {
        page: PageObjectResponse;
        blocks: BlockObjectResponse[];
      };
    }
  >({
    queryKey: queries.posts.detail(params.slug),
  });

  const commentsQuery = useQuery(
    queries.comments.detail(params.slug ?? "1234")
  );
  const userQuery = useQuery(queries.user.detail());

  const addCommentMutation = useMutation({
    mutationFn: async (payload: { content: string; author: string }) => {
      try {
        const response = await addComment(params.slug, payload);
        return response;
      } catch (error) {
        // API 에러를 mutation의 onError로 전달
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comments.detail(params.slug));
    },
    onError: (error: any) => {
      console.error("Error in mutation:", error);

      alert("권한이 만료되었습니다. 다시 로그인해주세요.");
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("accessToken");
      window.location.reload();
    },
  });

  const handleAddComment = async (comment: string) => {
    const payload = {
      content: comment,
      author: userQuery.data?.preferred_username ?? "gyoungjun_lee",
    };

    addCommentMutation.mutate(payload);
  };

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
        <CommentBox
          comments={commentsQuery.data}
          onCommentSubmit={handleAddComment}
        />
      </Wrapper>
    </>
  );
}
