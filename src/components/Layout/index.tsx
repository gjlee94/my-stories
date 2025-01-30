import Link from "next/link";
import { Flex } from "../common/Flex";
import { Typography } from "../common/Typography";
import { Profile } from "../Profile";
import { Aside, Header, Main, Wrapper } from "./styles";
import ExternalLinkIcon from "@/assets/icons/external-link.svg";
import MenuIcon from "@/assets/icons/menu.svg";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const portfolioLink =
  "https://serious-curler-ce2.notion.site/98d45e81d19046bea98d6803e6cb4d3e?pvs=4";

export const Layout = ({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: string[];
}) => {
  const { isMobile } = useBreakpoints();
  //   const isMobile = false;

  console.log(ExternalLinkIcon);

  return (
    <Wrapper direction="column" align="center">
      <div style={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
        <Header justify="space-between" align="center">
          <Link href="/posts">
            <Typography as="h1" variant="title4">
              딸 아빠 개발자
            </Typography>
          </Link>

          {isMobile ? (
            <MenuIcon width={24} height={24} />
          ) : (
            <a href={portfolioLink} target="_blank">
              <Flex justify="flex-end" align="center" gap="4px">
                <Typography as="p" variant="body2">
                  포트폴리오
                </Typography>
                <ExternalLinkIcon width={20} height={20} />
              </Flex>
            </a>
          )}
        </Header>
      </div>

      <Flex justify="center" css={{ maxWidth: "1200px" }}>
        <Main as="main">{children}</Main>
        <Aside as="aside" direction="column">
          <Profile />
        </Aside>
      </Flex>
    </Wrapper>
  );
};
