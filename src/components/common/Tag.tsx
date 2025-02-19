import styled from "@emotion/styled";

const Wrapper = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border: 1px solid rgb(232, 232, 232);
  border-radius: 50px;
  background-color: ${({ active }) =>
    active ? "rgb(232, 232, 232)" : "rgb(255, 255, 255)"};
  padding: 4px 8px;
  width: fit-content;
`;

export const Tag = ({
  onClick,
  children,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <Wrapper active={active} onClick={onClick}>
      {children}
    </Wrapper>
  );
};
