import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Relation } from "./notion";

export interface PostData {
  id: string;
  title: string;
  cover: string;
  description: string;
  content: BlockObjectResponse[];
  relatedBlogs: Relation[];
}

export interface PaginationParams {
  id: string;
  next: string;
}
