import { IconProps } from "phosphor-react";
import dynamic from "next/dynamic";
import React from "react";

export type Menu = {
  icon?: React.ReactNode;
  title: string;
  permissions: string[];
  extraIcon?: React.ReactNode;
  to?: string;
};

const CirclesFour = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CirclesFour)
);

const Cpu = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Cpu)
);

const CalendarCheck = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CalendarCheck)
);

const WifiHigh = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.WifiHigh)
);

const CCW = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.ClockCounterClockwise)
);

const GearSix = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.GearSix)
);

const CaretRight = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CaretRight)
);

const manuNavigationList: Menu[] = [
  {
    title: "Dashboard",
    permissions: [],
    icon: <CirclesFour weight="fill" size={32} className="icon" />,
    to: "/",
  },
  {
    title: "iBreaker",
    permissions: [],
    icon: <Cpu weight="fill" size={32} className="icon" />,
    to: "/ibreaker",
  },
  {
    title: "Time Schedule",
    permissions: [],
    icon: <CalendarCheck weight="fill" size={32} className="icon" />,
    to: "/schedule",
  },
  {
    title: "Sensor",
    permissions: [],
    icon: <WifiHigh weight="bold" size={32} className="icon" />,
    to: "/sensor",
  },
  {
    title: "History",
    permissions: [],
    icon: <CCW weight="fill" size={32} className="icon" />,
    to: "/logs",
  },
  {
    title: "Setting",
    permissions: [],
    icon: <GearSix weight="fill" size={32} className="icon" />,
    extraIcon: <CaretRight weight="bold" size={20} className="icon" />,
    to: "/setting",
  },
];

export default manuNavigationList;
