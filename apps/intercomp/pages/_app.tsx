import "../styles/global.css";
import "../public/nprogress.css";
import React from "react";
import { Connector } from "mqtt-react-hooks";
import type { AppProps } from "next/app";
import type { NextLayout } from "next";
import nProgress from "nprogress";
import { Settings } from "luxon";
import { Provider } from "react-redux";
import { GlobalStyles } from "src/lib/theme";

import {
  ThemeContextProvider,
  ThemeContextConsumer,
} from "src/app/contexts/ThemeContext";
import { useRouter } from "next/router";
import { NavbarContextProvider } from "src/app/contexts/NavbarContext";
import wrapper from "src/app/store";
import dynamic from "next/dynamic";

Settings.defaultZone = "Asia/Jakarta";

const Toast = dynamic<Record<string, unknown>>(() =>
  import("ui/sc").then((mod) => mod.Toast)
);
type TMqtt = {
  brokerUrl: string;
  options: {
    username: string;
    password: string;
    keepalive: number;
    clientId: string;
  };
};

const mqtt: TMqtt = {
  brokerUrl: process.env.NEXT_PUBLIC_MQTT_BROKER_URL || "",
  options: {
    username: process.env.NEXT_PUBLIC_MQTT_USERNAME || "",
    password: process.env.NEXT_PUBLIC_MQTT_PASSWORD || "",
    keepalive: 0,
    clientId: `app-intercomp-${new Date().getTime()}`,
  },
};

type AppLayoutProps = AppProps & {
  Component: NextLayout;
};

function MyApp({ Component, ...rest }: AppLayoutProps) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

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
    <Provider store={store}>
      <ThemeContextProvider>
        <ThemeContextConsumer>
          <NavbarContextProvider>
            <GlobalStyles />
            <Toast />
            <Connector brokerUrl={mqtt.brokerUrl} options={mqtt.options}>
              {getLayout(<Component {...props.pageProps} />)}
            </Connector>
          </NavbarContextProvider>
        </ThemeContextConsumer>
      </ThemeContextProvider>
    </Provider>
  );
}

export default MyApp;
