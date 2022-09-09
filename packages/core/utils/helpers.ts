import { DefaultTheme } from "styled-components";

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

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

export function random(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function getObjectSize(obj: object): number {
  return Object.keys(obj).length;
}

export function uriEncode(
  url: string,
  datas: object | Array<any>,
  parentKey = ""
): string {
  if (Array.isArray(datas) && datas.length > 0) {
    datas.forEach((data, key) => {
      if (
        (Array.isArray(data) || typeof data === "object") &&
        (data.length > 0 || getObjectSize(data) > 0)
      ) {
        url += uriEncode(url, data, String(key));
      } else if (parentKey && parentKey !== "")
        url += `${parentKey}[${String(key)}]=${encodeURI(data)}&`;
      else url += `${String(key)}=${encodeURI(data)}&`;
    });
  } else if (typeof datas === "object" && getObjectSize(datas) > 0) {
    Object.entries(datas).forEach(([key, data]) => {
      if (
        (Array.isArray(data) || typeof data === "object") &&
        (data.length > 0 || getObjectSize(data) > 0)
      ) {
        url += uriEncode(url, data, key);
      } else if (parentKey && parentKey !== "")
        url += `${parentKey}[${String(key)}]=${encodeURI(data)}&`;
      else url += `${String(key)}=${encodeURI(data)}&`;
    });
  }
  return url;
}

export function downloadFileURL(fileURL: string, fileName = "file") {
  return new Promise((resolve, reject) => {
    try {
      const url = fileURL;
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "blob";
      req.onload = () => {
        const blob = new Blob([req.response], {
          type: "application/octet-stream",
        });
        const isIE = false || !!document.DOCUMENT_NODE;
        if (isIE && typeof window.navigator.msSaveBlob !== "undefined") {
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          const blobURL =
            window.URL && window.URL.createObjectURL
              ? window.URL.createObjectURL(blob)
              : window.webkitURL.createObjectURL(blob);
          const tempLink = document.createElement("a");
          tempLink.style.display = "none";
          tempLink.href = blobURL;
          tempLink.setAttribute("download", fileName);

          // Safari thinks _blank anchor are pop ups. We only want to set _blank
          // target if the browser does not support the HTML5 download attribute.
          // This allows you to download files in desktop safari if pop up blocking
          // is enabled.
          if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
          }

          document.body.appendChild(tempLink);
          tempLink.click();

          // Fixes "webkit blob resource error 1"
          setTimeout(() => {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
          }, 200);
        }
        resolve({ status: true });
      };
      req.onerror = () => {
        resolve({ status: false });
      };
      req.send();
    } catch (e) {
      reject(e);
    }
  });
}

export function convertHouseInSecond(value: string) {
  const splited = value.split(":");

  return +splited[0] * 60 * 60 + +splited[1] * 60;
}

export function isMobile() {
  const isMobileDevice = /iPhone|iPad|iPod|Android|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );
  if (isMobileDevice) return true;
  return false;
}

export const mapDark = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ],
};
