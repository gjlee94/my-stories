import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { Flex } from "../common/Flex";
import { useState } from "react";
import { Typography } from "../common/Typography";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { addComment, deleteComment } from "@/apis/comments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queries } from "@/query/queries";

const Wrapper = styled(Flex)``;

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
      commentsQuery.refetch();
    },
    onError: (error: any) => {
      console.error("Error in mutation:", error);

      alert("권한이 만료되었습니다. 다시 로그인해주세요.");

      sessionStorage.removeItem("accessToken");

      window.location.reload();
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (params: { postId: string; commentId: string }) => {
      const response = await deleteComment(params.postId, params.commentId);
      return response;
    },
    onSuccess: () => {
      commentsQuery.refetch();
    },
    onError: (error: any) => {
      console.error("Error in mutation:", error);
    },
  });

  const handleWriteComment = () => {
    const payload = {
      content: comment,
      author: username ?? "-",
    };

    addCommentMutation.mutate(payload);
    setComment("");
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    deleteCommentMutation.mutate({ postId, commentId });
  };

  return (
    <Wrapper direction="column" gap={16}>
      <Typography as="h1" variant="title5">
        {`댓글 ${commentsQuery.data?.length ?? 0}개`}
      </Typography>
      {commentsQuery.isSuccess && (
        <CommentList
          comments={commentsQuery.data}
          username={username}
          onDeleteComment={handleDeleteComment}
        />
      )}
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
