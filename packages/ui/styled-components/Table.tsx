import React, { ReactNode } from "react";
import { hexToRgba, themeColor } from "core";
import styled from "styled-components";
import {
  BaseLayoutStyleProps,
  BaseTextStyleProps,
  StandardProps,
} from "./system";
import { Box } from "./Box";
import { Checkbox } from "./Input";
import { Skeleton } from "./Skeleton";
import { TextViewLink } from "./TextViewLink";

export interface TableProps
  extends StandardProps<React.HTMLAttributes<HTMLTableElement>, "children">,
    BaseLayoutStyleProps {
  margin?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  stripe?: boolean | string;
  palette?: "primary" | "secondary" | "error" | "info" | "success";
  variant?: "standard" | "plain";
  borderCell?: string | number | boolean;
  paddingHeadCell?: string | number;
  paddingCell?: string | number;
  borderColor?: string;
  hover?: boolean;
  round?: boolean | string;
}
export interface TableBodyProps {
  className?: string;
  children?: ReactNode;
}
export interface TableHeadProps {
  className?: string;
  children?: ReactNode;
}
export interface TableRowProps
  extends StandardProps<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  selected?: boolean;
  rowSpan?: number;
}
export interface TableCellProps
  extends StandardProps<React.HTMLAttributes<HTMLTableCellElement>, "children">,
    BaseTextStyleProps {
  colSpan?: number;
  padding?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  selected?: boolean;
}

export type TBSelectOption = {
  value: string;
  label: string;
};

export type TBColumnData = {
  id?: string | number;
  label?: string;
  filterable?: boolean;
  filterOption?: {
    type: "text" | "select" | "date";
    selectOption: TBSelectOption[];
    value: string | number;
    placeholder: string;
    onChange?: (e: React.ChangeEvent) => void;
  };
  headCellAttr?: {
    className?: string;
    style?: React.CSSProperties;
  };
  cellAttr?: {
    className?: string;
    style?: React.CSSProperties;
  };
  headCell?: (label: string) => React.ReactElement;
  cell?: (row: any, index: number) => React.ReactElement | string;
};

export type TBColumn = TBColumnData[];

export type TBConditionalAttr = {
  style?: React.CSSProperties;
  className?: string;
  when: (row: any) => boolean;
};

export type TBSelectableOption = {
  noCheckbox?: boolean;
  conditionalAttr?: TBConditionalAttr[];
  onSelect?: (row: any, e: React.MouseEvent | React.ChangeEvent) => void;
  onSelectAll?: (row: any) => void;
  isRowSelected?: (row: any) => boolean;
  isAllSelected?: () => boolean | boolean;
};

export type TBComponents = {
  emptyData?: ReactNode | string;
};

export interface TableBuilderProps
  extends StandardProps<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  margin?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  borderCell?: string | number | boolean;
  paddingHeadCell?: string | number;
  paddingCell?: string | number;
  borderColor?: string;
  hover?: boolean;
  round?: boolean | string;
  stripe?: boolean | string;
  palette?: "primary" | "secondary" | "error" | "info" | "success";
  checkboxPalette?: "primary" | "secondary" | "error" | "info" | "success";
  variant?: "standard" | "plain";
  components?: TBComponents;
  selectable?: boolean;
  selectableOption?: TBSelectableOption;
  disabled?: boolean;
  columns: TBColumn;
  datas: object[];
  isLoading?: boolean;
}

