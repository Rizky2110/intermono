import React from "react";
import { DataComponentBreaker } from "src/dto";

export enum ModalKind {
  Configuration = "MODAL_BREAKER/CONFIGURATION",
  ForceUpdate = "MODAL_BREAKER/FORCE_UPDATE",
  Setting = "MODAL_BREAKER/SETTING",
  ResetModal = "MODAL_BREAKER/RESET",
}

interface InitialStateModal {
  isOpenConfiguration: boolean;
  isOpenForceUpdate: boolean;
  isOpenSetting: boolean;
  isOpenDownload: boolean;
  serial: string;
  id: number;
}

interface ModalAction {
  type: ModalKind;
  payload?: DataComponentBreaker;
}

export const INITIAL_STATE_MODAL: InitialStateModal = {
  isOpenConfiguration: false,
  isOpenForceUpdate: false,
  isOpenSetting: false,
  isOpenDownload: false,
  serial: "",
  id: -1,
};

export const modalReducer: React.Reducer<InitialStateModal, ModalAction> = (
  state,
  action
) => {
  const { type } = action;
  switch (type) {
    case ModalKind.Configuration:
      return {
        ...state,
        isOpenConfiguration: true,
        isOpenForceUpdate: false,
        isOpenSetting: false,
        isOpenDownload: false,
        serial: (action.payload as DataComponentBreaker).serial,
      };

    case ModalKind.ForceUpdate:
      return {
        ...state,
        isOpenConfiguration: false,
        isOpenForceUpdate: true,
        isOpenSetting: false,
        isOpenDownload: false,
        serial: (action.payload as DataComponentBreaker).serial,
      };
    case ModalKind.Setting:
      return {
        ...state,
        isOpenConfiguration: false,
        isOpenForceUpdate: false,
        isOpenSetting: true,
        isOpenDownload: false,
        id: (action.payload as DataComponentBreaker).id,
      };
    case ModalKind.ResetModal:
      return {
        ...state,
        isOpenConfiguration: false,
        isOpenForceUpdate: false,
        isOpenSetting: false,
        isOpenDownload: false,
      };
    default:
      return state;
  }
};
