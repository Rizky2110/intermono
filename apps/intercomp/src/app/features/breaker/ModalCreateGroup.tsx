import { hexToRgba, useDebounce } from "core";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IconProps } from "phosphor-react";
import React, { useId } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hook";
import { DataComponentBreaker } from "src/dto";
import { BaseModalProps } from "src/lib/constants";
import {
  Box,
  Button,
  Flex,
  FlexItem,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalFoot,
  ModalHead,
  Pagination,
  TableBuilder,
  TBColumn,
  TextView,
  useAlert,
} from "ui/sc";
import { createOneGroup, resetGroup } from "../group/groupSlice";
import { getAllBreakers } from "./breakerSlice";

const X = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.X)
);

const MagnifyingGlass = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.MagnifyingGlass)
);

export type ModalCreateGroupProps = BaseModalProps;

export default function ModalCreateGroup({
  isOpen,
  handleClose,
}: ModalCreateGroupProps): JSX.Element {
  const alert = useAlert();
  const formId = useId();
  const dispatch = useAppDispatch();
  const { list: listBreaker, isLoading: isLoadingBreaker } = useAppSelector(
    (state) => state.breaker
  );

  const {
    isSuccess: isSuccessGroup,
    isError: isErrorGroup,
    isLoading: isLoadingGroup,
  } = useAppSelector((state) => state.group);

  const [search, setSearch] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
  });
  const [selectedData, setSelectedData] = React.useState<
    DataComponentBreaker[]
  >([]);

  const { name } = formData;

  React.useEffect(() => {
    if (!isOpen) return;

    if (isSuccessGroup) {
      alert({
        title: "Success",
        message: "Success created new group",
        variant: "success",
        catchOnCancel: true,
      }).then(() => {
        setSelectedData([]);
        setSearch("");
        setFormData({
          name: "",
        });
        handleClose();
      });
      dispatch(resetGroup());
    }

    if (isErrorGroup) {
      alert({
        title: "Error",
        message: "Error when creating new group",
        variant: "error",
        catchOnCancel: true,
      }).then(() => {
        setSelectedData([]);
        setSearch("");
      });

      dispatch(resetGroup());
    }
  }, [isSuccessGroup, isErrorGroup, dispatch, alert, handleClose, isOpen]);

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
            <TextView>{value.serial}</TextView>
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
          return <TextView>No Group</TextView>;
        }
        if (length <= 2) {
          return (
            <Flex gap="0.125rem">
              {value?.groups?.map((v) => (
                <TextView key={v.id}>{v.name}</TextView>
              ))}
            </Flex>
          );
        }
        return (
          <Flex gap="0.125rem">
            {value?.groups?.slice(0, 2).map((v) => (
              <TextView key={v.id}>{v.name}</TextView>
            ))}
          </Flex>
        );
      }, []),
    },
  ];

  const conditionalAttr = [
    {
      when: (row: DataComponentBreaker) =>
        !!selectedData.find((item) => item.id === row.id),
      style: {
        backgroundColor: hexToRgba("#000000", 0.1),
      },
    },
  ];

  const isRowSelected = (row: DataComponentBreaker) => {
    const findId = selectedData.find(
      (item: DataComponentBreaker) => item.id === row.id
    );
    return !!findId;
  };

  const isAllSelected = () => {
    let result = true;
    if (listBreaker.result.data.length <= 0) result = false;
    listBreaker.result.data.forEach((data) => {
      const findId = selectedData.find(
        (item: DataComponentBreaker) => item.id === data.id
      );
      if (!findId) {
        result = false;
      }
    });
    return result;
  };

  const handleOnSelect = (row: DataComponentBreaker) => {
    const findId = selectedData.find(
      (item: DataComponentBreaker) => item.id === row.id
    );
    if (!findId) {
      setSelectedData([...selectedData, row]);
    } else {
      const filterData = selectedData.filter(
        (item: DataComponentBreaker) => item.id !== row.id
      );
      setSelectedData(filterData);
    }
  };

  const handleOnSelectAll = () => {
    if (isAllSelected()) {
      const filterResult = selectedData.filter(
        (item) => !listBreaker.result.data.find((data) => data.id === item.id)
      );
      setSelectedData(filterResult);
    } else {
      const tempConcat = selectedData.concat(listBreaker.result.data);
      const filterResult = tempConcat.filter(
        (item, pos) => tempConcat.indexOf(item) === pos
      );
      setSelectedData(filterResult);
    }
  };

  const handleChangePage = (page: number) => {
    const pagination = {
      page,
      page_size: 10,
      component_type: "breaker" as "breaker" | "beacon" | undefined,
      filter_search: search,
    };

    dispatch(getAllBreakers({ datas: pagination }));
  };

  const searchForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const pagination = {
      page: listBreaker.result.current_page,
      page_size: listBreaker.result.per_page,
      component_type: "breaker" as "breaker" | "beacon" | undefined,
      filter_search: e.target.value,
    };

    dispatch(getAllBreakers({ datas: pagination }));
  };

  const handleSearch = useDebounce(searchForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createOneGroup({
        datas: {
          name,
          component_type_id: 3,
          component_ids: selectedData.map((d) => d.id),
        },
      })
    );
  };

  const handleCloseAndReset = () => {
    setSelectedData([]);
    setSearch("");

    handleClose();
  };

  return (
    <section>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        palette="primary"
        scroll="content"
        size="large"
        disabled={isLoadingGroup}
        round
      >
        <ModalHead flex>
          <TextView flex={1} color="white">
            Create New Group
          </TextView>
          <IconButton
            palette="error"
            disabled={isLoadingGroup}
            onClick={handleCloseAndReset}
          >
            <X />
          </IconButton>
        </ModalHead>

        <ModalBody>
          <form id={formId} onSubmit={handleSubmit}>
            <Flex alignItems="center">
              <FlexItem flex={1} />
              <TextView fontWeight={600} color="error">
                {selectedData.length} breaker selected
              </TextView>
            </Flex>

            <Flex alignItems="flex-end" gap="1rem" marginBottom="2rem">
              <FlexItem flex={1}>
                <Input
                  palette="primary"
                  placeholder="ex: jawa timur"
                  label="Group Name"
                  style={{ width: "50%" }}
                  fullWidth
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </FlexItem>
              <FlexItem>
                <Input
                  palette="primary"
                  startAdornment={
                    <MagnifyingGlass weight="bold" size={18} className="icon" />
                  }
                  placeholder="Search"
                  className="input"
                  name="search"
                  onChange={handleSearch}
                />
              </FlexItem>
            </Flex>
          </form>

          <TableBuilder
            isLoading={isLoadingBreaker}
            columns={breakerColumns}
            datas={listBreaker.result.data}
            selectable
            selectableOption={{
              conditionalAttr,
              onSelect: handleOnSelect,
              onSelectAll: handleOnSelectAll,
              isRowSelected,
              isAllSelected,
              noCheckbox: false,
            }}
          />
          <Flex marginTop="1rem" marginBottom="1rem">
            <FlexItem flex={1} />

            <Pagination
              page={listBreaker.result.current_page}
              perPage={listBreaker.result.per_page}
              totalData={listBreaker.result.total}
              onChangePage={handleChangePage}
            />
          </Flex>
        </ModalBody>

        <ModalFoot flex>
          <Button
            palette="secondary"
            variant="outline"
            type="button"
            onClick={handleCloseAndReset}
            size="small"
            disabled={isLoadingGroup}
          >
            <TextView>Cancel</TextView>
          </Button>
          <FlexItem flex={1} />
          <Button
            palette="secondary"
            disabled={isLoadingGroup}
            form={formId}
            type="submit"
            size="small"
          >
            {isLoadingGroup ? (
              <TextView>Loading</TextView>
            ) : (
              <TextView>Create Group</TextView>
            )}
          </Button>
        </ModalFoot>
      </Modal>
    </section>
  );
}
