import styled from "@emotion/styled";
import { Flex } from "../common/Flex";
import { Comment } from "@/apis/comments";
import { Typography } from "../common/Typography";
import { compareDesc, differenceInMinutes, format } from "date-fns";
import Image from "next/image";
import { css } from "@emotion/react";

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

const DeleteButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  color: #666;
  font-size: 12px;

  transition: all 0.2s ease;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  &:hover {
    background-color: #f0f0f0;
    color: #ff4444;
  }

  &:active {
    background-color: #e8e8e8;
    transform: scale(0.95);
  }
`;

export const CommentList = ({
  comments,
  username,
  onDeleteComment,
}: {
  comments: Comment[];
  username: string;
  onDeleteComment: (postId: string, commentId: string) => void;
}) => {
  if (comments.length === 0) {
    return <Wrapper direction="column">댓글이 없습니다.</Wrapper>;
  }
  return (
    <Wrapper direction="column">
      {[...comments]
        .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
        .map((comment) => (
          <CommentItem justify="space-between" align="center">
            <Flex key={comment.commentId} direction="column" gap={8}>
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
            </Flex>
            <DeleteButton
              disabled={username !== comment.author}
              onClick={() => onDeleteComment(comment.postId, comment.commentId)}
            >
              <Image
                src="/assets/icons/delete.svg"
                alt="delete"
                width={20}
                height={20}
              />
            </DeleteButton>
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
