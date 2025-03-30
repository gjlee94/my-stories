import styled from "@emotion/styled";
import { Flex } from "./common/Flex";
import Link from "next/link";
import { Typography } from "./common/Typography";
import Image from "next/image";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useRouter } from "next/router";

const Wrapper = styled(Flex)`
  height: 60px;
  padding: 0 32px;

  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Header = () => {
  const { isDesktop } = useBreakpoints();
  const router = useRouter();


  return (
    <Wrapper justify="space-between" align="center">
      <Link href="/">
        <Typography as="h1" variant={isDesktop ? "title4" : "title5"}>
          {`Gyoungjun's Blog`}
        </Typography>
      </Link>
    </Wrapper>
  );
};
