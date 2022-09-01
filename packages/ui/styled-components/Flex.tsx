import React from "react";
import styled from "styled-components";
import { BaseLayoutStyleProps, StandardProps } from "./system";

export interface FlexProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseLayoutStyleProps {
  flex?: string | number;
  flexBasis?: string;
  flexDirection?: string;
  flexFlow?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexWrap?: string;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  gap?: string | number;
}

export interface FlexItemProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children"> {
  collapse?: boolean;
  flex?: number | string;
  display?: string;
  flexBasis?: string;
  flexDirection?: string;
  flexFlow?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexWrap?: string;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  gap?: string | number;
}

const StyledFlex = styled("div")<FlexProps>`
  --sig-gap: ${(props) => props.gap || `0rem`};
  padding: ${(props) => props.padding};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  display: flex;
  flex-basis: ${(props) => props.flexBasis};
  flex-grow: ${(props) => props.flexGrow};
  flex-flow: ${(props) => props.flexFlow};
  flex-direction: ${(props) => props.flexDirection};
  flex-shrink: ${(props) => props.flexShrink};
  flex-wrap: ${(props) => props.flexWrap || "wrap"};
  align-content: ${(props) => props.alignContent};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  width: 100%;
  gap: var(--sig-gap);
`;

const StyledFlexItem = styled("div")<FlexItemProps>`
  display: ${(props) => props.display};
  flex: ${(props) => props.flex};
  flex-basis: ${(props) => props.flexBasis};
  flex-flow: ${(props) => props.flexFlow};
  flex-grow: ${(props) => props.flexGrow};
  flex-direction: ${(props) => props.flexDirection};
  flex-shrink: ${(props) => props.flexShrink};
  flex-wrap: ${(props) => props.flexWrap || "wrap"};
  align-content: ${(props) => props.alignContent};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  gap: ${(props) => props.gap || `0rem`};
`;

export const Flex: React.FC<FlexProps> = function Flex(props: FlexProps) {
  const { children, ...rest } = props;
  return <StyledFlex {...rest}>{children}</StyledFlex>;
};

export const FlexItem: React.FC<FlexItemProps> = function FlexItem(
  props: FlexItemProps
) {
  const { children, ...rest } = props;
  return <StyledFlexItem {...rest}>{children}</StyledFlexItem>;
};

Flex.defaultProps = {};
