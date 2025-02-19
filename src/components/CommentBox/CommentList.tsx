import styled from "@emotion/styled";
import { Flex } from "../common/Flex";
import { Comment } from "@/apis/comments";
import { Typography } from "../common/Typography";
import { format } from "date-fns";
const Wrapper = styled(Flex)`
  height: 200px;
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
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} direction="column" gap={4}>
          <Flex gap={4}>
            <Typography as="p" variant="body3">
              {comment.author}
            </Typography>
            <Typography as="p" variant="body3">
              {format(comment.createdAt, "yyyy-MM-dd")}
            </Typography>
          </Flex>
          <Typography as="p" variant="body3">
            {comment.content}
          </Typography>
        </CommentItem>
      ))}
    </Wrapper>
  );
};
