export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Intercomp";
export const COPYRIGHT = process.env.NEXT_PUBLIC_COPYRIGHT || "Interads";

export const DATE_CONFIG = {
  format: {
    default_date_time: "dddd, DD MMMM YYYY - kk:mm:ss",
    default_date: "DD MMM YYYY",
  },
  timezone: "Asia/Jakarta",
};

export const CONSTANT_ACTION = {
  initial: "/PROCESS_INITIAL",
  success: "/PROCESS_SUCCESS",
  fail: "/PROCESS_FAILED",
  change_input: "/CHANGE_INPUT",
};

export const CONSTANT_ACTION_SELECT = {
  clear: "/PROCESS_CLEAR",
  attr: "/PROCESS_ATTR",
};

export const PROXY_REGEX = "/proxy";

export const PAGE_TITLE = "SIGNAGE APP";
export const PAGE_SUBTITLE = "SIGNAGE APP";
export const PAGE_META_DESCRIPTION = "SIGNAGE APP";
export const PAGE_CORP = "idntimes.com";
export const LANGUAGES = ["en", "id"];
type TSESSION = {
  PREFIX: string;
  SUFFIX: any;
};
export const SESSION: TSESSION = {
  PREFIX: "signage:",
  SUFFIX: {
    LANGUAGE: "lang",
    TOKEN: "token",
    TOKEN_EXPIRE: "token_expire",
    THEME: "theme",
    ACCOUNT_DATA: "account_data",
    ACCOUNT_USERNAME: "account_username",
    ACCOUNT_NAME: "account_name",
    ACCOUNT_EMAIL: "account_email",
    ACCOUNT_ROLES: "account_roles",
    ACCOUNT_PERMISSIONS: "account_permissions",
  },
};

export const ACTION = {
  INITIAL: "/Initial",
  SUCCESS: "/Success",
  FAIL: "/Fail",
};

export const RATIO_OPTIONS = [
  { value: 1, label: "3:1", option: "3:1" },
  { value: 2, label: "16:9", option: "16:9" },
];
export const SCREEN_RATIOS = { SIZE_3X1: 1, SIZE_16X9: 2 };
export type BaseInitialState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export type BasePagination = {
  page: number;
  page_size: number;
  order_direction: "asc" | "desc";
  search?: string;
};

export type BaseServerError = {
  status: string;
  message: string;
};

export type BaseServerSuccess = BaseServerError;

export type BaseRequestStatus = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
};

type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

export type BaseServerSuccessPagination = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: Link[];
};

export type DefaultResponse = {
  status: boolean;
  message: string;
};

interface HeaderCookie<T> {
  cookie?: T;
}

export interface ServerResponse<T> extends DefaultResponse {
  result: T;
}

export interface DefaultRequest<T extends object, C> extends HeaderCookie<C> {
  datas: T;
}

export interface DefaultError<T = []> {
  status: boolean;
  message: string;
  datas: T;
}
