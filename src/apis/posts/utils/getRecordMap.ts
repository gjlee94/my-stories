import { NotionAPI } from "notion-client";

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI({
    activeUser: process.env.NEXT_PUBLIC_ACTIVE_NOTION_USER_ID,
    authToken: process.env.NEXT_PUBLIC_NOTION_AUTH_TOKEN,
  });
  const recordMap = await api.getPage(pageId);
  return recordMap;
};
