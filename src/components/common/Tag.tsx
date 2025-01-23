import { Flex } from "./Flex";

export const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      css={{
        borderRadius: "50px",
        backgroundColor: "rgb(232, 232, 232)",
        padding: "4px 8px",
      }}
    >
      {children}
    </Flex>
  );
};
