import styled from "@emotion/styled";
import { Tag } from "../common/Tag";

type EmoticonType = "like" | "dislike" | "heart";
export const emoticonSet: Record<EmoticonType, string> = {
  like: "👍",
  dislike: "👎",
  heart: "❤️",
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledEmoticon = styled.div<{ active?: boolean }>`
  cursor: pointer;
  position: relative;

  ${({ active }) => active && "transform: scale(1.1);"}
  ${Wrapper}:hover & {
    transform: scale(1.1);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1;
  display: none;
  width: 120px;
  white-space: pre-wrap;
  word-break: break-all;

  // 툴팁 화살표
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }

  ${Wrapper}:hover & {
    display: block;
  }
`;

export const Emoticon = ({
  type,
  count,
  clickedBy,
  active = false,
  onClick,
  disabled,
}: {
  type: "like" | "dislike" | "heart";
  count: number;
  clickedBy: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const tooltipText = clickedBy ? clickedBy : "아직 없음";

  return (
    <Wrapper>
      <Tag active={active} onClick={onClick} disabled={disabled}>
        <StyledEmoticon active={active}>
          {emoticonSet[type]}
          <Tooltip>{tooltipText}</Tooltip>
        </StyledEmoticon>
        <span>{count}</span>
      </Tag>
    </Wrapper>
  );
};
