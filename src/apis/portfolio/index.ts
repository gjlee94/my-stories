import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});

export const getPortfolio = async () => {
  const response = await notion.pages.retrieve({
    page_id: process.env.NEXT_PUBLIC_NOTION_PORTFOLIO_PAGE_ID,
  });

  return response;
};
