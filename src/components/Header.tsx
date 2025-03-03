import styled from "@emotion/styled";
import { Flex } from "./common/Flex";
import Link from "next/link";
import { Typography } from "./common/Typography";
import Image from "next/image";
import { useBreakpoints } from "@/hooks/useBreakpoints";

const Wrapper = styled(Flex)`
  height: 60px;
  padding: 0 32px;

  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Header = () => {
  const { isDesktop } = useBreakpoints();

  return (
    <Wrapper justify="space-between" align="center">
      <Link href="/">
        <Typography as="h1" variant={isDesktop ? "title4" : "title5"}>
          {`Gyoungjun's Blog`}
        </Typography>
      </Link>
      <Link href="/portfolio">
        <Flex justify="flex-end" align="center" gap="4px">
          <Typography as="p" variant={isDesktop ? "body2" : "body3"}>
            포트폴리오
          </Typography>
          <Image
            src="/assets/icons/external-link.svg"
            alt="external-link"
            width={isDesktop ? 20 : 16}
            height={isDesktop ? 20 : 16}
          />
        </Flex>
      </Link>
    </Wrapper>
  );
};