const StyledTable = styled("table")<TableProps>`
  --sig-table-bg: transparent;
  --sig-table-accent-bg: transparent;
  --sig-table-striped-color: ${(props) => props.theme.palette.text};
  --sig-table-striped-bg: ${(props) => {
    if (props.stripe)
      if (typeof props.stripe === "string") return `${props.stripe}`;
      else return `rgba(0, 0, 0, 0.05);`;
    return null;
  }};
  width: 100%;
  border-spacing: 0;
  color: ${(props) => props.theme.colors.text};
  vertical-align: top;
  border-color: rgba(0, 0, 0, 0.1);
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  > * {
    &:not(caption) > * > * {
      padding: 0.5rem 0.5rem;
      background-color: var(--sig-table-bg);
      ${(props) => {
        if (props.borderCell)
          if (typeof props.borderCell === "string")
            return `border-width: ${props.borderCell};`;
        return `border-bottom-width: 0.0625rem;`;
      }}
      box-shadow: inset 0 0 0 999rem var(--sig-table-accent-bg);
    }
  }
  & tbody,
  thead {
    vertical-align: inherit;
    & > * > td {
      ${(props) =>
        props.paddingHeadCell && `padding: ${props.paddingHeadCell};`}
    }
  }
  & tbody {
    vertical-align: inherit;
    & > * > td {
      ${(props) => props.paddingCell && `padding: ${props.paddingCell};`}
    }
  }
  & thead > tr {
    vertical-align: center;
    background-color: ${(props) => {
      const { palette, theme, variant } = props;
      if (variant === "standard") {
        return theme.palette[palette || "primary"].default;
      }
      return themeColor(theme, "white");
    }};
    color: ${(props) => {
      const { palette, theme, variant } = props;
      if (variant === "standard") {
        return theme.palette[palette || "primary"].opposite;
      }
      return themeColor(theme, "black");
    }};
  }
  & tbody > tr:nth-of-type(odd) > * {
    --sig-table-accent-bg: var(--sig-table-striped-bg);
    color: var(--sig-table-striped-color);
  }
  ${(props) =>
    props.hover &&
    `
    & tbody > tr:hover {
      background-color:rgba(0, 0, 0, 0.075);
    }
  `}
  & thead tr:first-child, tbody tr:last-child {
    border-radius: ${(props) => {
      if (props.round)
        if (typeof props.round === "string") return props.round;
        else return props.theme.width.round;
      return "inherit";
    }};
  }
  & thead tr:first-child {
    & td:first-child {
      border-top-left-radius: inherit;
    }
    & td:last-child {
      border-top-right-radius: inherit;
    }
  }
  & tbody tr:last-child {
    & td:first-child {
      border-bottom-left-radius: inherit;
    }
    & td:last-child {
      border-bottom-right-radius: inherit;
    }
  }
`;

const StyledTableBodyStyle = styled("tbody")<TableBodyProps>`
  border-color: inherit;
  border-style: solid;
  border-width: 0;
`;

const StyledTableHeadStyle = styled("thead")<TableHeadProps>`
  border-color: inherit;
  border-style: solid;
  border-width: 0;
`;

const StyledTableRowStyle = styled("tr")<TableRowProps>`
  border-color: inherit;
  border-style: solid;
  border-width: 0;
`;

const StyledTableCellStyle = styled("td")<TableCellProps>`
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight}`};
  letter-spacing: ${(props) =>
    props.letterSpacing || props.theme.typography.spacing};
  text-align: ${(props) => props.textAlign || "left"};
  text-decoration: ${(props) => props.textDecoration || "inherit"};
  text-indent: ${(props) => props.textIndent || "inherit"};
  text-transform: ${(props) => props.textTransform || "inherit"};
  padding: ${(props) => props.padding};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
`;

const StyledDefaultTableBuilder = styled.div<TableBuilderProps>`
  width: 100%;
  overflow-y: auto;
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
`;

const StyledTableBuilder = styled(StyledDefaultTableBuilder)`
  ${({ hidden }) => hidden && `display: none;`}
  .table-head {
    .custom-input,
    .custom-select {
      ::before {
        border-bottom: 0.125rem solid ${({ theme }) => theme.colorPalette.white};
      }
    }
    .custom-input .container,
    .custom-select .container {
      background-color: ${({ theme }) =>
        hexToRgba(theme.palette.primary.opposite, 0.2)};
      color: ${({ theme }) => theme.colorPalette.white};
      input,
      select {
        color: ${({ theme }) => theme.colors.secondary};
        ::placeholder {
          color: ${({ theme }) => theme.colorPalette.white};
          opacity: 0.8;
        }
        :-ms-input-placeholder {
          color: ${({ theme }) => theme.colorPalette.white};
        }
        ::-ms-input-placeholder {
          color: ${({ theme }) => theme.colorPalette.white};
        }
      }
    }
  }
  .table-body {
    background-color: ${({ theme }) =>
      hexToRgba(theme.palette.primary.opposite, 0.02)};
  }
