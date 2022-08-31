import "styled-components";

declare module "styled-components" {
  type TPalette = {
    default: string;
    opposite: string;
  };

  type TAlert = {
    success: {
      body: string;
      button: string;
    };
    error: {
      body: string;
      button: string;
    };
    warning: {
      body: string;
      button: string;
    };
  };
  type TBadge = {
    success: {
      body: string;
      text: string;
    };
    error: {
      body: string;
      text: string;
    };
    info: {
      body: string;
      text: string;
    };
    disabled: {
      body: string;
      text: string;
    };
  };
  type TAppBar = {
    body: string;
    text: string;
    searchBox: string;
  };
  export interface DefaultTheme {
    colorPalette: {
      [key: string]: string;
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
    width: {
      round: string;
    };
    palette: {
      [key: string]: TPalette;
      primary: TPalette;
      secondary: TPalette;
      info: TPalette;
      success: TPalette;
      warning: TPalette;
      error: TPalette;
    };
    colors: {
      [key: string]: string;
      primary: string;
      secondary: string;
      info: string;
      success: string;
      error: string;
      body: string;
      body1: string;
      body2: string;
      divider: string;
      text: string;
      text1: string;
      text2: string;
      accent: string;
      shadow: string;
      shadow1: string;
      shadow2: string;
    };
    typography: {
      size: {
        button: string;
        sub1: string;
        sub2: string;
        sub3: string;
        body1: string;
        body2: string;
        cap1: string;
        cap2: string;
        icon1: string;
        icon2: string;
        icon3: string;
        title: string;
      };
      weight: {
        button: number;
        sub1: number;
        sub2: number;
        sub3: number;
        body1: number;
        body2: number;
        cap1: number;
        cap2: number;
      };
      type: string;
      spacing: string;
      height: number;
    };
    components: {
      alert: TAlert;
      badge: TBadge;
      appBar: TAppBar;
    };
  }
}
