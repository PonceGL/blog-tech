import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface PostData {
  id: string;
  title: string;
  cover: string;
  description: string;
  content: BlockObjectResponse[];
}

export interface PaginationParams {
  id: string;
  next: string;
}
