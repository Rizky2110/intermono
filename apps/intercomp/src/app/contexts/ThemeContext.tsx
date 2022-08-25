import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { listTheme } from "src/lib/theme";
import { UITheme } from "ui";

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

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> =
  function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    return (
      <ThemeContext.Provider value={ThemeController()}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const ThemeContextConsumer: React.FC<ThemeContextProviderProps> =
  function ThemeContextConsumer({ children }) {
    return (
      <ThemeContext.Consumer>
        {(ctx) => {
          const { theme } = ctx;
          return (
            <ThemeProvider theme={listTheme[theme]}>
              <UITheme theme={listTheme[theme]}>{children}</UITheme>
            </ThemeProvider>
          );
        }}
      </ThemeContext.Consumer>
    );
  };

export const useTheme = () => useContext(ThemeContext);
