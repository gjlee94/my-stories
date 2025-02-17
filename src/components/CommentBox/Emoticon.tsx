import { Flex } from "../common/Flex";
import styled from "@emotion/styled";
import { Tag } from "../common/Tag";

type EmoticonType = "like" | "dislike" | "heart";
export const emoticonSet: Record<EmoticonType, string> = {
  like: "👍",
  dislike: "👎",
  heart: "❤️",
};

const StyledEmoticon = styled.div<{ active?: boolean }>`
  cursor: pointer;

  ${({ active }) => active && "transform: scale(1.1);"}
  &:hover {
    transform: scale(1.1);
  }
`;

export const Emoticon = ({
  type,
  count,
  active = false,
  onClick,
}: {
  type: "like" | "dislike" | "heart";
  count: number;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Tag active={active} onClick={onClick}>
      <StyledEmoticon active={active}>{emoticonSet[type]}</StyledEmoticon>
      <span>{count}</span>
    </Tag>
  );
};
