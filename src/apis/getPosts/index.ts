import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import { Post } from "@/types/post";

export const getPosts = async () => {
  const id = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;
  const parsedId = idToUuid(id);

  const api = new NotionAPI();

  const pageResponse = await api.getPage(id);

  /** 노션 데이터베이스 (테이블, 갤러리 뷰 등) */
  const collection = Object.values(pageResponse.collection)[0]?.value;

  /** 페이지에 있는 모든 블록들*/
  const block = pageResponse.block;

  /** 테이블의 컬럼 정의 (예: 제목, 날짜, 태그 등) */
  const schema = collection?.schema;

  const rawMetadata = block[parsedId].value;

  const isNotDatabase =
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view";

  if (isNotDatabase) {
    return [];
  }

  const pageIds = getAllPageIds(pageResponse);

  const properties = (await getPageProperties(id, block, schema)) || null;

  const posts: Post[] = [...pageIds]
    .map((id) => {
      return {
        ...properties,
        createdTime: new Date(block[id].value?.created_time).toString(),
        fullWidth: (block[id].value?.format as any)?.page_full_width ?? false,
      };
    })
    .sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime);
      const dateB: any = new Date(b?.date?.start_date || b.createdTime);
      return dateB - dateA;
    });

  return posts;
};
