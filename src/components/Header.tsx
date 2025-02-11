import styled from "@emotion/styled";
import { Flex } from "./common/Flex";
import Link from "next/link";
import { Typography } from "./common/Typography";
import Image from "next/image";

const Wrapper = styled(Flex)`
  height: 60px;
  padding: 0 32px;
`;

const portfolioLink =
  "https://serious-curler-ce2.notion.site/98d45e81d19046bea98d6803e6cb4d3e?pvs=4";

export const Header = () => {
  return (
    <Wrapper justify="space-between" align="center">
      <Link href="/">
        <Typography as="h1" variant="title4">
          Gyoungjun's Blog
        </Typography>
      </Link>
      <a href={portfolioLink} target="_blank">
        <Flex justify="flex-end" align="center" gap="4px">
          <Typography as="p" variant="body2">
            포트폴리오
          </Typography>
          <Image
            src="/assets/icons/external-link.svg"
            alt="external-link"
            width={20}
            height={20}
          />
        </Flex>
      </a>
    </Wrapper>
  );
};
