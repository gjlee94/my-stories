export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
} as const;

type BreakpointKey = keyof typeof breakpoints;

export const mediaQuery = (key: BreakpointKey) =>
  `@media (max-width: ${breakpoints[key]}px)`;
