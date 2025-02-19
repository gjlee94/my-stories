import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const buttonVariants = {
  primary: {
    backgroundColor: "#007bff",
    color: "white",
  },
  secondary: {
    backgroundColor: "#6c757d",
    color: "white",
  },
};

const buttonSizes = {
  small: {
    padding: "4px 8px",
  },
  medium: {
    padding: "8px 16px",
  },
  large: {
    padding: "12px 24px",
  },
};

const StyledButton = styled.button<ButtonProps>`
  ${({ variant }) => buttonVariants[variant]}
  ${({ size }) => buttonSizes[size]}


  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
