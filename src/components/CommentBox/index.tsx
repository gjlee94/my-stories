import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { Flex } from "../common/Flex";
import { useState } from "react";
import { Typography } from "../common/Typography";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { openLoginPopup } from "@/utils/auth";
const Wrapper = styled(Flex)``;

const RequireLoginRegion = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ disabled }) => disabled && `cursor: not-allowed;`}
`;

export const CommentBox = ({}) => {
  /** TODO: 댓글 목록 조회 API 호출 */

  const [disabled, setDisabled] = useState(true);

  const handleLogin = () => {
    openLoginPopup();

    // TODO: authLogin 연동 필요
    // if (hasAuthToken()) {
    //   setDisabled(false);
    // }
    console.log("로그인 팝업 열기");
  };

  const handleWriteComment = () => {
    // TODO: 댓글 작성 API 호출
    console.log("댓글 작성");
  };

  return (
    <Wrapper direction="column" gap={16}>
      <Typography as="h1" variant="title5">
        댓글
      </Typography>
      <CommentList />
      <CommentInput disabled={disabled} />
      <Flex justify="flex-end">
        <Button onClick={handleLogin}>로그인하고 댓글 작성하기</Button>
        {disabled === false && (
          <Button onClick={handleWriteComment}>댓글 작성</Button>
        )}
      </Flex>
    </Wrapper>
  );
};
