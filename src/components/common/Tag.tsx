import styled from "@emotion/styled";

const Wrapper = styled.button<{ active?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border: ${({ active }) => (active ? "none" : "1px solid rgb(232, 232, 232)")};
  border-radius: 50px;
  background-color: ${({ active }) =>
    active ? "rgb(0, 123, 255)" : "rgb(255, 255, 255)"};
  color: ${({ active }) => (active ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)")};
  padding: 4px 8px;
  width: fit-content;
`;

export const Tag = ({
  onClick,
  children,
  active,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Wrapper
      active={active}
      onClick={!disabled ? onClick : () => alert("로그인이 필요합니다.")}
    >
      {children}
    </Wrapper>
  );
};
