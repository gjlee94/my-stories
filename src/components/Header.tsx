import styled from "@emotion/styled";
import { Flex } from "./common/Flex";
import Link from "next/link";
import { Typography } from "./common/Typography";
import MenuIcon from "@/assets/icons/menu.svg";
import ExternalLinkIcon from "@/assets/icons/external-link.svg";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useState, useEffect } from "react";

const Wrapper = styled(Flex)`
  height: 60px;
  padding: 0 32px;
`;

const portfolioLink =
  "https://serious-curler-ce2.notion.site/98d45e81d19046bea98d6803e6cb4d3e?pvs=4";

export const Header = () => {
  const { isMobile } = useBreakpoints();

  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <Wrapper justify="space-between" align="center">
          <Link href="/posts">
            <Typography as="h1" variant="title4">
              딸 아빠 개발자
            </Typography>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon width={24} height={24} />
          </button>
        </Wrapper>
        {isOpen && (
          <a href={portfolioLink} target="_blank" style={{ width: "100%" }}>
            <Flex
              align="center"
              justify="center"
              css={{ height: "40px", width: "100%" }}
            >
              <Typography as="span" variant="body2">
                포트폴리오
              </Typography>
              <ExternalLinkIcon width={20} height={20} />
            </Flex>
          </a>
        )}
      </>
    );
  }

  return (
    <Wrapper justify="space-between" align="center">
      <Link href="/posts">
        <Typography as="h1" variant="title4">
          딸 아빠 개발자
        </Typography>
      </Link>
      <a href={portfolioLink} target="_blank">
        <Flex justify="flex-end" align="center" gap="4px">
          <Typography as="p" variant="body2">
            포트폴리오
          </Typography>
          <ExternalLinkIcon width={20} height={20} />
        </Flex>
      </a>
    </Wrapper>
  );
};
