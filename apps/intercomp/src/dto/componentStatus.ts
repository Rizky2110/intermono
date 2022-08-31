import { ServerResponse, DefaultRequest } from "src/lib/constants";

type Status = {
  online: number;
  offline: number;
  inactive: number;
  trouble: number;
};

export type DataComponentStatus = {
  breaker: Status;
};

export type ComponentStatus = ServerResponse<DataComponentStatus>;
export type RequestComponentStatus = DefaultRequest<
  Record<string, never>,
  string
>;
