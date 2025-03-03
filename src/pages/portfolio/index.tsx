import { Flex } from "@/components/common/Flex";
import styled from "@emotion/styled";
import { queryClient } from "@/query/queryClient";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { getRecordMap } from "@/components/NotionRenderer/getRecordMap";

import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import NotionRenderer from "@/components/NotionRenderer";

import { queries } from "@/query/queries";

const uuidToId = (uuid: string) => uuid.replaceAll("-", "");

export async function getStaticProps() {
  const recordMap = await getRecordMap(
    uuidToId(process.env.NEXT_PUBLIC_NOTION_PORTFOLIO_PAGE_ID)
  );

  console.log("recordMap", recordMap);

  await queryClient.prefetchQuery({
    queryKey: queries.portfolio.get(),
    queryFn: () => ({ recordMap }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
const Wrapper = styled(Flex)`
  max-width: 1200px;
  width: calc(100% - 60px);
  padding: 24px;
  margin: 24px 12px;
  max-height: fit-content;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 12px;
  background-color: white;

  @media screen and (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 12px;
  }
`;

type PortfolioDetail = {
  recordMap: {
    page: PageObjectResponse;
    blocks: BlockObjectResponse[];
  };
};

export default function PostDetailPage() {
  const portfolioQuery = useQuery<PortfolioDetail>({
    queryKey: queries.portfolio.get(),
  });

  return (
    <>
      {/* <HeadConfig
        title={portfolioQuery.data?.recordMap.page.title}
        summary={portfolioQuery.data?.recordMap.page.summary}
        tags={portfolioQuery.data?.recordMap.page.tags}
      /> */}
      <Wrapper direction="column" gap={20}>
        <NotionRenderer posts={portfolioQuery.data?.recordMap} />
      </Wrapper>
    </>
  );
}
