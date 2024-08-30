import { Client, collectPaginatedAPI } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getDatabases = async () => {
  try {
    const databases = await notion.databases.query({
      database_id: process.env.NOTION_DB ?? "",
      filter: {
        property: "draft",
        checkbox: {
          equals: false,
        },
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    return databases;
  } catch (error) {
    console.error("Error =>> ", error);
    throw new Error("Error fetching databases");
  }
};

export const getBlocks = async (id: string) => {
  if (!id) throw new Error("Error id block");
  try {
    const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: id,
    });

    return blocks as BlockObjectResponse[];
  } catch (error) {
    console.error("Error =>> ", error);
    throw new Error("Error fetching blocks");
  }
};
