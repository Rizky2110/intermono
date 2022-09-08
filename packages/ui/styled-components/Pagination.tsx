import dynamic from "next/dynamic";
import type { IconProps } from "phosphor-react";
import React from "react";
import styled from "styled-components";
import { IconButton } from "./IconButton";
import { Select } from "./Input";
import { StandardProps, BaseLayoutStyleProps } from "./system";
import { TextViewLink } from "./TextViewLink";

export interface PaginationProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    BaseLayoutStyleProps {
  variant?: "standard" | "outline";
  size?: "small" | "medium" | "large";
  label?: string;
  page: number;
  perPage: number;
  totalData: number;
  onChangePage: (page: number) => void;
  onChangePerPage?: (perPage: number) => void;
  perPageOption?: number[];
}

const StyledPagination = styled("div")<
  Pick<PaginationProps, "size" | "variant">
>`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  .custom-select .container {
    height: 2.813rem;
    border-radius: 0.5rem;
  }
`;

const CaretLeft = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CaretLeft)
);
const CaretRight = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.CaretRight)
);

export const Pagination: React.FC<PaginationProps> = function Pagination(
  props: PaginationProps
) {
  const {
    variant,
    size,
    label,
    page,
    perPage,
    perPageOption,
    totalData,
    onChangePerPage,
    onChangePage,
  } = props;
  const totalPage =
    parseInt(String(totalData / perPage), 10) +
    (totalData % perPage > 0 ? 1 : 0);
  const onPrev = () => {
    if (page > 1) onChangePage(page - 1);
  };
  const onNext = () => {
    if (page < totalPage) onChangePage(page + 1);
  };
  return (
    <StyledPagination size={size} variant={variant}>
      {perPageOption && onChangePerPage && (
        <Select
          variant="plain"
          palette="secondary"
          value={perPage}
          onChange={(e) => onChangePerPage(parseInt(e.target.value, 10))}
          round
        >
          {perPageOption.map((item, key) => {
            const keyItem = `option-${key}`;
            return (
              <option key={keyItem} value={item}>
                {item}
              </option>
            );
          })}
        </Select>
      )}
      <TextViewLink size="body1">
        {1 + (page - 1) * perPage} -{" "}
        {page < totalPage ? perPage * page : totalData} of {totalData}{" "}
        {label || "Data"}
      </TextViewLink>
      <IconButton
        disabled={!!(page <= 1)}
        variant="fill"
        palette="light"
        onClick={onPrev}
      >
        <CaretLeft weight="fill" />
      </IconButton>
      <IconButton disabled variant="fill" palette="light">
        {page}
      </IconButton>
      <IconButton
        disabled={!!(page >= totalPage)}
        variant="fill"
        palette="light"
        onClick={onNext}
      >
        <CaretRight weight="fill" />
      </IconButton>
    </StyledPagination>
  );
};

Pagination.defaultProps = {
  variant: "standard",
};
