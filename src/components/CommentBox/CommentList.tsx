import styled from "@emotion/styled";
import { Flex } from "../common/Flex";
import { Comment } from "@/apis/comments";
import { Typography } from "../common/Typography";
import { compareDesc, differenceInMinutes, format } from "date-fns";
const Wrapper = styled(Flex)`
  height: 100%;
  border: 1px solid #ccc;
  padding: 16px;
`;

const CommentItem = styled(Flex)`
  padding: 8px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentList = ({ comments }: { comments: Comment[] }) => {
  if (comments.length === 0) {
    return <Wrapper direction="column">댓글이 없습니다.</Wrapper>;
  }
  return (
    <Wrapper direction="column">
      {[...comments]
        .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
        .map((comment) => (
          <CommentItem key={comment.commentId} direction="column" gap={8}>
            <Flex gap={12}>
              <Typography as="p" variant="body3">
                {comment.author}
              </Typography>
              <Typography as="p" variant="body3">
                {parseSpendTime(comment.createdAt)}
              </Typography>
            </Flex>
            <Typography as="p" variant="body3">
              <span css={{ position: "relative", top: "-2px" }}>↳</span>{" "}
              {comment.content}
            </Typography>
          </CommentItem>
        ))}
    </Wrapper>
  );
};

const parseSpendTime = (targetDate: Date) => {
  const now = new Date();
  const diff = differenceInMinutes(now, targetDate);
  if (diff < 60) {
    return `${diff}분 전`;
  }
  if (diff < 24 * 60) {
    return `${Math.floor(diff / 60)}시간 전`;
  }
  if (diff < 24 * 60 * 60) {
    return `${Math.floor(diff / (24 * 60))}일 전`;
  }
  return format(targetDate, "yyyy-MM-dd");
};
