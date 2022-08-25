import { DefaultTheme, ThemeProvider } from "styled-components";

interface StyledThemeProps {
  children: React.ReactNode;
  theme: DefaultTheme;
}

export const StyledTheme: React.FC<StyledThemeProps> = function UITheme({
  theme,
  children,
}: StyledThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
