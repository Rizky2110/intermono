import type { GetServerSideProps, NextLayout } from "next";
import styled from "styled-components";
import Image from "next/image";
import React from "react";
import { Layout, Tab, Tabs, TabLabel } from "components";
import { useDebounce } from "core";
import { downloadFileURL } from "core/utils";
import { DateTime } from "luxon";
import {
  Box,
  ButtonLink,
  Flex,
  IconButton,
  IconButtonLink,
  TBColumn,
  TextView,
  TextViewLink,
  useAlert,
} from "ui/sc";
import dynamic from "next/dynamic";
import Cookies from "cookies";
import { IconProps } from "phosphor-react";
import BreakerView from "src/app/features/breaker/BreakerView";
import GroupView from "src/app/features/breaker/GroupView";
import {
  ModalKind,
  INITIAL_STATE_MODAL,
  modalReducer,
} from "src/app/features/breaker/reducer";
import wrapper from "src/app/store";
import {
  deleteOneGroup,
  getAllBreakers,
  getAllGroups,
  resetBreaker,
  resetGroup,
} from "src/app/action";
import { useAppDispatch, useAppSelector } from "src/app/hook";
import { DataComponentBreaker, Group } from "src/dto";

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

const TrashSimple = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.Trash)
);

const ModalResetBreaker = dynamic(
  () => import("src/app/features/breaker/ModalResetBreaker"),
  {
    ssr: false,
  }
);

const ModalForceSchedule = dynamic(
  () => import("src/app/features/breaker/ModalForceSchedule"),
  {
    ssr: false,
  }
);

const ModalSetting = dynamic(
  () => import("src/app/features/breaker/ModalSetting"),
  {
    ssr: false,
  }
);

type GroupColumn = Group["result"];

type ButtonAttributes = {
  "data-id": {
    value: number;
  };
};

