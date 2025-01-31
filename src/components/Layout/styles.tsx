import styled from "@emotion/styled";
import { Flex } from "../common/Flex";

export const Wrapper = styled(Flex)`
  height: 100vh;
  background-color: rgb(248, 248, 248);
`;

export const Header = styled(Flex)`
  height: 60px;
  padding: 0 32px;
`;

export const Main = styled(Flex)`
  max-width: 800px;
  flex: 1 1 800px;

  padding: 24px;
`;

export const Aside = styled(Flex)`
  min-width: 300px;
  flex: 1 1 300px;

  padding: 24px;
`;
