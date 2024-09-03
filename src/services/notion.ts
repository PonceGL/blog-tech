import { Client, collectPaginatedAPI } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PaginationParams } from "../types/post";
import { postPerPage } from "../constants/ssr";
import { MultiSelect, NotionDatabaseResult } from "../types/notion";

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getDatabases = async (
  startCursor?: string,
  pageSize: number = postPerPage
) => {
  try {
    const databases = await notion.databases.query({
      database_id: process.env.NOTION_DB ?? "",
      page_size: pageSize,
      start_cursor: startCursor,
      filter: {
        property: "published",
        checkbox: {
          equals: true,
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

export const getPagination = async (): Promise<{
  pages: PaginationParams[];
}> => {
  const pages: PaginationParams[] = [];
  let hasMore = true;

  const getDatabaseInfo = async (cursor?: string) => {
    const { has_more, next_cursor } = await getDatabases(cursor);

    if (has_more && next_cursor) {
      return next_cursor;
    }
    return;
  };

  while (hasMore) {
    const next = await getDatabaseInfo(pages[pages.length - 1]?.next);
    if (next) {
      pages.push({
        id: String(pages.length + 2),
        next: next,
      });
    } else {
      hasMore = false;
    }
  }

  return { pages };
};

export const getTags = (post: NotionDatabaseResult[]) => {
  const tags = post.flatMap((result) => result.properties.tags.multi_select);

  const setObj = new Set(tags.map((value) => JSON.stringify(value, null, 2)));
  const output = Array.from(setObj).map((value: string) => JSON.parse(value));

  return { tags: output as MultiSelect[] };
};
