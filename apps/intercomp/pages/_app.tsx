import "../styles/global.css";
import "../public/nprogress.css";
import React from "react";
import type { AppProps } from "next/app";
import type { NextLayout } from "next";
import { GlobalStyles, listTheme } from "src/lib/theme";

import {
  ThemeContextProvider,
  ThemeContextConsumer,
} from "src/app/contexts/ThemeContext";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { NavbarContextProvider } from "src/app/contexts/NavbarContext";
import { Settings } from "luxon";

Settings.defaultZone = "Asia/Jakarta";

type AppLayoutProps = AppProps & {
  Component: NextLayout;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  nProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 800,
    showSpinner: false,
  });

  React.useEffect(() => {
    const handleStart = () => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        <NavbarContextProvider>
          <GlobalStyles />
          {getLayout(<Component {...pageProps} />)}
        </NavbarContextProvider>
      </ThemeContextConsumer>
    </ThemeContextProvider>
  );
}

export default MyApp;
