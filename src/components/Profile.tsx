import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";

export const Profile = () => {
  return (
    <Flex as="section" direction="column" gap={10}>
      <Typography as="h1" variant="title6">
        😃 Profile
      </Typography>
      <Flex
        direction="column"
        align="center"
        css={{ width: "100%", backgroundColor: "#fff" }}
      >
        
        <Typography variant="title6">이경준</Typography>
        <Typography variant="body4">프론트엔드 개발자</Typography>
      </Flex>
    </Flex>
  );
};
