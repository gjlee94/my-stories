import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_AUTH_TOKEN,
});

export const getPosts = async () => {
  const databaseId = process.env.NEXT_PUBLIC_NOTION_PAGE_ID;

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

      console.log("properties: ", properties);

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
        summary: properties.summary?.rich_text[0]?.plain_text || "",
        like: properties.like?.number || 0,
        dislike: properties.dislike?.number || 0,
        heart: properties.heart?.number || 0,
      };
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const updateFeedBack = async (
  pageId: string,
  type: "like" | "dislike" | "heart"
) => {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        // 피드백 타입에 따른 속성 업데이트
        [type]: {
          number: 1, // 또는 기존 값에 1을 더하는 로직
        },
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating feedback:", error);
    throw error;
  }
};
