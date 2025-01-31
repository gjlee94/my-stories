import { Flex } from "../common/Flex";
import { Profile } from "../Profile";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Header } from "./Header";
import styled from "@emotion/styled";

export const Wrapper = styled(Flex)`
  height: 100vh;
  background-color: rgb(248, 248, 248);
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

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isTablet, isMobile } = useBreakpoints();
  return (
    <Wrapper direction="column" align="center">
      <div style={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
        <Header />
      </div>

      <Flex justify="center" css={{ maxWidth: "1200px" }}>
        <Main as="main">{children}</Main>
        {!isMobile && !isTablet && (
          <Aside as="aside" direction="column">
            <Profile />
          </Aside>
        )}
      </Flex>
    </Wrapper>
  );
};
