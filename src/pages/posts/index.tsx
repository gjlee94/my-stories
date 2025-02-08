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

const Main = styled(Flex)`
  max-width: 800px;
  flex: 1 1 800px;

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const filterPosts = ({
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

    return matchTab && matchTag;
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

  const filteredPosts = filterPosts({
    selectedTab,
    selectedTag,
  });

  const tabs = ["전체", ...new Set(posts.map((post) => post.category[0]))];
  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <Flex justify="center">
      <Main as="main">
        <Flex direction="column" gap={20}>
          <TabList
            tabs={tabs}
            selectedTab={selectedTab}
            onTabClick={setSelectedTab}
          />
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <PreviewContent post={post} />
              </Link>
            ))
          ) : (
            <Flex css={{ width: "100%" }}>데이터 없음</Flex>
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
  );
}
