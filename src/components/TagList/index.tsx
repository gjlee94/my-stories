import { Flex } from "../common/Flex";
import { Tag } from "../common/Tag";
import styled from "@emotion/styled";
import { Typography } from "../common/Typography";

const Wrapper = styled(Flex)``;

export const TagList = ({
  tags,
  selectedTags,
  onTagClick,
}: {
  tags: string[];
  selectedTags: Set<string>;
  onTagClick: (selectedTag: string) => void;
}) => {
  return (
    <Wrapper direction="column" gap={10}>
      <Typography variant="title6">🏷️ Tags</Typography>

      <Flex
        align="center"
        css={{ width: "100%", gap: "6px", flexWrap: "wrap" }}
      >
        {tags.map((tag) => {
          return (
            <Tag
              key={tag}
              active={selectedTags.has(tag)}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </Tag>
          );
        })}
      </Flex>
    </Wrapper>
  );
};
