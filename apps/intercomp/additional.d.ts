import "next";
import type { NextPage } from "next";
import React from "react";

declare module "next" {
  export type NextLayout<P = Record<string, unknown>> = NextPage<P> & {
    getLayout?: (
      page: React.ReactNode,
      permission?: string[]
    ) => React.ReactNode;
  };
}

declare global {
  interface HTMLDialogElement {
    showModal: () => void;
    close: () => void;
    open: boolean;
  }
}
