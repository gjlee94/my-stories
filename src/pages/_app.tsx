import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import styled from "@emotion/styled";
import { Flex } from "@/components/common/Flex";
import { getAllPosts } from "@/lib/posts";
import type { AppProps, AppContext } from "next/app";
import { Header } from "@/components/Header";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { TagList } from "@/components/TagList";
import { Profile } from "@/components/Profile";

const cache = createCache({ key: "css", prepend: true });

interface MyAppProps extends AppProps {
  tags: string[];
}
export const Wrapper = styled(Flex)`
  height: 100vh;
  background-color: rgb(248, 248, 248);
`;

export const Main = styled(Flex)`
  max-width: 800px;
  flex: 1 1 800px;

  padding: 24px;
`;

export const Aside = styled(Flex)`
  min-width: 300px;
  flex: 1 1 300px;
  gap: 48px;

  padding: 24px;
`;

function MyApp({ Component, pageProps, tags }: MyAppProps) {
  const { isTablet, isMobile } = useBreakpoints();

  return (
    <CacheProvider value={cache}>
      <Wrapper direction="column" align="center">
        <div style={{ width: "100%", borderBottom: "1px solid #e0e0e0" }}>
          <Header />
        </div>

        <Flex justify="center" css={{ maxWidth: "1200px" }}>
          <Main as="main">
            <Component {...pageProps} />
          </Main>
          {!isMobile && !isTablet && (
            <Aside as="aside" direction="column">
              <Profile />
              <TagList tags={tags} />
            </Aside>
          )}
        </Flex>
      </Wrapper>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // appContext.ctx.req가 있다면 서버사이드
  if (appContext.ctx.req) {
    const posts = getAllPosts();
    const tags = [...new Set(posts.flatMap((post) => post.tags))];

    // 기존의 getInitialProps 결과와 병합
    const appProps = await appContext.Component.getInitialProps?.(
      appContext.ctx
    );

    return {
      pageProps: {
        ...appProps,
      },
      tags,
    };
  }

  return { pageProps: {}, tags: [] };
};

export default MyApp;
