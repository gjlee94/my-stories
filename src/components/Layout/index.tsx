import { Flex } from "../common/Flex";
import { Profile } from "../Profile";
import { Aside, Main, Wrapper } from "./styles";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Header } from "./Header";

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
