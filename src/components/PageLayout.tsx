import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";

const portfolioLink =
  "https://serious-curler-ce2.notion.site/98d45e81d19046bea98d6803e6cb4d3e?pvs=4";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column">
      <Flex
        as="header"
        justify="space-between"
        align="center"
        css={{ padding: "0 200px", borderBottom: "1px solid #e0e0e0" }}
      >
        <Typography as="h1" variant="title1">
          딸 아빠 개발자
        </Typography>
        <a href={portfolioLink} target="_blank">
          포트폴리오
        </a>
      </Flex>
      <Flex>{children}</Flex>
    </Flex>
  );
};
