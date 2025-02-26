import dynamic from "next/dynamic";
import Image from "next/image";
import styled from "@emotion/styled";
import Link from "next/link";
import { Flex } from "../common/Flex";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

const NotionSkeleton = styled(Flex)`
  width: 100%;
  background: white;
  padding: 20px;
  gap: 24px;
  flex-direction: column;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;

  .skeleton-block {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    opacity: 0;
    animation: fadeIn 0.5s ease forwards, shimmer 1.5s infinite;
  }

  .header {
    height: 48px;
    width: 70%;
    animation-delay: 0.1s;
  }

  .content-block {
    height: 200px;
    width: 100%;
    animation-delay: 0.2s;
  }

  .sub-block {
    height: 120px;
    width: 90%;
    animation-delay: 0.3s;
  }

  .footer {
    height: 80px;
    width: 95%;
    animation-delay: 0.4s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  {
    ssr: false,
    loading: () => (
      <NotionSkeleton>
        <div className="skeleton-block header" />
        <div className="skeleton-block content-block" />
        <div className="skeleton-block sub-block" />
        <div className="skeleton-block content-block" />
        <div className="skeleton-block sub-block" />
        <div className="skeleton-block footer" />
      </NotionSkeleton>
    ),
  }
);

const Code = dynamic(
  () =>
    import("react-notion-x/build/third-party/code").then(async (m) => m.Code),
  {
    ssr: false,
    loading: () => (
      <NotionSkeleton>
        <div className="skeleton-block content-block" />
      </NotionSkeleton>
    ),
  }
);

const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    ),
  {
    ssr: false,
    loading: () => (
      <NotionSkeleton>
        <div className="skeleton-block content-block" />
      </NotionSkeleton>
    ),
  }
);
const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
  {
    ssr: false,
    loading: () => (
      <NotionSkeleton>
        <div className="skeleton-block content-block" />
      </NotionSkeleton>
    ),
  }
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
    loading: () => (
      <NotionSkeleton>
        <div className="skeleton-block content-block" />
      </NotionSkeleton>
    ),
  }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

interface NotionRendererProps {
  posts: any;
}

const StyledWrapper = styled.div`
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
    min-width: 100%;
  }
`;

export default function NotionRenderer({ posts }: NotionRendererProps) {
  return (
    <StyledWrapper>
      <_NotionRenderer
        recordMap={posts}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </StyledWrapper>
  );
}