const Breaker: NextLayout = function Breaker() {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const [indexTab, setIndexTab] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [searchGroup, setSearchGroup] = React.useState("");
  const [isDownload, setIsDownload] = React.useState(false);
  const [modalState, dispatchModal] = React.useReducer(
    modalReducer,
    INITIAL_STATE_MODAL
  );

  const {
    list,
    isLoading: isLoadingBreaker,
    isSuccess: isSuccessBreaker,
    isError: isErrorBreaker,
  } = useAppSelector((state) => state.breaker);

  const {
    list: listGroup,
    isLoading: isLoadingGroup,
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
  } = useAppSelector((state) => state.group);

  React.useEffect(() => {
    if (isSuccessBreaker) {
      dispatch(resetBreaker());
    }

    if (isErrorBreaker) {
      dispatch(resetBreaker());
    }

    if (isSuccessGroup) {
      dispatch(resetGroup());
    }

    if (isErrorBreaker) {
      dispatch(resetGroup());
    }
  }, [
    isSuccessBreaker,
    isErrorBreaker,
    dispatch,
    isSuccessGroup,
    isErrorGroup,
  ]);

  const handleCloseModal = () => {
    dispatchModal({ type: ModalKind.ResetModal });
  };

  const handleDownload = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, data: DataComponentBreaker) => {
      e.stopPropagation();
      if (!isDownload) {
        const name = `${String(data.name)
          .toLowerCase()
          .replace(/ /g, "_")}.txt`;
        setIsDownload(true);
        downloadFileURL(data.file_component_path, `${name}`).then(() => {
          setIsDownload(false);
        });
      } else {
        // do something
      }
    },
    [isDownload]
  );

  const handleDelete = React.useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      evt.stopPropagation();

      const { value } = (
        evt.currentTarget.attributes as unknown as ButtonAttributes
      )["data-id"];

      alert({
        variant: "warning",
        catchOnCancel: true,
        title: "Are You Sure ?",
        message: "Are you sure want to delete this group ?",
      }).then(() =>
        dispatch(
          deleteOneGroup({
            datas: {
              id: value.toString(),
            },
          })
        )
      );
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const breakerColumns: TBColumn = [
    {
      id: "serial_number",
      label: "Serial Number",
      headCell: (label: string) => <div>{label}</div>,
      cell: React.useCallback(
        (value: DataComponentBreaker) => (
          <Flex
            style={{
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Image
              alt=""
              src="/assets/image/board-128x128-navy.png"
              width={32}
              height={32}
            />
            <TextViewLink>{value.serial}</TextViewLink>
          </Flex>
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
            <TextView>{value?.schedule?.name || "No Schedule"}</TextView>
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
        const length = value?.groups?.length || 0;

        if (length === 0) {
          return (
            <TextViewLink color="error" fontWeight={600}>
              No Group
            </TextViewLink>
          );
        }
        if (length === 1) {
          return (
            <Flex gap="0.125rem">
              {value?.groups?.map((v) => (
                <TextViewLink key={v.id} fontWeight={600}>
                  {v.name}
                </TextViewLink>
              ))}
            </Flex>
          );
        }
        return (
          <Flex gap="0.5rem" alignItems="center">
            {value?.groups?.slice(0, 1).map((v) => (
              <TextViewLink key={v.id} fontWeight={600}>
                {v.name}
              </TextViewLink>
            ))}
            <TextView fontSize="12px">
              +{(value?.groups?.length || 1) - 1} more
            </TextView>
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
            <IconButtonLink
              variant="standard"
              tooltip="Preview"
              palette="secondary"
              size="small"
              href={`/ibreaker/${value.id}`}
            >
              <Eye weight="fill" />
            </IconButtonLink>

            <IconButton
              variant="standard"
              tooltip="Configuration"
              palette="secondary"
              size="small"
              onClick={() =>
                dispatchModal({
                  type: ModalKind.Configuration,
                  payload: value,
                })
              }
            >
              <ArrowClockwise weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Schedule"
              palette="secondary"
              size="small"
              onClick={() =>
                dispatchModal({
                  type: ModalKind.ForceUpdate,
                  payload: value,
                })
              }
            >
              <CalendarPlus weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Setting"
              palette="secondary"
              onClick={() =>
                dispatchModal({
                  type: ModalKind.Setting,
                  payload: value,
                })
              }
              size="small"
            >
              <GearSix weight="fill" />
            </IconButton>

            <IconButton
              variant="standard"
              tooltip="Download"
              palette="secondary"
              size="small"
              onClick={(evt) => handleDownload(evt, value)}
            >
              <DownloadSimple weight="fill" />
            </IconButton>
          </Flex>
        ),
        [handleDownload]
      ),
    },
  ];

  const groupColumn: TBColumn = [
    {
      id: "group_name",
      label: "Breaker Name",
      headCell: (label: string) => <TextViewLink>{label}</TextViewLink>,
      cell: React.useCallback(
        (value: GroupColumn) => (
          <Box>
            <TextViewLink>{value.name}</TextViewLink>
          </Box>
        ),
        []
      ),
    },
    {
      id: "created_at",
      label: "Date Created",
      headCell: (label: string) => <TextViewLink>{label}</TextViewLink>,
      cell: React.useCallback(
        (value: GroupColumn) => (
          <Box>
            <TextViewLink>
              {DateTime.fromISO(value.created_at.split(" ")[0])
                .setLocale("en-US")
                .toFormat("dd LLL yyyy") || "Unknown"}
            </TextViewLink>
          </Box>
        ),
        []
      ),
    },
    {
      id: "used_by_breakers",
      label: "Used by",
      headCell: (label: string) => <TextViewLink>{label}</TextViewLink>,
      cell: React.useCallback(
        (value: GroupColumn) => (
          <Box>
            <TextViewLink fontWeight={600}>
              {value.component_ids.length} Breaker
            </TextViewLink>
          </Box>
        ),
        []
      ),
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
          <Flex
            gap="0.5rem"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <ButtonLink
              variant="outline"
              palette="secondary"
              size="small"
              style={{
                paddingBlock: "0.5rem",
              }}
              href={`/ibreaker/g/${value.id}`}
            >
              View Detail
            </ButtonLink>

            <IconButton
              variant="standard"
              tooltip="Detele"
              palette="secondary"
              size="small"
              data-id={value.id}
              onClick={handleDelete}
            >
              <TrashSimple weight="fill" />
            </IconButton>
          </Flex>
        ),
        [handleDelete]
      ),
    },
  ];

  const handleChangePage = (page: number) => {
    const pagination = {
      page,
      page_size: 10,
      component_type: "breaker" as "breaker" | "beacon" | undefined,
      filter_search: search,
    };

    dispatch(getAllBreakers({ datas: pagination }));
  };

  const handleChangePageGroup = (page: number) => {
    const pagination = {
      page,
      page_size: 10,
      filter_search: searchGroup,
    };

    dispatch(getAllGroups({ datas: pagination }));
  };

  const searchForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const pagination = {
      page: list.result.current_page,
      page_size: list.result.per_page,
      component_type: "breaker" as "breaker" | "beacon" | undefined,
      filter_search: e.target.value,
    };

    dispatch(getAllBreakers({ datas: pagination }));
  };

  const searchFormGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchGroup(e.target.value);

    const pagination = {
      page: listGroup.result.current_page,
      page_size: listGroup.result.per_page,
      filter_search: e.target.value,
    };

    dispatch(getAllGroups({ datas: pagination }));
  };

  const handleSearch = useDebounce(searchForm);
  const handleSearchGroup = useDebounce(searchFormGroup);

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
          <BreakerView
            isLoading={isLoadingBreaker}
            columns={breakerColumns}
            datas={list.result.data}
            page={list.result.current_page}
            perPage={list.result.per_page}
            totalData={list.result.total}
            onChangePage={handleChangePage}
            handleSearch={handleSearch}
          />
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
          <GroupView
            columns={groupColumn}
            datas={listGroup.result.data}
            isLoading={isLoadingGroup}
            page={listGroup.result.current_page}
            perPage={listGroup.result.per_page}
            totalData={listGroup.result.total}
            onChangePage={handleChangePageGroup}
            handleSearch={handleSearchGroup}
          />
        </Tab>
      </Tabs>

      <ModalResetBreaker
        isOpen={modalState.isOpenConfiguration}
        handleClose={handleCloseModal}
        serial={modalState.serial}
      />

      <ModalForceSchedule
        isOpen={modalState.isOpenForceUpdate}
        handleClose={handleCloseModal}
        serial={modalState.serial}
      />

      <ModalSetting
        isOpen={modalState.isOpenSetting}
        handleClose={handleCloseModal}
        id={modalState.id}
      />
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

    await store.dispatch(
      getAllGroups({
        cookie: `access=${accessToken};`,
        datas: {
          page: 1,
          page_size: 10,
        },
      })
    );

    return {
      props: {},
    };
  });
