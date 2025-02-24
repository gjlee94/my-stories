import { Flex } from "../common/Flex";
import styled from "@emotion/styled";
import { Typography } from "../common/Typography";
import Image from "next/image";
const Wrapper = styled(Flex)``;

const ContactItem = styled.a`
  border-radius: 8px;
  padding: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    scale: 1.05;
    transition: all 0.2s ease-in-out;
  }
`;

export const ContactList = ({}: {}) => {
  return (
    <Wrapper direction="column" gap={10}>
      <Typography variant="title6">📞 Contact</Typography>
      <Flex align="center" justify="space-between" css={{ padding: "0 16px" }}>
        <ContactItem href="https://github.com/gyoungjun-dev">
          <Image
            src="/assets/icons/github-mark.svg"
            alt="github"
            width={36}
            height={36}
          />
        </ContactItem>
        <ContactItem href="mailto:injxgj@gmail.com">
          <Image
            src="/assets/icons/mail.svg"
            alt="e-mail"
            width={36}
            height={36}
          />
        </ContactItem>
        <ContactItem href="https://www.linkedin.com/in/gyoungjun-lee-684b722b8/">
          <Image
            src="/assets/icons/linkedin.svg"
            alt="linkedin"
            width={36}
            height={36}
          />
        </ContactItem>
      </Flex>
    </Wrapper>
  );
};
