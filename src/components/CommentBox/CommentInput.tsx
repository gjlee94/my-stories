import styled from "@emotion/styled";

const StyledCommentInput = styled.textarea<{ disabled: boolean }>`
  outline: 2px solid transparent;
  outline-offset: 2px;
  resize: none;

  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;

  ${({ disabled }) => disabled && `cursor: not-allowed;`}
`;

export const CommentInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <StyledCommentInput
      disabled={disabled}
      placeholder={
        disabled ? "로그인 후 댓글을 작성할 수 있습니다" : "댓글을 입력해주세요"
      }
    />
  );
};
