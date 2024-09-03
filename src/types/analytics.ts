export interface TagEventProps {
  action: ACTION;
  category: CATEGORY;
  label: string;
  params?: any;
}

export enum CATEGORY {
  BUTTON = "button",
  LINK = "link",
  INPUT = "input",
  VIEW = "view",
}

export enum ACTION {
  CLICK = "click",
  CHANGE = "change",
  SUBMIT = "submit",
  VIEW = "view",
}

export enum SCREEN {
  HOME = "home",
  PAGINATION = "pagination",
  POST = "post",
  SEARCH = "search",
  MENU = "menu",
  NOT_FOUND = "not_found",
}
