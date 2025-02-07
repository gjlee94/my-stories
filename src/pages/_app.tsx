import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import styled from "@emotion/styled";
import { Flex } from "@/components/common/Flex";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

const cache = createCache({ key: "css", prepend: true });

interface MyAppProps extends AppProps {
  tags: string[];
}

export const Wrapper = styled(Flex)`
  background-color: rgb(248, 248, 248);
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Wrapper direction="column" align="center">
            <div style={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
              <Header />
            </div>
            <Component {...pageProps} />
          </Wrapper>
        </HydrationBoundary>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
