import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import type { AlertPropsBase } from "./Alert";

const Alert = React.lazy(() => import("./Alert"));

interface StyledThemeProps {
  children: React.ReactNode;
  theme: DefaultTheme;
}

interface AlertContextProviderProps {
  children: React.ReactNode;
}

export interface ToastProps {
  id: number;
  title: string;
  description: string;
  type: "success" | "error" | "info";
}

export enum ToastKind {
  Add = "TOAST/ADD",
  Remove = "TOAST/REMOVE",
}

export interface ToastState {
  toasts: ToastProps[];
}

export const INITIAL_STATE_TOAST: ToastState = {
  toasts: [],
};

interface ToastAction {
  type: ToastKind;
  payload: ToastProps;
}

export const AlertController = () => {
  const [alertProps, setAlertProps] = React.useState<AlertPropsBase | null>(
    null
  );

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openAlert = (option: AlertPropsBase) => {
    setAlertProps(option);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (alertProps?.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setAlertProps(null);
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setAlertProps(null);
  };

  return {
    alertProps,
    setAlertProps,
    awaitingPromiseRef,
    openAlert,
    handleClose,
    handleSubmit,
  };
};
export const AlertContext = React.createContext<
  (option: AlertPropsBase) => Promise<void>
>(Promise.reject);

export const AlertContextProvider: React.FC<AlertContextProviderProps> =
  function AlertContextProvider({ children }: AlertContextProviderProps) {
    const { openAlert, alertProps, handleClose, handleSubmit } =
      AlertController();
    return (
      <AlertContext.Provider value={openAlert}>
        {children}
        <Alert
          open={!!alertProps}
          variant={alertProps?.variant}
          title={alertProps?.title || ""}
          message={alertProps?.message || ""}
          onCancel={handleClose}
          onConfirm={handleSubmit}
        />
      </AlertContext.Provider>
    );
  };

export const useAlert = () => React.useContext(AlertContext);

const toastReducer: React.Reducer<ToastState, ToastAction> = (
  state,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ToastKind.Add:
      return {
        ...state,
        toasts: [payload, ...state.toasts],
      };
    case ToastKind.Remove:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== payload.id),
      };
    default:
      return state;
  }
};

const ToastController = () => {
  const [toast, dispatchToast] = React.useReducer(
    toastReducer,
    INITIAL_STATE_TOAST
  );

  return {
    toast,
    dispatchToast,
  };
};

export const ToastContext = React.createContext<
  ReturnType<typeof ToastController>
>({
  toast: {
    toasts: [],
  },
  dispatchToast: () => {},
});

interface ToastContextProviderProps {
  children: React.ReactNode;
}

export const ToastContextProvider: React.FC<ToastContextProviderProps> =
  function ToastContextProvier({ children }: ToastContextProviderProps) {
    return (
      <ToastContext.Provider value={ToastController()}>
        {children}
      </ToastContext.Provider>
    );
  };

export const useToast = () => React.useContext(ToastContext);

export const StyledTheme: React.FC<StyledThemeProps> = function UITheme({
  theme,
  children,
}: StyledThemeProps) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContextProvider>
        <AlertContextProvider>{children}</AlertContextProvider>
      </ToastContextProvider>
    </ThemeProvider>
  );
};
