import Head from "next/head";

interface HeadConfigProps {
  title: string;
  summary: string;
  tags: string[];
  slug: string;
}

export const HeadConfig = ({ title, summary, tags, slug }: HeadConfigProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={summary} />
      <meta name="keywords" content={tags.join(", ")} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/profile.png`}
      />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`}
      />
      <meta property="og:type" content="website" />
    </Head>
  );
};
