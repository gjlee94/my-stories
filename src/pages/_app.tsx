import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import styled from "@emotion/styled";
import { Flex } from "@/components/common/Flex";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header";

const cache = createCache({ key: "css", prepend: true });

interface MyAppProps extends AppProps {
  tags: string[];
}

export const Wrapper = styled(Flex)`
  height: 100vh;
  background-color: rgb(248, 248, 248);
`;

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={cache}>
      <Wrapper direction="column" align="center">
        <div style={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
          <Header />
        </div>
        <Component {...pageProps} />
      </Wrapper>
    </CacheProvider>
  );
}

export default MyApp;
