import { useState, useEffect } from "react";
import { breakpoints } from "@/styles/breakpoints";

export function useBreakpoints() {
  const [screenSize, setScreenSize] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // 클라이언트에서 초기 사이즈 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: screenSize !== null ? screenSize <= breakpoints.mobile : false,
    isTablet:
      screenSize !== null
        ? screenSize > breakpoints.mobile && screenSize <= breakpoints.tablet
        : false,
    isLaptop:
      screenSize !== null
        ? screenSize > breakpoints.tablet && screenSize <= breakpoints.laptop
        : false,
    isDesktop: screenSize !== null ? screenSize > breakpoints.laptop : false,
    isClient: screenSize !== null, // 클라이언트에서만 true
  };
}
