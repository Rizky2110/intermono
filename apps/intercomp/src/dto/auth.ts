import { ServerResponse } from "src/lib/constants";
import { DataPermission } from "./permission";
import { DataRole } from "./role";

export type AuthLogin = ServerResponse<{
  name: string;
  phone?: string;
  email: string;
  roles: DataRole[];
  permissions: DataPermission[];
  photo?: string;
  token: string;
  created_at: string[];
  updated_at: string[];
  deleted_at: string[];
}>;

export type RequestLogin = {
  email: string;
  password: string;
  reCaptcha: string;
};

export type RequestMe = {
  token: string;
};
