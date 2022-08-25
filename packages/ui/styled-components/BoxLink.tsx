import React from "react";
import { themeColor } from "core";
import styled from "styled-components";
import Link from "next/link";
import {
  StandardProps,
  BaseTextStyleProps,
  BaseFontStyleProps,
  BaseLayoutStyleProps,
  BaseDisplayStyleProps,
  BaseDivStyleProps,
} from "./system";

export interface BoxLinkProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseTextStyleProps,
    BaseFontStyleProps,
    BaseLayoutStyleProps,
    BaseDisplayStyleProps,
    BaseDivStyleProps {
  variant?: "standard" | "outline";
  component?: keyof JSX.IntrinsicElements;
  href?: string;
}

type AddedProps = {
  as: string;
};

type ComponentProps = BoxLinkProps & AddedProps;

const StyledBoxLink = styled("div")<ComponentProps>`
  font: ${(props) => props.font || ""};
  font-family: ${(props) => props.fontFamily || ""};
  font-size: ${(props) =>
    props.fontSize || "" || props.theme.typography.size.body1};
  font-style: ${(props) => props.fontStyle || ""};
  font-variant: ${(props) => props.fontVariant || ""};
  font-weight: ${(props) => props.fontWeight || ""};
  color: ${({ theme, color }) => {
    if (typeof color === "string") {
      return themeColor(theme, color);
    }
    return "inherit";
  }};
  line-height: ${(props) => props.lineHeight || props.theme.typography.height};
  letter-spacing: ${(props) =>
    props.letterSpacing || props.theme.typography.spacing};
  text-align: ${(props) => props.textAlign || "left"};
  text-decoration: ${(props) => props.textDecoration || ""};
  text-indent: ${(props) => props.textIndent || ""};
  text-transform: ${(props) => props.textTransform || ""};
  padding: ${(props) => props.padding};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  ${({ position }) => position && `position: ${position};`}
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  display: ${(props) => props.display};
  flex: ${(props) => props.flex};
  flex-basis: ${(props) => props.flexBasis};
  flex-flow: ${(props) => props.flexFlow};
  flex-direction: ${(props) => props.flexDirection};
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  flex-wrap: ${(props) => props.flexWrap};
  align-content: ${(props) => props.alignContent};
  align-items: ${(props) => props.alignItems};
  align-self: ${(props) => props.alignSelf};
  gap: ${(props) => props.gap};

  overflow: ${(props) => props.overflow || ""};
  overflow-x: ${(props) => props.overflowX || ""};
  overflow-y: ${(props) => props.overflowY || ""};
  max-height: ${(props) => props.maxHeight || ""};
  max-width: ${(props) => props.maxWidth || ""};
  min-height: ${(props) => props.minHeight || ""};
  min-width: ${(props) => props.minWidth || ""};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  background: ${(props) => props.background || ""};
  background-color: ${({ theme, backgroundColor }) => {
    if (typeof backgroundColor === "string") {
      return themeColor(theme, backgroundColor);
    }
    return "";
  }};
  background-position: ${(props) => props.backgroundPosition || ""};
  background-repeat: ${(props) => props.backgroundRepeat || ""};
  background-size: ${(props) => props.backgroundSize || ""};
  border: ${(props) => props.border || ""};
  cursor: ${(props) => props.cursor || ""};
  direction: ${(props) => props.direction || ""};
  ${(props) => props.hidden && `display:none;`}
  ${(props) => props.href && `cursor:pointer;`}
`;

export const BoxLink: React.FC<BoxLinkProps> = function BoxLink(
  props: BoxLinkProps
) {
  const { children, variant, component, href, ...rest } = props;
  if (href)
    return (
      <Link href={href} passHref>
        <StyledBoxLink variant={variant} as={component || "div"} {...rest}>
          {children}
        </StyledBoxLink>
      </Link>
    );
  return (
    <StyledBoxLink variant={variant} as={component || "div"} {...rest}>
      {children}
    </StyledBoxLink>
  );
};
