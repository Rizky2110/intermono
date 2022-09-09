import { themeColor } from "core";
import Link from "next/link";
import React, { ReactNode } from "react";
import styled, { DefaultTheme } from "styled-components";
import {
  StandardProps,
  BaseTextStyleProps,
  BaseFontStyleProps,
  BaseLayoutStyleProps,
  BaseDisplayStyleProps,
} from "./system";
import { Tooltip } from "./Tooltip";

export interface TextViewLinkProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, "children">,
    BaseTextStyleProps,
    BaseFontStyleProps,
    BaseLayoutStyleProps,
    BaseDisplayStyleProps {
  variant?: "standard" | "outline";
  size?: keyof Pick<DefaultTheme, "typography">["typography"]["size"];
  weight?: keyof Pick<DefaultTheme, "typography">["typography"]["weight"];
  component?: keyof JSX.IntrinsicElements;
  href?: string;
  tooltip?: string | ReactNode;
}

type AddedProps = {
  as: string;
};

type ComponentProps = TextViewLinkProps & AddedProps;

const StyledTextViewLink = styled("span")<ComponentProps>`
  font: ${(props) => props.font || "inherit"};
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => {
    if (props.fontSize) return props.fontSize || "inherit";
    if (props.size) return props.theme.typography.size[props.size || "body2"];
    return "inherit";
  }};
  font-style: ${(props) => props.fontStyle || "inherit"};
  font-variant: ${(props) => props.fontVariant || "inherit"};
  font-weight: ${(props) => {
    if (props.fontWeight) return props.fontWeight || "inherit";
    if (props.weight)
      return props.theme.typography.weight[props.weight || "body2"];
    return "inherit";
  }};
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
  text-decoration: ${(props) => props.textDecoration || "inherit"};
  text-indent: ${(props) => props.textIndent || "inherit"};
  text-transform: ${(props) => props.textTransform || "inherit"};

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
  display: ${(props) => props.display};
  flex: ${(props) => props.flex};
  flex-basis: ${(props) => props.flexBasis};
  flex-flow: ${(props) => props.flexFlow};
  flex-direction: ${(props) => props.flexDirection};
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  flex-wrap: ${(props) => props.flexWrap};
  gap: ${(props) => props.gap};
  ${(props) => (props.href ? "cursor: pointer;" : "")}
`;

export const TextViewLink: React.FC<TextViewLinkProps> = function TextViewLink(
  props: TextViewLinkProps
) {
  const { children, variant, component, href, tooltip, ...rest } = props;
  if (href) {
    if (tooltip) {
      return (
        <Tooltip content={tooltip || ""}>
          <Link href={href} passHref>
            <StyledTextViewLink
              variant={variant}
              as={component || "span"}
              {...rest}
            >
              {children}
            </StyledTextViewLink>
          </Link>
        </Tooltip>
      );
    }
    return (
      <Link href={href} passHref>
        <StyledTextViewLink
          variant={variant}
          as={component || "span"}
          {...rest}
        >
          {children}
        </StyledTextViewLink>
      </Link>
    );
  }

  if (tooltip) {
    return (
      <Tooltip content={tooltip || ""}>
        <StyledTextViewLink
          variant={variant}
          as={component || "span"}
          {...rest}
        >
          {children}
        </StyledTextViewLink>
      </Tooltip>
    );
  }
  return (
    <StyledTextViewLink variant={variant} as={component || "span"} {...rest}>
      {children}
    </StyledTextViewLink>
  );
};

TextViewLink.defaultProps = {
  variant: "standard",
};