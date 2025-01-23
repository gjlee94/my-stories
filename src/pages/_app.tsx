import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { PageLayout } from "@/components/PageLayout";

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </CacheProvider>
  );
}

export default MyApp;
