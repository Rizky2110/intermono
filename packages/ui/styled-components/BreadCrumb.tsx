import { hexToHsl } from "core";
import React from "react";
import styled from "styled-components";

export interface BreadcrumbsItemsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  edge?: string;
}

export interface BreadcrumbsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  separator: "|" | ">" | "/";
}

const StyledBreadcrumbsItems = styled("div")`
  font-size: ${(props) => props.theme.typography.size.body1};
  font-weight: ${(props) => props.theme.typography.weight.sub3};
  color: ${(props) => props.theme.colors.secondary};
  transition: color 0.25s ease;

  &:last-child {
    font-weight: ${(props) => props.theme.typography.weight.button};
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover {
    color: ${(props) => hexToHsl(props.theme.colors.secondary, 20)};
  }

  &:last-child:hover {
    color: ${(props) => hexToHsl(props.theme.colors.primary, 20)};
  }
`;

const StyledBreadcrumbs = styled("div")`
  background-color: transparent;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  width: 100%;
  flex-wrap: wrap;
  font-size: ${(props) => props.theme.typography.size.sub1};
  font-weight: ${(props) => props.theme.typography.weight.sub3};
  color: ${(props) => props.theme.colors.secondary};
  > * {
    &:last-child {
      font-weight: ${(props) => props.theme.typography.weight.sub2};
      color: ${(props) => props.theme.colors.primary};
    }
  }
  .icon-back {
    cursor: pointer;
    svg {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .separator {
    color: ${(props) => props.theme.colors.primary};
    font-weight: ${(props) => props.theme.typography.weight.button};
    font-size: ${(props) => props.theme.typography.size.sub1};
  }
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = function Breadcrubms({
  children,
  separator,
}: BreadcrumbsProps) {
  const splitter = <div>{separator}</div>;
  const count = React.Children.count(children);

  const breadcrump = React.Children.map(children, (child, index) => {
    if (count === 1) return [child];
    if (index + 1 !== count) {
      if (index === 0)
        return [
          child,
          React.cloneElement(splitter, { className: "separator" }),
        ];
    }
    return child;
  });
  return <StyledBreadcrumbs>{breadcrump}</StyledBreadcrumbs>;
};

export const BreadcrumbsItems = function BreadcrubmsItems({
  children,
}: BreadcrumbsItemsProps) {
  return <StyledBreadcrumbsItems>{children}</StyledBreadcrumbsItems>;
};