`;

export const Table: React.FC<TableProps> = function Table(props: TableProps) {
  const { children, ...rest } = props;
  return <StyledTable {...rest}>{children}</StyledTable>;
};

export const TableBody: React.FC<TableBodyProps> = function TableBody(
  props: TableBodyProps
) {
  const { children, ...rest } = props;
  return <StyledTableBodyStyle {...rest}>{children}</StyledTableBodyStyle>;
};

export const TableHead: React.FC<TableHeadProps> = function TableHead(
  props: TableHeadProps
) {
  const { children, ...rest } = props;
  return <StyledTableHeadStyle {...rest}>{children}</StyledTableHeadStyle>;
};

export const TableRow: React.FC<TableRowProps> = function TableRow(
  props: TableRowProps
) {
  const { children, onClick, ...rest } = props;
  return (
    <StyledTableRowStyle onClick={onClick} {...rest}>
      {children}
    </StyledTableRowStyle>
  );
};

export const TableCell: React.FC<TableCellProps> = function TableCell(
  props: TableCellProps
) {
  const { children, ...rest } = props;
  return <StyledTableCellStyle {...rest}>{children}</StyledTableCellStyle>;
};

Table.defaultProps = {
  variant: "standard",
};

export const TableBuilder: React.FC<TableBuilderProps> = function TableBuilder(
  props: TableBuilderProps
) {
  const {
    selectable,
    selectableOption,
    columns,
    datas,
    components,
    hover,
    disabled,
    variant,
    palette,
    checkboxPalette,
    stripe,
    borderCell,
    borderColor,
    paddingCell,
    paddingHeadCell,
    round,
    isLoading,
  } = props;
  const emptyData = components?.emptyData || "No Data";
  /**
   * SELECT OPTIONS VARIABLE
   */
  const noCheckbox = selectableOption?.noCheckbox || false;
  const conditionalStyle = selectableOption?.conditionalAttr || [];
  let isAllSelected = selectableOption?.isAllSelected || false;
  const isRowSelected = selectableOption?.isRowSelected;
  const onSelectAll = selectableOption?.onSelectAll;
  const onSelect = selectableOption?.onSelect;
  if (typeof isAllSelected === "function") isAllSelected = isAllSelected();
  return (
    <StyledTableBuilder {...props}>
      <Box position="relative">
        <Skeleton
          position="absolute"
          variant="transparent"
          hidden={!isLoading}
          height="100%"
        />
        <Table
          className="table"
          variant={variant}
          palette={palette}
          hover={hover}
          stripe={stripe}
          round={round}
          borderCell={borderCell}
          borderColor={borderColor}
          paddingHeadCell={paddingHeadCell}
          paddingCell={paddingCell || "1rem 0.5rem 1rem 0.5rem"}
        >
          <TableHead className="table-head">
            <TableRow className="table-row">
              {selectable && !noCheckbox ? (
                <TableCell className="table-cell">
                  <TextViewLink marginBottom="0.25rem" component="div">
                    #
                  </TextViewLink>
                  {onSelectAll ? (
                    <Checkbox
                      round
                      data-role="table-checkbox"
                      disabled={disabled}
                      palette={checkboxPalette}
                      size="small"
                      value=""
                      checked={isAllSelected || false}
                      onChange={onSelectAll}
                    />
                  ) : null}
                </TableCell>
              ) : null}
              {columns &&
                columns.map((item, indexColumn: number) => {
                  const attr = item?.headCellAttr;
                  const label = item?.label || "";
                  const keyColumn = `column-${indexColumn}`;
                  return (
                    <TableCell
                      style={attr?.style}
                      className={`table-cell ${attr?.className}`}
                      key={keyColumn}
                    >
                      {item.headCell ? (
                        item.headCell(label)
                      ) : (
                        <TextViewLink>{label}</TextViewLink>
                      )}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {datas && datas.length > 0 ? (
              datas.map((row, indexData: number) => {
                const isItemSelected = isRowSelected
                  ? isRowSelected(row)
                  : null;
                const keyCheckbox = `enhanced-table-checkbox-${indexData}`;
                const keyData = `data-${indexData}`;
                let customStyle = {};
                let customClass = "";
                conditionalStyle.forEach((item) => {
                  if (item.when(row)) {
                    if (item.style)
                      customStyle = { ...customStyle, ...item.style };
                    if (item.className) customClass += ` ${item.className}`;
                  }
                });
                return (
                  <TableRow
                    data-role="table-row"
                    style={customStyle}
                    className={`table-row ${customClass}`}
                    key={keyData}
                    aria-label={keyCheckbox}
                    aria-checked={isItemSelected || false}
                    tabIndex={-1}
                    onClick={(e) => {
                      if (selectable && typeof onSelect === "function")
                        onSelect(row, e);
                    }}
                    selected={isItemSelected || false}
                  >
                    {selectable && !noCheckbox ? (
                      <TableCell
                        padding="checkbox"
                        className="table-cell"
                        style={{ padding: "auto" }}
                      >
                        <Checkbox
                          round
                          palette={checkboxPalette}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelect) onSelect(row, e);
                          }}
                          onChange={() => {}}
                          disabled={disabled}
                          checked={isItemSelected || false}
                        />
                      </TableCell>
                    ) : null}

                    {columns &&
                      columns.map((item, indexColumn: number) => {
                        const keyColumn = `column-${indexColumn}`;
                        const cellAttr = item?.cellAttr;
                        const cell = item?.cell;
                        return (
                          <TableCell
                            style={cellAttr?.style}
                            className={`table-cell ${cellAttr?.className}`}
                            key={keyColumn}
                          >
                            {cell ? cell(row, indexColumn) : null}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  textAlign="center"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  {emptyData}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </StyledTableBuilder>
  );
};

TableBuilder.defaultProps = {
  palette: "primary",
  checkboxPalette: "secondary",
  round: true,
};
