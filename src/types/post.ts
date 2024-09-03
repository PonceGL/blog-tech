import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { MultiSelect, Relation } from "./notion";

export interface PostData {
  id: string;
  title: string;
  cover: string;
  description: string;
  content: BlockObjectResponse[];
  relatedBlogs: Relation[];
  tags: MultiSelect[];
}

export interface PaginationParams {
  id: string;
  next: string;
}
