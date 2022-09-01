import {
  BaseServerSuccessPagination,
  DefaultRequest,
  ServerResponse,
} from "src/lib/constants";
import { DataGroup } from "./group";
import { DataSchedule } from "./schedule";

type Query = {
  page?: number;
  page_size?: number;
  component_type?: "breaker" | "beacon";
};

type LastRootData = {
  id: number;
  device_id: number;
  box_id: number | null;
  vehicle_id: number | null;
  driver_id: number | null;
  merchant_id: number;
  device_type_id: number;
  device_variant_id: number;
  active: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  device: any;
};

type LastData = {
  id: string;
  ip: string;
  datetime: string;
  schedule: string;
  update_schedule_on: string;
  start_on: string;
  connection: string;
  status: {
    modem: boolean;
    tv: boolean;
    addon: boolean;
  };
  firmware_version: string;
};

export type ComponentType = {
  id: number;
  name: string;
  description: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DataComponentBreaker = {
  id: number;
  unique_identity: string;
  serial: string;
  name: string;
  file_component_path: string;
  active: number;
  status: number;
  component_type_id: number;
  schedule_id: number;
  last_data_time: string | null;
  last_data_schedule: DataSchedule | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  last_publish_breaker: string | null;
  last_root_data: LastRootData | null;
  last_data: LastData | null;
  config_data: string | null;
  component_type: ComponentType;
  schedule: DataSchedule | null;
  groups: DataGroup[];
};

export type Breakers = ServerResponse<
  BaseServerSuccessPagination & {
    data: DataComponentBreaker[];
  }
>;

export type RequestComponentBreaker = DefaultRequest<Query, string>;
