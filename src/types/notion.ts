export type NotionDatabaseResult = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover: Cover;
  icon: null;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  url: string;
  public_url: null;
};

export type Cover = {
  type: string;
  external: External;
};

export type External = {
  url: string;
};

export type TedBy = {
  object: string;
  id: string;
};

export type Parent = {
  type: string;
  database_id: string;
};

export type Properties = {
  draft: Draft;
  slug: Description;
  description: Description;
  author: Author;
  date: DateClass;
  tags: Tags;
  title: Title;
};

export type Author = {
  id: string;
  type: string;
  people: PersonElement[];
};

export type PersonElement = {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: PersonPerson;
};

export type PersonPerson = {};

export type DateClass = {
  id: string;
  type: string;
  created_time: string;
};

export type Description = {
  id: string;
  type: string;
  rich_text: RichText[];
};

export type RichText = {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
};

export type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: ColorBlock;
};

export type Text = {
  content: string;
  link: null;
};

export type Draft = {
  id: string;
  type: string;
  checkbox: boolean;
};

export type Tags = {
  id: string;
  type: string;
  multi_select: MultiSelect[];
};

export type MultiSelect = {
  id: string;
  name: string;
  color: ColorBlock;
};

export type Title = {
  id: string;
  type: string;
  title: RichText[];
};

export type ColorBlock =
  | "blue"
  | "brown"
  | "default"
  | "gray"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "yellow";
