import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_AUTH_TOKEN,
});

async function getPageProperties(pageId: string) {
  try {
    const page = await notion.pages.retrieve({
      page_id: pageId,
    });

    const properties: any = {
      id: page.id,
    };

    // Notion API v2에서는 properties가 더 구조화되어 있습니다
    Object.entries(page.properties).forEach(
      ([key, property]: [string, any]) => {
        switch (property.type) {
          case "title":
            properties[key] = property.title[0]?.plain_text || "";
            break;
          case "rich_text":
            properties[key] = property.rich_text[0]?.plain_text || "";
            break;
          case "date":
            properties[key] = property.date;
            break;
          case "select":
            properties[key] = property.select?.name
              ? [property.select.name]
              : [];
            break;
          case "multi_select":
            properties[key] = property.multi_select.map(
              (item: any) => item.name
            );
            break;
          case "people":
            properties[key] = property.people.map((person: any) => ({
              id: person.id,
              name: person.name,
              profile_photo: person.avatar_url,
            }));
            break;
          case "files":
            properties[key] =
              property.files[0]?.file?.url ||
              property.files[0]?.external?.url ||
              undefined;
            break;
        }
      }
    );

    return properties;
  } catch (error) {
    console.error("Error fetching page properties:", error);
    return null;
  }
}

export { getPageProperties as default };
