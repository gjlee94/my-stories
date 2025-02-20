import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { Flex } from "../common/Flex";
import { useEffect, useState } from "react";
import { Typography } from "../common/Typography";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { getIdToken, openLoginPopup } from "@/utils/auth";
import { Comment } from "@/apis/comments";
const Wrapper = styled(Flex)``;

const RequireLoginRegion = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ disabled }) => disabled && `cursor: not-allowed;`}
`;

export const CommentBox = ({
  comments,
  onCommentSubmit,
}: {
  comments: Comment[];
  onCommentSubmit: (comment: string) => void;
}) => {
  /** TODO: 댓글 목록 조회 API 호출 */

  const [comment, setComment] = useState("");
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setToken(getIdToken());
  }, []);

  const handleLogin = () => {
    openLoginPopup();

    setToken(getIdToken());
  };

  const handleWriteComment = () => {
    // TODO: 댓글 작성 API 호출
    onCommentSubmit(comment);
    setComment("");
  };

  return (
    <Wrapper direction="column" gap={16}>
      <Typography as="h1" variant="title5">
        {`댓글 ${comments?.length ?? 0}개`}
      </Typography>
      {comments && <CommentList comments={comments} />}
      <CommentInput disabled={!token} value={comment} onChange={setComment} />
      <Flex justify="flex-end">
        {token === null && (
          <Button onClick={handleLogin}>로그인하고 댓글 작성하기</Button>
        )}
        {token !== undefined && (
          <Button onClick={handleWriteComment}>댓글 작성</Button>
        )}
      </Flex>
    </Wrapper>
  );
};
