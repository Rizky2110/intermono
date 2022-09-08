import dynamic from "next/dynamic";
import { IconProps } from "phosphor-react";
import React from "react";
import { DataComponentBreaker, Group } from "src/dto";
import styled from "styled-components";
import {
  Input,
  Select,
  Box,
  TableBuilder,
  TBColumn,
  Button,
  Flex,
  FlexItem,
  Pagination,
} from "ui/sc";

const ModalCreateGroup = dynamic(() => import("./ModalCreateGroup"), {
  ssr: false,
});

const StyledGroupView = styled("section")`
  width: 100%;
  margin-block-start: 1rem;

  .text {
    font-weight: 500;
    margin-block-end: 0;
    line-height: 1.5;
  }

  .breaker-view {
    &Header {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .custom-input {
        width: 100%;

        .container {
          width: 100%;
        }
      }
      .btn-HeaderCreate {
        width: 100%;
      }

      &Show {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    &Body {
      margin-block-start: 2rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .breaker-view {
      &Header {
        flex-direction: row;
        align-items: center;

        .custom-input {
          width: 50%;

          .container {
            width: 100%;
          }
        }

        .btn-HeaderCreate {
          width: fit-content;
        }
        &Show {
          margin-inline-start: auto;
        }
      }
    }
  }

  @media only screen and (min-width: 1000px) {
    .breaker-view {
      &Header {
        .custom-input {
          width: 30%;

          .container {
            width: 100%;
          }
        }
      }
    }
  }
`;

const MagnifyingGlass = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.MagnifyingGlass)
);

export type GroupViewProps = {
  datas: Group["result"][];
  columns: TBColumn;
  isLoading: boolean;
  page: number;
  perPage: number;
  totalData: number;
  onChangePage: (page: number) => void;
  handleSearch: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const GroupView: React.FC<GroupViewProps> = function GroupView({
  datas,
  columns,
  isLoading,
  page,
  perPage,
  totalData,
  onChangePage,
  handleSearch,
}: GroupViewProps) {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleOpen = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <StyledGroupView>
        <Box className="breaker-viewHeader">
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

          <Button
            palette="secondary"
            variant="contain"
            className="btn-HeaderCreate"
            size="small"
            onClick={handleOpen}
          >
            Create Group
          </Button>

          <Box className="breaker-viewHeaderShow">
            <p className="text text-headerShow">Show</p>
            <Select size="small" placeholder="search" name="file_type">
              <option>News Group</option>
            </Select>
          </Box>
        </Box>

        <Box className="breaker-viewBody">
          <TableBuilder isLoading={isLoading} columns={columns} datas={datas} />
          <Flex marginTop="1rem" marginBottom="1rem">
            <FlexItem flex={1} />

            <Pagination
              page={page}
              perPage={perPage}
              totalData={totalData}
              onChangePage={onChangePage}
            />
          </Flex>
        </Box>
      </StyledGroupView>

      <ModalCreateGroup isOpen={isOpenModal} handleClose={handleClose} />
    </div>
  );
};

export default GroupView;
