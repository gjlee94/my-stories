import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { Flex } from "../common/Flex";
import { useEffect, useState } from "react";
import { Typography } from "../common/Typography";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { getIdToken, openLoginPopup } from "@/utils/auth";
import { addComment, Comment } from "@/apis/comments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/query/queryClient";
import { queries } from "@/query/queries";
const Wrapper = styled(Flex)``;

const RequireLoginRegion = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ disabled }) => disabled && `cursor: not-allowed;`}
`;

export const CommentBox = ({
  slug,
  token,
  handleLogin,
  username,
}: {
  slug: string;
  token: string;
  handleLogin: () => void;
  username: string;
}) => {
  const [comment, setComment] = useState("");

  const commentsQuery = useQuery(queries.comments.detail(slug));

  const addCommentMutation = useMutation({
    mutationFn: async (payload: { content: string; author: string }) => {
      try {
        const response = await addComment(slug, payload);
        return response;
      } catch (error) {
        // API 에러를 mutation의 onError로 전달
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comments.detail(slug));
    },
    onError: (error: any) => {
      console.error("Error in mutation:", error);

      alert("권한이 만료되었습니다. 다시 로그인해주세요.");
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("accessToken");
      window.location.reload();
    },
  });

  const handleWriteComment = () => {
    const payload = {
      content: comment,
      author: username ?? "gyoungjun_lee",
    };

    addCommentMutation.mutate(payload);
    setComment("");
  };

  return (
    <Wrapper direction="column" gap={16}>
      <Typography as="h1" variant="title5">
        {`댓글 ${addCommentMutation.data?.length ?? 0}개`}
      </Typography>
      {commentsQuery.isSuccess && <CommentList comments={commentsQuery.data} />}
      <CommentInput disabled={!token} value={comment} onChange={setComment} />
      <Flex justify="flex-end">
        {token === undefined && (
          <Button onClick={handleLogin}>로그인하고 댓글 작성하기</Button>
        )}
        {token !== undefined && (
          <Button onClick={handleWriteComment}>댓글 작성</Button>
        )}
      </Flex>
    </Wrapper>
  );
};
