import type { Post } from "@/types/post";
import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";
import { Tag } from "./common/Tag";

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
            {post.tags.map((tag, idx) => (
              <Tag key={tag + idx}>{tag}</Tag>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};
