import { DefaultTheme } from "styled-components";

export const PACKAGE_NAME = "core-must-update";
export const sayHello = () => `Hello World iam ${PACKAGE_NAME} package`;

export function hslToHex({ h, s, l }: { h: number; s: number; l: number }) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHsl(hex: string, offsetLightness = 0) {
  let r = 0;
  let g = 0;
  let b = 0;

  r = `0x${hex[1]}${hex[2]}` as unknown as number;
  g = `0x${hex[3]}${hex[4]}` as unknown as number;
  b = `0x${hex[5]}${hex[6]}` as unknown as number;

  r /= 255;
  b /= 255;
  g /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return `hsl(${h},${s}%,${l + offsetLightness}%)`;
}
function hexToHslObj(hex: string, offsetLightness = 0) {
  let r = 0;
  let g = 0;
  let b = 0;

  r = `0x${hex[1]}${hex[2]}` as unknown as number;
  g = `0x${hex[3]}${hex[4]}` as unknown as number;
  b = `0x${hex[5]}${hex[6]}` as unknown as number;

  r /= 255;
  b /= 255;
  g /= 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = parseFloat((h * 60).toFixed(2));

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(2);
  l = +(l * 100).toFixed(2);
  return { h, s, l: parseFloat((l + offsetLightness).toFixed(2)) };
}
export function shadeColor(hex: string, shade: number) {
  const hsl = hexToHslObj(hex, shade);
  return hslToHex(hsl);
}

export function hexToRgba(hex: string, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

export function themeColor(
  theme: DefaultTheme,
  color: string | undefined,
  defaultColor = "primary"
): string {
  let tempColor = defaultColor;
  if (color) {
    tempColor = color;
    const colorPalette = theme.colorPalette[color];
    if (colorPalette) tempColor = colorPalette;
    const colors = theme.colors[color];
    if (colors) tempColor = colors;
  }
  return tempColor;
}

export function addCookieHeader<T = string>(cookie?: T) {
  type HeaderCookie = {
    Cookie?: T;
  };

  const headers: HeaderCookie = {};

  if (cookie) {
    headers.Cookie = cookie;
    return headers;
  }

  return headers;
}
