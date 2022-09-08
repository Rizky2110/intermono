import React from "react";
import type { ForceSchedule } from "src/dto";
import { BaseInitialState } from "src/lib/constants";

export enum ForceScheduleKind {
  Pending = "FORCE_SCHEDULE/PENDING",
  Fullfilled = "FORCE_SCHEDULE/FULLFILLED",
  Rejected = "FORCE_SCHEDULE/REJECTED",
  Reset = "FORCE_SCHEDULE/RESET",
}

interface InitialStateForceSchedule extends BaseInitialState {
  data: ForceSchedule;
  message: string;
}

interface ForceScheduleAction {
  type: ForceScheduleKind;
  payload?: ForceSchedule;
}

export const INITIAL_STATE_FORCE_SCHEDULE: InitialStateForceSchedule = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  data: {
    status: false,
    message: "",
    result: {
      live_schedule: null,
    },
  },
  message: "",
};

export const forceScheduleReducer: React.Reducer<
  InitialStateForceSchedule,
  ForceScheduleAction
> = (state, action) => {
  const { type } = action;
  switch (type) {
    case ForceScheduleKind.Pending:
      return {
        ...state,
        isLoading: true,
      };
    case ForceScheduleKind.Fullfilled:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload as ForceSchedule,
      };

    case ForceScheduleKind.Rejected:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: "Failed to force update schedule",
      };

    case ForceScheduleKind.Reset:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
      };
    default:
      return state;
  }
};
