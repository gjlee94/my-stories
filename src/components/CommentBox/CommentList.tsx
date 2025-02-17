import styled from "@emotion/styled";
import { Flex } from "../common/Flex";

const Wrapper = styled(Flex)`
  height: 200px;
  border: 1px solid #ccc;
  padding: 16px;
`;

export const CommentList = () => {
  return <Wrapper direction="column"> (임시) 댓글 리스트</Wrapper>;
};
