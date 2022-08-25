import React, { createContext, useContext, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

const ThemeController = () => {
  const [theme, setTheme] = useState("defaultTheme");
  return {
    theme,
    setTheme,
  };
};

export const ThemeContext = createContext<ReturnType<typeof ThemeController>>({
  theme: "defaultTheme",
  setTheme: () => {},
});

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

interface ThemeContextConsumerProps {
  children: React.ReactNode;
  themeList: { [key: string]: DefaultTheme };
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> =
  function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    return (
      <ThemeContext.Provider value={ThemeController()}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const ThemeContextConsumer: React.FC<ThemeContextConsumerProps> =
  function ThemeContextConsumer({ children, themeList }) {
    return (
      <ThemeContext.Consumer>
        {(ctx) => {
          const { theme } = ctx;
          return (
            <ThemeProvider theme={themeList[theme]}>{children}</ThemeProvider>
          );
        }}
      </ThemeContext.Consumer>
    );
  };

export const useTheme = () => useContext(ThemeContext);
