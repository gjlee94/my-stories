import styled from "@emotion/styled";
import { CSSProperties, JSX } from "react";

type TypographyElementType = keyof JSX.IntrinsicElements;

interface TypographyStyleProps {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
}

type TypographyVariant =
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "title5"
  | "title6"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "body5"
  | "body6"
  | "body7"
  | "body8"
  | "body9"
  | "body10"
  | "body11"
  | "body12";

export const TYPOGRAPHY_STYLES = {
  title1: { fontSize: 40, lineHeight: 1.4, fontWeight: 700 },
  title2: { fontSize: 36, lineHeight: 1.4, fontWeight: 700 },
  title3: { fontSize: 32, lineHeight: 1.4, fontWeight: 700 },
  title4: { fontSize: 28, lineHeight: 1.4, fontWeight: 700 },
  title5: { fontSize: 24, lineHeight: 1.4, fontWeight: 700 },
  title6: { fontSize: 20, lineHeight: 1.4, fontWeight: 700 },
  body1: { fontSize: 20, lineHeight: 1.5, fontWeight: 400 },
  body2: { fontSize: 18, lineHeight: 1.5, fontWeight: 400 },
  body3: { fontSize: 16, lineHeight: 1.5, fontWeight: 400 },
  body4: { fontSize: 14, lineHeight: 1.5, fontWeight: 400 },
  body5: { fontSize: 13, lineHeight: 1.5, fontWeight: 400 },
  body6: { fontSize: 12, lineHeight: 1.5, fontWeight: 400 },
  body7: { fontSize: 11, lineHeight: 1.5, fontWeight: 400 },
  body8: { fontSize: 10, lineHeight: 1.5, fontWeight: 400 },
  body9: { fontSize: 9, lineHeight: 1.5, fontWeight: 400 },
  body10: { fontSize: 8, lineHeight: 1.5, fontWeight: 400 },
  body11: { fontSize: 7, lineHeight: 1.5, fontWeight: 400 },
  body12: { fontSize: 6, lineHeight: 1.5, fontWeight: 400 },
} as const;

interface TypographyProps {
  as?: TypographyElementType;
  variant: TypographyVariant;
  children: React.ReactNode;
  css?: CSSProperties;
}

const StyledTypography = styled.p<{ variant: TypographyVariant }>`
  margin: 0;
  font-size: ${({ variant }) => TYPOGRAPHY_STYLES[variant].fontSize}px;
  line-height: ${({ variant }) => TYPOGRAPHY_STYLES[variant].lineHeight};
  font-weight: ${({ variant }) => TYPOGRAPHY_STYLES[variant].fontWeight};
`;

export const Typography = ({
  as,
  variant = "body3",
  children,
  ...props
}: TypographyProps) => {
  return (
    <StyledTypography as={as} variant={variant} {...props}>
      {children}
    </StyledTypography>
  );
};
