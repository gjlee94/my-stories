import Link from "next/link";
import { Flex } from "../common/Flex";
import { Typography } from "../common/Typography";
import { Profile } from "../Profile";
import { Categories } from "../Categories";
import { Header, Wrapper } from "./styles";
import ExternalLink from "@/assets/icons/external_link.svg";

const portfolioLink =
  "https://serious-curler-ce2.notion.site/98d45e81d19046bea98d6803e6cb4d3e?pvs=4";

export const Layout = ({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories: string[];
}) => {
  console.log(ExternalLink);
  return (
    <Wrapper direction="column" align="center">
      <Header as="header" justify="space-between" align="center">
        <Link href="/posts">
          <Typography as="h1" variant="title1">
            딸 아빠 개발자
          </Typography>
        </Link>
        <a href={portfolioLink} target="_blank">
          <Flex justify="flex-end" align="center" gap="4px">
            <Typography as="p" variant="body2">
              포트폴리오
            </Typography>
            <ExternalLink width={20} height={20} />
          </Flex>
        </a>
      </Header>
      <Flex css={{ width: "100%" }}>
        <Flex
          as="aside"
          direction="column"
          css={{ padding: "20px", flex: "1 0 250px" }}
        >
          <Categories categories={categories} />
        </Flex>
        <Flex as="main">{children}</Flex>
        <Flex
          as="aside"
          direction="column"
          css={{ padding: "20px", flex: "1 0 250px" }}
        >
          <Profile />
        </Flex>
      </Flex>
      <Flex
        as="footer"
        css={{ position: "fixed", bottom: "0px", padding: "32px 200px" }}
      >
        Contacts
      </Flex>
    </Wrapper>
  );
};
