import {
  BaseServerSuccessPagination,
  DefaultRequest,
  ServerResponse,
} from "src/lib/constants";
import { ComponentType, DataComponentBreaker } from "./component";

type Output = {
  day: number;
  start_hour: number;
  end_hour: number;
};

export type DataSchedule = {
  id: number;
  creator_id: number;
  name: string;
  active: number;
  component_type_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  total_components?: number;
  identity: string;
  start_date: string;
  end_date: string;
  data: {
    start_date: string;
    end_date: string;
    schedules: {
      output_1: Output[];
      output_2: Output[];
      output_3: Output[];
    };
  };
  component_type: ComponentType;
  component_ids: DataComponentBreaker[];
  component: DataComponentBreaker[];
};

type DateLiveSchedule = {
  day: string;
  start: string;
  finish: string;
};

type LiveSchedule = {
  schedule_name: string;
  host: string;
  registered: boolean;
  interval: number;
  reboot: string;
  datetime: string;
  breaker_firmware_host: string;
  breaker_firmware_url: string;
  firmware_version: string;
  wifi: {
    ssid: string;
    pass: string;
  };
  output_1: {
    date: Omit<DateLiveSchedule, "day">[];
    days: DateLiveSchedule[];
  };
  output_2: {
    date: Omit<DateLiveSchedule, "day">[];
    days: DateLiveSchedule[];
  };
  output_3: {
    date: Omit<DateLiveSchedule, "day">[];
    days: DateLiveSchedule[];
  };
};

export type DataForceSchedule = {
  live_schedule: LiveSchedule | false | null;
};

export type ForceSchedule = ServerResponse<DataForceSchedule>;
export type Schedules = ServerResponse<
  BaseServerSuccessPagination & {
    data: Omit<DataSchedule, "component_ids" | "component">[];
  }
>;
export type Schedule = ServerResponse<DataSchedule>;

type Query = {
  page?: number;
  page_size?: number;
  filter_search?: string;
};

export type RequestSchedules = DefaultRequest<Query, string>;
export type RequestOneSchedule = DefaultRequest<{ id: string }, string>;