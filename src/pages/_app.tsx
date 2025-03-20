import "../styles/globals.css";
import styled from "@emotion/styled";
import { Flex } from "@/components/common/Flex";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query/queryClient";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MyAppProps extends AppProps {
  tags: string[];
}

export const Wrapper = styled(Flex)`
  background-color: rgb(248, 248, 248);
  min-height: 100vh;
`;

function ErrorFallback({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: "/error",
      query: {
        message: error.message,
        previousPath: router.asPath,
      },
    });
  }, []);

  return null;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClientInstance] = useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientInstance}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ErrorBoundary fallback={ErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
            <Wrapper direction="column" align="center">
              <div style={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
                <Header />
              </div>
              <Component {...pageProps} />
            </Wrapper>
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;
