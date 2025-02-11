import { Flex } from "@/components/common/Flex";
import type { Post } from "@/types/post";
import { PreviewContent } from "@/components/PreviewContent";
import Link from "next/link";
import { useState } from "react";
import styled from "@emotion/styled";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Profile } from "@/components/Profile";
import { TagList } from "@/components/TagList";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { getPosts } from "@/apis/getPosts";
import { queryKey } from "@/lib/queryKey";
import { TabList } from "@/components/TabList";

import fs from "fs";
import path from "path";
import { HeadConfig } from "@/components/HeadConfig";

const Main = styled(Flex)`
  max-width: 1000px;
  flex: 1 1 1000px;

  padding: 24px;
`;

const Aside = styled(Flex)`
  min-width: 300px;
  flex: 1 1 300px;
  gap: 48px;

  padding: 24px;
`;

export const getStaticProps = async () => {
  const posts = await getPosts();

  await queryClient.prefetchQuery({
    queryKey: queryKey.posts(),
    queryFn: () => posts,
  });

  // ✅ 디버깅 데이터 JSON 파일로 저장
  const debugFilePath = path.join(
    process.cwd(),
    "public",
    "debug",
    "debug.json"
  );

  const debugDir = path.dirname(debugFilePath);

  if (!fs.existsSync(debugDir)) {
    fs.mkdirSync(debugDir, { recursive: true });
  }

  fs.writeFileSync(debugFilePath, JSON.stringify({ posts }, null, 2));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const useFilterPosts = ({
  selectedTab,
  selectedTag,
}: {
  selectedTab: string;
  selectedTag: string | undefined;
}) => {
  const query = useQuery<Post[]>({
    queryKey: queryKey.posts(),
  });

  const posts = query.data;

  return posts.filter((post) => {
    const matchTab = selectedTab === "전체" || post.category[0] === selectedTab;
    const matchTag =
      selectedTag === undefined || post.tags.includes(selectedTag);
    const isPublished = post.status.includes("Published");

    return matchTab && matchTag && isPublished;
  });
};

export default function PostsPage() {
  const { isTablet, isMobile } = useBreakpoints();
  const [selectedTab, setSelectedTab] = useState("전체");
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const query = useQuery<Post[]>({
    queryKey: queryKey.posts(),
  });

  const posts = query.data;

  const filteredPosts = useFilterPosts({
    selectedTab,
    selectedTag,
  });

  const tabs = ["전체", ...new Set(posts.map((post) => post.category[0]))];
  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <>
      <HeadConfig
        title="Gyoungjun's Blog"
        summary="개인적으로 사용해보고 싶은 기술들을 적용해 만든 블로그입니다. 개발하면서 배운 것들을 기록하고 아카이빙하는 공간으로 활용합니다. 실험하고 탐구한 기술들을 공유하며, 더 나은 개발 방법을 찾아가는 과정입니다. 🚀"
      />
      <Flex justify="center" css={{ width: "100%", maxWidth: "1300px" }}>
        <Main as="main">
          <Flex direction="column" gap={20} css={{ width: "100%" }}>
            <TabList
              tabs={tabs}
              selectedTab={selectedTab}
              onTabClick={setSelectedTab}
            />
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`}>
                  <PreviewContent post={post} />
                </Link>
              ))
            ) : (
              <Flex
                justify="center"
                align="center"
                css={{
                  width: "100%",
                  height: "148px",
                  backgroundColor: "white",
                }}
              >
                데이터 없음
              </Flex>
            )}
          </Flex>
        </Main>
        {!isMobile && !isTablet && (
          <Aside as="aside" direction="column">
            <Profile />
            <TagList
              tags={tags}
              selectedTag={selectedTag}
              onTagClick={setSelectedTag}
            />
          </Aside>
        )}
      </Flex>
    </>
  );
}
