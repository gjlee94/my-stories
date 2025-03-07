import { Client } from "@notionhq/client";

interface Page {
  id: string;
  createdTime: string;
  lastEditedTime: string;
  title: string;
  fullWidth: boolean;
  slug: string;
  category: string;
  tags: string[];
  status: string;
  summary: string;
  like: string;
  dislike: string;
  heart: string;
}

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});
const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export const getPosts = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "createdAt",
          direction: "descending",
        },
      ],
    });

    const posts = response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: page.id,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
        // properties에서 필요한 데이터 추출
        title: properties.title?.title[0]?.plain_text || "",
        // 기타 필요한 속성들 매핑
        fullWidth: page.format?.page_full_width ?? false,
        slug: properties.slug?.rich_text[0]?.plain_text || "",
        category: properties.category?.select?.name || "",
        tags:
          properties.tags?.multi_select?.map((item: any) => item.name) || [],
        status: properties.status?.status?.name || "",
        summary:
          properties.summary?.rich_text
            .map((item) => item.plain_text)
            .join("") || "",
        like: properties.like?.rich_text[0]?.plain_text || "",
        dislike: properties.dislike?.rich_text[0]?.plain_text || "",
        heart: properties.heart?.rich_text[0]?.plain_text || "",
      };
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
