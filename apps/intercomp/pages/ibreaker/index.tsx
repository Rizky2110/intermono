import type { GetServerSideProps, NextLayout } from "next";
import styled from "styled-components";
import Image from "next/image";
import React from "react";
import { Layout, Tab, Tabs, TabLabel } from "components";
import { Box, Flex, IconButton, TBColumn, TextViewLink } from "ui/sc";
import dynamic from "next/dynamic";
import Cookies from "cookies";
import { IconProps } from "phosphor-react";
import BreakerView from "src/app/features/breaker/BreakerView";
import GroupView from "src/app/features/breaker/GroupView";
import wrapper from "src/app/store";
import { getAllBreakers } from "src/app/action";
import { useAppSelector } from "src/app/hook";
import { DataComponentBreaker } from "src/dto";

const StyledBreaker = styled("section")``;

const Cpu = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Cpu)
);

const Folder = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Folder)
);

const Eye = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Eye)
);

const ArrowClockwise = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.ArrowClockwise)
);

const CalendarPlus = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CalendarPlus)
);

const GearSix = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.GearSix)
);

const DownloadSimple = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.DownloadSimple)
);

const Breaker: NextLayout = function Breaker() {
  const [indexTab, setIndexTab] = React.useState(0);

  const { list } = useAppSelector((state) => state.breaker);

  const breakerColumns: TBColumn = [
    {
      id: "image",
      label: "",
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback(
        (value: DataComponentBreaker) => (
          <Box marginLeft="1rem">
            <Image
              alt=""
              src="/assets/image/board-128x128-navy.png"
              width={32}
              height={32}
            />
          </Box>
        ),
        []
      ),
    },
    {
      id: "serial_number",
      label: "Serial Number",
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback(
        (value: DataComponentBreaker) => (
          <Box>
            <TextViewLink>{value.serial}</TextViewLink>
          </Box>
        ),
        []
      ),
    },
    {
      id: "breaker_name",
      label: "Breaker Name",
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback(
        (value: DataComponentBreaker) => (
          <Box>
            <TextViewLink>{value.name}</TextViewLink>
          </Box>
        ),
        []
      ),
    },
    {
      id: "schedule_name",
      label: "Schedule Name",
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback(
        (value: DataComponentBreaker) => (
          <Box>
            <TextViewLink>
              {value?.schedule?.name || "No Schedule"}
            </TextViewLink>
          </Box>
        ),
        []
      ),
    },
    {
      id: "group",
      label: "Group",
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback((value: DataComponentBreaker) => {
        const length = value.groups.length;

        if (length === 0) {
          return <TextViewLink>No Group</TextViewLink>;
        }
        if (length <= 2) {
          return (
            <Flex gap="0.125rem">
              {value.groups.map((v) => (
                <TextViewLink key={v.id}>{v.name}</TextViewLink>
              ))}
            </Flex>
          );
        }
        return (
          <Flex gap="0.125rem">
            {value.groups.slice(0, 2).map((v) => (
              <TextViewLink key={v.id}>{v.name}</TextViewLink>
            ))}
          </Flex>
        );
      }, []),
    },
    {
      id: "action",
      label: "Action",
      cellAttr: {
        style: {
          width: "15rem",
        },
      },
      headCellAttr: {
        style: {
          textAlign: "center",
        },
      },
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback(
        (value: DataComponentBreaker) => (
          <Flex gap="0.125rem" style={{ justifyContent: "center" }}>
            <IconButton
              variant="standard"
              tooltip="Preview"
              palette="secondary"
              size="small"
            >
              <Eye weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Refresh"
              palette="secondary"
              size="small"
            >
              <ArrowClockwise weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Schedule"
              palette="secondary"
              size="small"
            >
              <CalendarPlus weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Setting"
              palette="secondary"
              size="small"
            >
              <GearSix weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Download"
              palette="secondary"
              size="small"
            >
              <DownloadSimple weight="fill" />
            </IconButton>
          </Flex>
        ),
        []
      ),
    },
  ];

  return (
    <StyledBreaker aria-label="breaker">
      <Tabs
        activeIndex={indexTab}
        onChangeTab={(index) => setIndexTab(index as number)}
      >
        <Tab
          index={0}
          label={
            <TabLabel
              title="Breaker"
              icon={<Cpu weight="fill" size={32} className="icon" />}
            />
          }
        >
          <BreakerView columns={breakerColumns} datas={list.result.data} />
        </Tab>

        <Tab
          index={1}
          label={
            <TabLabel
              title="Group"
              icon={<Folder weight="fill" size={32} className="icon" />}
            />
          }
        >
          <GroupView columns={breakerColumns} datas={list.result.data} />
        </Tab>
      </Tabs>
    </StyledBreaker>
  );
};

export default Breaker;

Breaker.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="iBreaker">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { req, res } = ctx;

    const cookies = new Cookies(req, res);

    const accessToken = cookies.get("access") || "";

    await store.dispatch(
      getAllBreakers({
        cookie: `access=${accessToken};`,
        datas: {
          page: 1,
          page_size: 10,
          component_type: "breaker",
        },
      })
    );

    return {
      props: {},
    };
  });
