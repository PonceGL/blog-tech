import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface PostData {
  id: string;
  title: string;
  cover: string;
  description: string;
  content: (PartialBlockObjectResponse | BlockObjectResponse)[];
}
