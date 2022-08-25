import { createGlobalStyle, DefaultTheme } from "styled-components";
import { hexToHsl, shadeColor } from "core";

export type ColorPallete = {
  white: string;
  black: string;
  primary01: string;
  primary02: string;
  secondary01: string;
  secondary02: string;
  gray01: string;
  gray02: string;
  gray03: string;
  success01: string;
  success02: string;
  success03: string;
  danger01: string;
  danger02: string;
  danger03: string;
  info01: string;
  warning01: string;
  warning02: string;
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
};

const rootPalette: RootTheme = {
  primary01: "#1E1E24",
  primary02: "#EF8354",
  secondary01: "#FCE4DA",
  secondary02: "#FDF1EC",
  body: "#A6A6B5",
  success: "#51DC6B",
  danger: "#FB5758",
  info: "#34B3F1",
  warning: "#FEC124",
};

const paletteNormal: ColorPallete = {
  white: "#ffffff",
  black: "#000000",
  primary01: rootPalette.primary01,
  primary02: rootPalette.primary02,
  secondary01: rootPalette.secondary01,
  secondary02: rootPalette.secondary02,
  success01: rootPalette.success, // #51DC6B
  success02: shadeColor(rootPalette.success, 32.8), // #DCF9E1
  success03: shadeColor(rootPalette.success, 36.9),
  danger01: rootPalette.danger,
  danger02: shadeColor(rootPalette.danger, 25.7), // #FED7D7
  danger03: shadeColor(rootPalette.danger, 29.5), // #FEEBEB
  info01: rootPalette.info, // #34B3F1
  warning01: rootPalette.warning,
  warning02: shadeColor(rootPalette.warning, 39.2),
  gray01: "#A6A6B5",
  gray02: "#C7C7D1",
  gray03: "#E9E9ED",
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
    devider: paletteNormal.gray02,
    text: paletteNormal.primary01,
    sidebar: paletteNormal.primary01,
    sidebarText: paletteNormal.primary01,
    searchbox: paletteNormal.primary02,
    dashboardAccent: paletteNormal.secondary02,
  },
  width: {
    sidebar: "322px",
    sidebarClose: "88px",
    defaultRounded: "0.25em",
    modalSmall: "388.5px",
    modalMedium: "600px",
    modalLarge: "900px",
    modalExLarge: "1200px",
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
        body: paletteNormal.gray03,
        text: paletteNormal.gray01,
      },
    },
  },
};

const paletteDark: ColorPallete = {
  white: "#ffffff",
  black: "#000000",
  primary01: "#395B64",
  primary02: "#2C3333",
  secondary01: shadeColor("#395B64", 0),
  secondary02: "#598C9B",
  success01: rootPalette.success, // #51DC6B
  success02: shadeColor(rootPalette.success, 32.8), // #DCF9E1
  success03: shadeColor(rootPalette.success, 36.9),
  danger01: rootPalette.danger,
  danger02: shadeColor(rootPalette.danger, 25.7), // #FED7D7
  danger03: shadeColor(rootPalette.danger, 29.5), // #FEEBEB
  info01: rootPalette.info, // #34B3F1
  warning01: rootPalette.warning,
  warning02: shadeColor(rootPalette.warning, 39.2),
  gray01: "#A6A6B5",
  gray02: "#C7C7D1",
  gray03: "#E9E9ED",
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
export const darkTheme: DefaultTheme = {
  colorPalette: paletteDark,
  palette: {
    primary: {
      default: paletteDark.primary01,
      opposite: paletteDark.white,
    },
    secondary: {
      default: paletteDark.primary02,
      opposite: paletteDark.white,
    },
    info: {
      default: paletteDark.info01,
      opposite: paletteDark.white,
    },
    success: {
      default: paletteDark.success01,
      opposite: paletteDark.white,
    },
    error: {
      default: paletteDark.danger01,
      opposite: paletteDark.white,
    },
    light: {
      default: paletteDark.white,
      opposite: paletteDark.primary01,
    },
  },
  colors: {
    primary: paletteDark.primary01,
    secondary: paletteDark.primary02,
    info: paletteDark.info01,
    success: paletteDark.success01,
    error: paletteDark.danger01,
    body: shadeColor(paletteDark.primary02, 10),
    body1: paletteDark.neutral070,
    body2: paletteDark.neutral060,
    body3: paletteDark.neutral030,
    devider: paletteDark.gray03,
    text: paletteDark.white,
    sidebar: paletteDark.primary02,
    sidebarText: paletteDark.primary02,
    searchbox: paletteDark.primary01,
    dashboardAccent: paletteDark.secondary02,
  },
  width: {
    sidebar: "322px",
    sidebarClose: "88px",
    defaultRounded: "0.25em",
    modalSmall: "388.5px",
    modalMedium: "600px",
    modalLarge: "900px",
    modalExLarge: "1200px",
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
    alert: {
      success: {
        body: paletteDark.success03,
        button: paletteDark.success01,
      },
      error: {
        body: paletteDark.danger03,
        button: paletteDark.danger01,
      },
      warning: {
        body: paletteDark.warning02,
        button: paletteDark.warning01,
      },
    },
    badge: {
      success: {
        body: paletteDark.success03,
        text: paletteDark.success01,
      },
      error: {
        body: paletteDark.danger03,
        text: paletteDark.danger01,
      },
      info: {
        body: hexToHsl(paletteDark.info01, 30),
        text: paletteDark.info01,
      },
      disabled: {
        body: paletteDark.gray03,
        text: paletteDark.gray01,
      },
    },
  },
};

export const listTheme: { [key: string]: DefaultTheme } = {
  defaultTheme,
  darkTheme,
};

export const GlobalStyles = createGlobalStyle`
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${(props) => props.theme.colors.error};
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
