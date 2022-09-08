import { DefaultRequest, ServerResponse } from "src/lib/constants";

export type BodyConfig = {
  option:
    | "restart_breaker"
    | "restart_modem"
    | "restart_tv"
    | "restart_addon"
    | "force_relay"
    | "version_update";
  serial: string;
  value: number;
};

export type Config = ServerResponse<string>;
export type RequestConfigRestart = DefaultRequest<BodyConfig, string>;
export type RequestConfigOther = DefaultRequest<
  Omit<BodyConfig, "value">,
  string
>;
