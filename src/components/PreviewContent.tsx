import type { Post } from "@/types/post";
import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";
import { Tag } from "./common/Tag";
import { format } from "date-fns";

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
          padding: "16px",
        }}
      >
        <Flex direction="column" gap="6px">
          <Typography as="h2" variant="title4" css={{ marginBottom: "10px" }}>
            {post.title}
          </Typography>
          <Typography
            as="p"
            variant="body3"
            css={{ paddingBottom: "10px", whiteSpace: "pre-line" }}
          >
            {post.summary}
          </Typography>
          <Typography as="p" variant="body6">
            {format(new Date(post.createdTime), "yyyy년 MM월 dd일")}
          </Typography>
          <Flex gap={6} css={{ flexWrap: "wrap" }}>
            {post.tags.map((tag, idx) => (
              <Tag key={tag + idx}>{tag}</Tag>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};
