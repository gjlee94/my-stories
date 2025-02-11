import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";
import Image from "next/image";

export const Profile = () => {
  return (
    <Flex as="section" direction="column" gap={10}>
      <Typography as="h1" variant="title6">
        😃 Profile
      </Typography>
      <Flex
        direction="column"
        align="center"
        css={{ width: "100%", borderRadius: "16px", backgroundColor: "#fff" }}
      >
        <Image
          src="/assets/profile.png"
          alt="profile"
          priority
          width={200}
          height={210}
        />
        <Typography variant="title6">이경준</Typography>
        <Typography variant="body4">프론트엔드 개발자</Typography>
      </Flex>
    </Flex>
  );
};
