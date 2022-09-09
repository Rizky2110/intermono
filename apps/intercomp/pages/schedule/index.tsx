import type { GetServerSideProps, NextLayout } from "next";
import React from "react";
import {
  Box,
  ButtonLink,
  Flex,
  FlexItem,
  Pagination,
  TableBuilder,
  TBColumn,
  TextView,
} from "ui/sc";
import { Layout } from "components";
import wrapper from "src/app/store";
import Cookies from "cookies";
import { getAllSchedules, resetSchedule } from "src/app/action";
import { DataSchedule } from "src/dto";
import { dateFormatTable } from "src/lib/helper";
import { useAppDispatch, useAppSelector } from "src/app/hook";

type DataCellTable = Omit<DataSchedule, "component_ids" | "component">;

const Schedule: NextLayout = function Schedule() {
  const dispatch = useAppDispatch();
  const {
    isLoading: isLoadingSchedule,
    isSuccess: isSuccessSchedule,
    isError: isErrorSchedule,
    list: listSchedules,
  } = useAppSelector((state) => state.schedule);

  React.useEffect(() => {
    if (isSuccessSchedule) {
      dispatch(resetSchedule());
    }

    if (isErrorSchedule) {
      dispatch(resetSchedule());
    }
  }, [dispatch, isSuccessSchedule, isErrorSchedule]);

  const handleChangePage = (page: number) => {
    const pagination = {
      page,
      page_size: 10,
    };

    dispatch(getAllSchedules({ datas: pagination }));
  };

  const dataTable: TBColumn = [
    {
      id: "schedule_name",
      label: "Schedule Name",
      headCell: (label: string) => <TextView>{label}</TextView>,
      cell: React.useCallback((value: DataCellTable) => {
        return (
          <Box>
            <TextView>{value.name}</TextView>
          </Box>
        );
      }, []),
    },

    {
      id: "date",
      label: "Dates",
      headCell: (label: string) => <TextView>{label}</TextView>,
      cell: React.useCallback((value: DataCellTable) => {
        return (
          <Box>
            <TextView>
              {dateFormatTable(value.start_date)} -{" "}
              {dateFormatTable(value.end_date)}
            </TextView>
          </Box>
        );
      }, []),
    },
    {
      id: "used_breakers",
      label: "Breaker in Use",
      headCell: (label: string) => <TextView>{label}</TextView>,
      cell: React.useCallback((value: DataCellTable) => {
        return (
          <Box>
            {value?.total_components === 1 || value?.total_components === 0 ? (
              <TextView>{value?.total_components} Breaker</TextView>
            ) : (
              <TextView>{value?.total_components} Breakers</TextView>
            )}
          </Box>
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
      headCell: (label: string) => <TextView>{label}</TextView>,
      cell: React.useCallback((value: DataCellTable) => {
        return (
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
              href={`/schedule/${value.id}`}
            >
              Detail
            </ButtonLink>
          </Flex>
        );
      }, []),
    },
  ];
  return (
    <section aria-label="time schedule page">
      <ButtonLink href="/schedule/create" palette="secondary" size="medium">
        Create Schedule
      </ButtonLink>
      <Box className="schedule-body" marginTop="2rem">
        <TableBuilder
          isLoading={isLoadingSchedule}
          columns={dataTable}
          datas={listSchedules.result.data}
        />

        <Flex marginTop="1rem" marginBottom="1rem">
          <FlexItem flex={1} />

          <Pagination
            page={listSchedules.result.current_page}
            perPage={listSchedules.result.per_page}
            totalData={listSchedules.result.total}
            onChangePage={handleChangePage}
          />
        </Flex>
      </Box>
    </section>
  );
};

export default Schedule;

Schedule.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Time Schedule">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { req, res } = ctx;

    const cookies = new Cookies(req, res);

    const accessToken = cookies.get("access") || "";

    await store.dispatch(
      getAllSchedules({
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
