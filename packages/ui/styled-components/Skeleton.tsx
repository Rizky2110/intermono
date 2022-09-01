import { hexToRgba } from "core";
import React from "react";
import styled from "styled-components";
import { StandardProps, BaseLayoutStyleProps } from "./system";

export interface SkeletonProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseLayoutStyleProps {
  width?: string | number;
  height?: string | number;
  round?: string | number;
  variant?: "standart" | "transparent";
  margin?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  position?: string;
}

const StyledSkeleton = styled("div")<SkeletonProps>`
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  @keyframes placeHolderShimmer {
    0% {
      background-position: -50rem 0;
    }
    100% {
      background-position: 50rem 0;
    }
  }
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  ${({ variant }) => {
    if (variant === "transparent")
      return `
      background: linear-gradient(to right, ${hexToRgba(
        "#eeeeee",
        0.3
      )} 8%, ${hexToRgba("#bbbbbb", 0.3)} 18%, ${hexToRgba(
        "#eeeeee",
        0.3
      )} 33%);
      background-color: ${hexToRgba("#f6f7f8", 0.3)};
    `;
    return `
      background: linear-gradient(to right, #eeeeee 8%, #bbbbbb 18%, #eeeeee 33%);
      background-color: #f6f7f8;
    `;
  }}
  ${({ position }) => position && `position: ${position};`}
  background-size: ${(props) => props.width || "100%"} 4rem;
  height: ${(props) => props.height || "5rem"};
  width: ${(props) => props.width || "100%"};
  z-index: 30;
  ${(props) => props.hidden && `display:none;`}
`;

export const Skeleton: React.FC<SkeletonProps> = function Skeleton(
  props: SkeletonProps
) {
  const { children, ...rest } = props;
  return <StyledSkeleton {...rest}>{children}</StyledSkeleton>;
};
