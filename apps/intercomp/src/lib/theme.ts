import { createGlobalStyle, DefaultTheme } from "styled-components";
import { hexToHsl, shadeColor } from "core";

export type ColorPallete = {
  white: string;
  black: string;
  primary01: string;
  primary02: string;
  secondary01: string;
  secondary02: string;
  light01: string;
  light02: string;
  light03: string;
  success01: string;
  success02: string;
  success03: string;
  danger01: string;
  danger02: string;
  danger03: string;
  info01: string;
  info02: string;
  info03: string;
  warning01: string;
  warning02: string;
  warning03: string;
  neutral100: string;
  neutral090: string;
  neutral080: string;
  neutral070: string;
  neutral060: string;
  neutral050: string;
  neutral040: string;
  neutral030: string;
  neutral020: string;
  neutral010: string;
};

export type RootTheme = {
  primary01: string;
  primary02: string;
  secondary01: string;
  secondary02: string;
  body: string;
  danger: string;
  warning: string;
  success: string;
  info: string;
  light: string;
};

const rootPalette: RootTheme = {
  primary01: "#19223F",
  primary02: "#FC4549",
  secondary01: "#00C6FF",
  secondary02: "#FDF1EC",
  body: "#A6A6B5",
  success: "#4CAF50",
  danger: "#FC4549",
  info: "#00C6FF",
  warning: "#FFC107",
  light: "#A6A6B5",
};

const paletteNormal: ColorPallete = {
  white: "#ffffff",
  black: "#000000",
  primary01: rootPalette.primary01,
  primary02: rootPalette.primary02,
  secondary01: rootPalette.secondary01,
  secondary02: rootPalette.secondary02,
  success01: rootPalette.success,
  success02: shadeColor(rootPalette.success, 32.8),
  success03: shadeColor(rootPalette.success, 36.9),
  danger01: rootPalette.danger,
  danger02: shadeColor(rootPalette.danger, 25.7),
  danger03: shadeColor(rootPalette.danger, 29.5),
  info01: rootPalette.info, // #34B3F1
  info02: shadeColor(rootPalette.info, 32.8),
  info03: shadeColor(rootPalette.info, 36.9),
  warning01: rootPalette.warning,
  warning02: shadeColor(rootPalette.warning, 39.2),
  warning03: shadeColor(rootPalette.warning, 42),
  light01: rootPalette.light,
  light02: shadeColor(rootPalette.light, 12),
  light03: shadeColor(rootPalette.light, 24),
  neutral100: "#0A0A0A",
  neutral090: "#404040",
  neutral080: "#616161",
  neutral070: "#757575",
  neutral060: "#9e9e9e",
  neutral050: "#c2c2c2",
  neutral040: "#E0E0E0",
  neutral030: "#EDEDED",
  neutral020: "#F5F5F5",
  neutral010: "#FFFFFF",
};

export const defaultTheme: DefaultTheme = {
  colorPalette: paletteNormal,
  palette: {
    primary: {
      default: paletteNormal.primary01,
      opposite: paletteNormal.white,
    },
    secondary: {
      default: paletteNormal.primary02,
      opposite: paletteNormal.white,
    },
    info: {
      default: paletteNormal.info01,
      opposite: paletteNormal.white,
    },
    success: {
      default: paletteNormal.success01,
      opposite: paletteNormal.white,
    },
    error: {
      default: paletteNormal.danger01,
      opposite: paletteNormal.white,
    },
    light: {
      default: paletteNormal.white,
      opposite: paletteNormal.primary01,
    },
  },
  colors: {
    primary: paletteNormal.primary01,
    secondary: paletteNormal.primary02,
    info: paletteNormal.info01,
    success: paletteNormal.success01,
    error: paletteNormal.danger01,
    body: paletteNormal.white,
    body1: paletteNormal.neutral030,
    body2: paletteNormal.neutral040,
    body3: paletteNormal.neutral070,
    divider: paletteNormal.light02,
    text: paletteNormal.primary01,
    text1: paletteNormal.white,
    text2: paletteNormal.primary02,
    shadow: paletteNormal.black,
    shadow1: paletteNormal.white,
    shadow2: paletteNormal.primary02,
    accent: paletteNormal.secondary02,
  },
  width: {
    round: "0.5em",
  },
  typography: {
    size: {
      button: "1.25rem",
      sub1: "1.25rem",
      sub2: "1rem",
      sub3: "0.875rem",
      body1: "1rem",
      body2: "0.875rem",
      cap1: "0.75rem",
      cap2: "0.625rem",
      icon1: "1.5rem",
      icon2: "2rem",
      icon3: "2.5rem",
      title: "2rem",
    },
    weight: {
      button: 500,
      sub1: 700,
      sub2: 600,
      sub3: 500,
      body1: 500,
      body2: 400,
      cap1: 400,
      cap2: 400,
    },
    type: "Poppins",
    spacing: "0.01em",
    height: 1.5,
  },
  components: {
    appBar: {
      body: paletteNormal.primary01,
      text: paletteNormal.white,
      searchBox: paletteNormal.primary02,
    },
    alert: {
      success: {
        body: paletteNormal.success03,
        button: paletteNormal.success01,
      },
      error: {
        body: paletteNormal.danger03,
        button: paletteNormal.danger01,
      },
      warning: {
        body: paletteNormal.warning02,
        button: paletteNormal.warning01,
      },
    },
    badge: {
      success: {
        body: paletteNormal.success03,
        text: paletteNormal.success01,
      },
      error: {
        body: paletteNormal.danger03,
        text: paletteNormal.danger01,
      },
      info: {
        body: hexToHsl(paletteNormal.info01, 30),
        text: paletteNormal.info01,
      },
      disabled: {
        body: paletteNormal.light03,
        text: paletteNormal.light01,
      },
    },
  },
};

export const listTheme: { [key: string]: DefaultTheme } = {
  defaultTheme,
};

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${(props) => props.theme.colors.body};
    color: ${(props) => props.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: all 0.25s linear;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Poppins', sans-serif;
    margin-block-start: 0;
    letter-spacing: 0.01em;
    line-height: 1.5;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  h3 {
    font-size: 2rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h5 {
    font-size: 1.25rem;
    font-weight: 400;
  }

  p {
    margin-block-start: 0;
    letter-spacing: 0.01em;
  }

  ul {
    list-style: none;
  }

  input {
    font-family: inherit;
  }

  ._focused::after {
    transform: scaleX(1) translateX(0rem);
  }
`;
