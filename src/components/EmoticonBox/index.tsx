import styled from "@emotion/styled";
import { Emoticon, emoticonSet } from "./Emoticon";
import { Flex } from "../common/Flex";
const Wrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;

export const EmoticonBox = () => {
  const emotionList = Object.keys(emoticonSet) as Array<
    keyof typeof emoticonSet
  >;
  return (
    <Wrapper>
      <Flex gap={8}>
        {emotionList.map((key) => (
          <Emoticon key={key} type={key} count={0} />
        ))}
      </Flex>
    </Wrapper>
  );
};
