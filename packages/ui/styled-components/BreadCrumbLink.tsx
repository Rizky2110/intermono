import { hexToHsl } from "core";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { IconProps } from "phosphor-react";
import React from "react";
import styled from "styled-components";

export interface BreadcrumbsLinkItemProps
  extends React.ComponentPropsWithoutRef<"a"> {
  edge?: string;
}

export interface BreadcrumbsLinkProps
  extends React.ComponentPropsWithoutRef<"div"> {
  separator: "|" | ">" | "/";
  href?: string;
}

export const BreadcrumbsLinkItemDefaultProps = {
  href: "#",
};

const StyledBreadcrumbsLinkItems = styled("a")`
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

const StyledBreadcrumbsLink = styled("div")`
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

const ArrowCircleLeft = dynamic<IconProps>(() =>
  import("phosphor-react").then((mod) => mod.ArrowCircleLeft)
);

export const BreadcrumbsLink: React.FC<BreadcrumbsLinkProps> =
  function BreadcrubmsLink({
    children,
    separator,
    href,
  }: BreadcrumbsLinkProps) {
    const splitter = <div>{separator}</div>;
    const count = React.Children.count(children);

    const breadcrump = React.Children.map(children, (child, index) => {
      if (count === 1) return [child];
      if (index + 1 !== count) {
        if (index === 0)
          if (href) {
            const back = (
              <Link href={href || "#"} passHref>
                <div className="icon-back">
                  <ArrowCircleLeft weight="fill" />
                </div>
              </Link>
            );
            return [
              back,
              child,
              React.cloneElement(splitter, { className: "separator" }),
            ];
          }
        return [
          child,
          React.cloneElement(splitter, { className: "separator" }),
        ];
      }
      return child;
    });
    return <StyledBreadcrumbsLink>{breadcrump}</StyledBreadcrumbsLink>;
  };

export const BreadcrumbsLinkItem = function BreadcrubmsLinkItem({
  children,
  href,
}: BreadcrumbsLinkItemProps) {
  return (
    <Link href={href || "#"} passHref>
      <StyledBreadcrumbsLinkItems>{children}</StyledBreadcrumbsLinkItems>
    </Link>
  );
};

BreadcrumbsLink.defaultProps = BreadcrumbsLinkItemDefaultProps;
