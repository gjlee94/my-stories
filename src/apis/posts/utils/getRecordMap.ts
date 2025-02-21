import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_AUTH_TOKEN,
});

export const getRecordMap = async (pageId: string) => {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });

    // 블록 내용도 가져오기
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    return {
      page: response,
      blocks: blocks.results,
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
};
