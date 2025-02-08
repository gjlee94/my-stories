import { Flex } from "../common/Flex";
import { Tag } from "../common/Tag";
import styled from "@emotion/styled";
import { Typography } from "../common/Typography";

const Wrapper = styled(Flex)``;

export const TagList = ({
  tags,
  selectedTag,
  onTagClick,
}: {
  tags: string[];
  selectedTag: string | undefined;
  onTagClick: (tag: string) => void;
}) => {
  return (
    <Wrapper direction="column" gap={10}>
      <Typography variant="title6">🏷️ Tags</Typography>

      <Flex align="center" css={{ width: "100%", gap: "6px" }}>
        {tags.map((tag) => {
          return (
            <Tag
              key={tag}
              active={selectedTag === tag}
              onClick={() => onTagClick(selectedTag === tag ? undefined : tag)}
            >
              {tag}
            </Tag>
          );
        })}
      </Flex>
    </Wrapper>
  );
};
