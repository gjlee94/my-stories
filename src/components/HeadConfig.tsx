import Head from "next/head";
import ProfileImage from "../assets/images/profile.png";

interface HeadConfigProps {
  title: string;
  summary: string;
  tags: string[];
}

export const HeadConfig = ({ title, summary, tags }: HeadConfigProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={summary} />
      <meta name="keywords" content={tags.join(", ")} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta property="og:image" content={ProfileImage.src} />
    </Head>
  );
};
