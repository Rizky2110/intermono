import { DataRole } from "./role";

export type DataUser = {
  id: number;
  email_verified_at: string | null;
  phone?: string;
  name: string;
  email: string;
  last_login: string | null;
  active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  photo_path: string;
  roles: DataRole[];
};
