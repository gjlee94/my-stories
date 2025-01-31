import { Flex } from "@/components/common/Flex";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/types/post";
import { PreviewContent } from "@/components/PreviewContent";
import Link from "next/link";
import { useState } from "react";
import { TabList } from "@/components/TabList";
import styled from "@emotion/styled";
import { Header } from "@/components/Header";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Profile } from "@/components/Profile";
import { TagList } from "@/components/TagList";

export const Main = styled(Flex)`
  max-width: 800px;
  flex: 1 1 800px;

  padding: 24px;
`;

export const Aside = styled(Flex)`
  min-width: 300px;
  flex: 1 1 300px;
  gap: 48px;

  padding: 24px;
`;

export async function getStaticProps() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  return {
    props: { posts, tags },
  };
}

interface PostsPageProps {
  posts: Post[];
  tags: string[];
}

export default function PostsPage({ posts, tags }: PostsPageProps) {
  const { isTablet, isMobile } = useBreakpoints();

  const tabs = ["전체", ...new Set(posts.map((post) => post.category))];
  const [selectedTab, setSelectedTab] = useState("전체");
  return (

      <Flex justify="center" css={{ maxWidth: "1200px" }}>
        <Main as="main">
          <Flex direction="column" gap={20}>
            <TabList
              tabs={tabs}
              selectedTab={selectedTab}
              onTabClick={setSelectedTab}
            />
            {posts
              .filter((post) => {
                if (selectedTab === "전체") return true;

                return post.category === selectedTab;
              })
              .map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <PreviewContent post={post} />
                </Link>
              ))}
          </Flex>
        </Main>
        {!isMobile && !isTablet && (
          <Aside as="aside" direction="column">
            <Profile />
            <TagList tags={tags} />
          </Aside>
        )}
      </Flex>
  );
}
