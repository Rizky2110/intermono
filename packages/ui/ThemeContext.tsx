import React, { createContext, useContext, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

const ThemeController = () => {
  const [theme, setTheme] = useState("defaultTheme");
  return {
    theme,
    setTheme,
  };
};

export const UIContext = createContext<ReturnType<typeof ThemeController>>({
  theme: "defaultTheme",
  setTheme: () => {},
});

interface UIContextProviderProps {
  children: React.ReactNode;
}

interface UIContextConsumerProps {
  children: React.ReactNode;
  themeList: { [key: string]: DefaultTheme };
}

export const UIContextProvider: React.FC<UIContextProviderProps> =
  function UIContextProvider({ children }: UIContextProviderProps) {
    return (
      <UIContext.Provider value={ThemeController()}>
        {children}
      </UIContext.Provider>
    );
  };

export const UIContextConsumer: React.FC<UIContextConsumerProps> =
  function UIContextConsumer({ children, themeList }) {
    return (
      <UIContext.Consumer>
        {(ctx) => {
          const { theme } = ctx;
          return (
            <ThemeProvider theme={themeList[theme]}>{children}</ThemeProvider>
          );
        }}
      </UIContext.Consumer>
    );
  };

interface UIThemeProps {
  children: React.ReactNode;
  theme: DefaultTheme;
}

export const UITheme: React.FC<UIThemeProps> = function UITheme({
  theme,
  children,
}: UIThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const useTheme = () => useContext(UIContext);
