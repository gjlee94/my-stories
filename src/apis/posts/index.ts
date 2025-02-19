import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import getAllPageIds from "./utils/getAllPageIds";
import getPageProperties from "./utils/getPageProperties";

export const getPosts = async () => {
  let id = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;
  id = idToUuid(id);

  const api = new NotionAPI({
    activeUser: process.env.NEXT_PUBLIC_ACTIVE_NOTION_USER_ID,
    authToken: process.env.NEXT_PUBLIC_NOTION_AUTH_TOKEN,
  });

  const response = await api.getPage(id);

  /** 노션 데이터베이스 (테이블, 갤러리 뷰 등) */
  const collection = Object.values(response.collection)[0]?.value;

  /** 페이지에 있는 모든 블록들*/
  const block = response.block;

  /** 테이블의 컬럼 정의 (예: 제목, 날짜, 태그 등) */
  const schema = collection?.schema;

  const rawMetadata = block[id].value;

  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return [];
  }

  const pageIds = getAllPageIds(response);

  const data = [];
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const properties = (await getPageProperties(id, block, schema)) || null;
    // Add fullwidth, createdtime to properties
    properties.createdTime = new Date(block[id].value?.created_time).toString();
    properties.fullWidth =
      (block[id].value?.format as any)?.page_full_width ?? false;

    data.push(properties);
  }

  const posts = [...data].sort((a: any, b: any) => {
    const dateA: any = new Date(a?.date?.start_date || a.createdTime);
    const dateB: any = new Date(b?.date?.start_date || b.createdTime);
    return dateB - dateA;
  });

  return posts;
};
