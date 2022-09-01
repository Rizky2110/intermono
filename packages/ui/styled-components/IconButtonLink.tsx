import { hexToHsl, hexToRgba, themeColor } from "core";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { StandardProps } from "./system";
import { Tooltip } from "./Tooltip";

export interface IconButtonLinkProps
  extends StandardProps<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  type?: "submit" | "button";
  disabled?: boolean;
  href: string;
  variant?: "standard" | "outline" | "fill";
  size?: "small" | "medium" | "large";
  palette?: "primary" | "secondary" | "error" | "info" | "success" | "light";
  round?: boolean | string;
  tooltip?: string | React.ReactNode;
  download?: boolean;
}

const StyledIconButtonLink = styled("button")<
  Omit<IconButtonLinkProps, "href">
>`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  outline: none;
  border-radius: ${(props) => {
    if (props.round)
      if (typeof props.round === "string") return props.round;
      else return props.theme.width.round;
    return "0.25rem";
  }};
  cursor: pointer;
  transition: all 0.1s ease;
  overflow: hidden;
  padding: ${(props) => {
    const { size } = props;
    if (size === "small") return "0.25rem";
    if (size === "large") return "0.5rem";
    return "0.375rem";
  }};
  background-color: ${(props) => {
    const { palette, theme, variant } = props;
    if (variant === "fill") {
      return hexToRgba(theme.palette[palette || "primary"].default, 0.5);
    }
    return "transparent";
  }};
  ${(props) => {
    const { variant, theme, palette } = props;
    if (variant === "outline")
      return `outline: 0.063rem solid ${
        theme.palette[palette || "primary"].default
      };`;
    return null;
  }}
  color: ${(props) => {
    const { variant, palette, theme } = props;
    if (variant === "fill") return theme.palette[palette || "primary"].opposite;
    return theme.palette[palette || "primary"].default;
  }};
  svg {
    display: block;
    color: ${(props) => {
      const { color, theme } = props;
      return themeColor(theme, color);
    }};
    height: ${(props) => {
      const { size, theme } = props;
      if (size === "small") return theme.typography.size.icon1;
      if (size === "large") return theme.typography.size.icon3;
      return theme.typography.size.icon2;
    }};
    width: ${(props) => {
      const { size, theme } = props;
      if (size === "small") return theme.typography.size.icon1;
      if (size === "large") return theme.typography.size.icon3;
      return theme.typography.size.icon2;
    }};
  }
  &:hover {
    background-color: ${(props) => {
      const { variant, palette, theme, disabled } = props;
      if (disabled) {
        if (variant === "fill")
          return hexToRgba(theme.palette[palette || "primary"].default, 0.8);
        if (variant === "standard")
          return hexToRgba(theme.palette[palette || "primary"].opposite, 0.8);
        return hexToRgba(theme.palette[palette || "primary"].opposite, 0.2);
      }
      if (variant === "fill")
        return hexToHsl(theme.palette[palette || "primary"].default, -10);
      if (variant === "standard")
        return hexToRgba(theme.palette[palette || "primary"].default, 0.2);
      return hexToHsl(theme.palette[palette || "primary"].opposite, -10);
    }};
  }
  &:disabled {
    background-color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "fill")
        return hexToRgba(theme.palette[palette || "primary"].default, 0.2);
      if (variant === "standard")
        return hexToRgba(theme.palette[palette || "primary"].opposite, 0.5);
      return hexToRgba(theme.palette[palette || "primary"].opposite, 0.5);
    }};
    cursor: not-allowed;
    color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "fill")
        return hexToHsl(theme.palette[palette || "primary"].opposite, 20);
      return hexToHsl(theme.palette[palette || "primary"].default, 20);
    }};
  }
`;

export const IconButtonLink: React.FC<IconButtonLinkProps> =
  function IconButtonLink(props: IconButtonLinkProps) {
    const { children, href, tooltip, ...rest } = props;
    if (tooltip) {
      return (
        <Tooltip content={tooltip || ""}>
          <Link href={href} passHref>
            <StyledIconButtonLink aria-label="icon button" {...rest}>
              {children}
            </StyledIconButtonLink>
          </Link>
        </Tooltip>
      );
    }

    return (
      <Link href={href} passHref>
        <StyledIconButtonLink aria-label="icon button" {...rest}>
          {children}
        </StyledIconButtonLink>
      </Link>
    );
  };

IconButtonLink.defaultProps = {
  size: "medium",
  palette: "primary",
  variant: "standard",
};
