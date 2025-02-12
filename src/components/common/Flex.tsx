import { Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { CSSProperties, JSX } from "react";

type FlexProps = {
  direction?: CSSProperties["flexDirection"];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: CSSProperties["flexWrap"];
  gap?: number | string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  css?: Interpolation<Theme>;
};

const StyledFlex = styled.div<Omit<FlexProps, "children" | "as">>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "stretch"};
  justify-content: ${({ justify }) => justify || "flex-start"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  gap: ${({ gap }) => (typeof gap === "number" ? `${gap}px` : gap || 0)};
`;

export const Flex = ({
  children,
  direction,
  align,
  justify,
  wrap,
  gap,
  as,
  ...props
}: FlexProps) => {
  return (
    <StyledFlex
      as={as}
      direction={direction}
      align={align}
      justify={justify}
      wrap={wrap}
      gap={gap}
      {...props}
    >
      {children}
    </StyledFlex>
  );
};
