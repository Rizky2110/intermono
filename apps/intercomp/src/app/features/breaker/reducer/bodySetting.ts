import React from "react";

export enum BodySettingKind {
  Interval = "BODY/INTERVAL",
  RestartTime = "BODY/RESTART_TIME",
  Connection = "BODY/CONNECTION",
  SSID = "BODY/SSID",
  Password = "BODY/PASSWORD",
  Version = "BODY/Version",
}

interface InitialBodySetting {
  interval: string;
  restartTime: string;
  connection: "lan" | "wifi";
  ssid: string;
  password: string;
  version: string;
}

interface BodySettingAction {
  type: BodySettingKind;
  payload: string;
}

export const INITIAL_BODY_SETTING: InitialBodySetting = {
  interval: "30",
  restartTime: "00:00",
  connection: "wifi",
  ssid: "Interads 1",
  password: "idntimes",
  version: "0",
};

export const bodySettingReducer: React.Reducer<
  InitialBodySetting,
  BodySettingAction
> = (state, action) => {
  const { type } = action;
  switch (type) {
    case BodySettingKind.Interval:
      return {
        ...state,
        interval: action.payload,
      };
    case BodySettingKind.RestartTime:
      return {
        ...state,
        restartTime: action.payload,
      };
    case BodySettingKind.Connection:
      return {
        ...state,
        connection: action.payload as "wifi" | "lan",
      };
    case BodySettingKind.SSID:
      return {
        ...state,
        ssid: action.payload,
      };
    case BodySettingKind.Password:
      return {
        ...state,
        password: action.payload,
      };

    case BodySettingKind.Version:
      return {
        ...state,
        version: action.payload,
      };
    default:
      return state;
  }
};
