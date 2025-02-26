import Head from "next/head";
import Script from "next/script";

interface HeadConfigProps {
  title: string;
  summary?: string;
  tags?: string[];
  slug?: string;
}

export const HeadConfig = ({ title, summary, tags, slug }: HeadConfigProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={summary} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      {tags && <meta name="keywords" content={tags.join(", ")} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/profile.png`}
      />
      <meta
        property="og:url"
        content={
          slug
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`
            : `${process.env.NEXT_PUBLIC_SITE_URL}`
        }
      />
      <meta property="og:type" content="website" />
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-9393302787267646"
        crossOrigin="anonymous"
      />
    </Head>
  );
};
