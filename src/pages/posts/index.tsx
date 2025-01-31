import { Flex } from "@/components/common/Flex";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/types/post";
import { PreviewContent } from "@/components/PreviewContent";
import Link from "next/link";
import { useState } from "react";
import { TabList } from "@/components/TabList";

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
}

interface PostsPageProps {
  posts: Post[];
  categories: string[];
}

export default function PostsPage({ posts }: PostsPageProps) {
  const tabs = ["전체", ...new Set(posts.map((post) => post.category))];
  const [selectedTab, setSelectedTab] = useState("전체");
  return (
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
  );
}
