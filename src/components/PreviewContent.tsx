import type { Post } from "@/types/post";
import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";
import { Tag } from "./common/Tag";
import Image from "next/image";

interface PreviewContentType {
  post: Post;
}

export const PreviewContent = ({ post }: PreviewContentType) => {
  return (
    <section key={post.slug}>
      <Flex
        direction="column"
        css={{
          overflow: "hidden",
          borderRadius: "16px",
          backgroundColor: "#fff",
          maxWidth: "1300px",
        }}
      >
        <Image
          src="/assets/dynamic-routing/cover.jpg"
          alt={`${post.slug}_cover_image`}
          layout="responsive" // 비율을 유지하며 부모의 maxWidth에 맞춤
          width={1300} // maxWidth에 맞는 너비 설정
          height={800} // 비율을 유지하기 위한 높이 설정 (적절한 값으로 설정)
          objectFit="cover" // 부모에 맞추되 이미지를 잘라 채움
        />

        <Flex direction="column" gap={10} css={{ padding: "16px" }}>
          <Typography as="h2" variant="title2">
            {post.title}
          </Typography>
          <Typography as="p" variant="body6">
            {post.date}
          </Typography>
          <Typography as="p" variant="body6">
            {post.excerpt}
          </Typography>
          <Flex gap={6}>
            {post.tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};
