import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Layout } from "@/components/Layout";
import { getAllPosts } from "@/lib/posts";
import type { AppProps, AppContext } from "next/app";

const cache = createCache({ key: "css", prepend: true });

interface MyAppProps extends AppProps {
  categories: string[];
}

function MyApp({ Component, pageProps, categories }: MyAppProps) {
  return (
    <CacheProvider value={cache}>
      <Layout categories={categories}>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // appContext.ctx.req가 있다면 서버사이드
  if (appContext.ctx.req) {
    const posts = getAllPosts();
    const categories = [...new Set(posts.flatMap((post) => post.tags))];

    // 기존의 getInitialProps 결과와 병합
    const appProps = await appContext.Component.getInitialProps?.(
      appContext.ctx
    );

    return {
      pageProps: {
        ...appProps,
      },
      categories,
    };
  }

  return { pageProps: {}, categories: [] };
};

export default MyApp;
