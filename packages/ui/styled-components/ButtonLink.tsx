import { hexToHsl } from "core";
import Link from "next/link";
import styled from "styled-components";

export interface ButtonLinkProps extends React.ComponentPropsWithRef<"button"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: "contain" | "outline" | "text";
  size?: "small" | "medium" | "large";
  palette?: "primary" | "secondary" | "error" | "info" | "success";
  href?: string;
}

const StyledButton = styled("button")<ButtonLinkProps>`
  width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  transition: background 0.2s ease;
  overflow: hidden;
  font-size: ${(props) => {
    const { size, theme } = props;
    if (size === "small") return theme.typography.size.sub3;
    if (size === "large") return theme.typography.size.sub1;
    return theme.typography.size.sub2;
  }};

  background-color: ${(props) => {
    const { palette, theme, variant } = props;
    if (variant === "contain") {
      return theme.palette[palette || "primary"].default;
    }
    return theme.palette[palette || "primary"].opposite;
  }};
  ${(props) => {
    const { variant, theme, palette } = props;
    if (variant === "outline")
      return `outline: 0.063rem solid 
      ${theme.palette[palette || "primary"].default};`;
    return null;
  }}
  color: ${(props) => {
    const { variant, palette, theme } = props;
    if (variant === "contain")
      return theme.palette[palette || "primary"].opposite;
    return theme.palette[palette || "primary"].default;
  }};
  .btn-container {
    margin: auto;
    width: max-content;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .label {
    display: block;
  }
  .icon {
    color: inherit;
    font-size: 1.2rem;
  }
  .icon svg {
    display: block;
  }
  &:hover {
    background-color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "text")
        return theme.palette[palette || "primary"].default;
      if (variant === "contain")
        return hexToHsl(theme.palette[palette || "primary"].default, 10);
      return hexToHsl(theme.palette[palette || "primary"].opposite, 2);
    }};
    color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "text")
        return theme.palette[palette || "primary"].default;
      if (variant === "contain")
        return theme.palette[palette || "primary"].opposite;
      return hexToHsl(theme.palette[palette || "primary"].default, 10);
    }};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.secondary};
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.gray200};
  }
`;

export const ButtonLink: React.FC<ButtonLinkProps> = function ButtonLink(
  props: ButtonLinkProps
) {
  const { children, startIcon, endIcon, href, ...rest } = props;
  if (href)
    return (
      <Link href={href} passHref>
        <StyledButton {...rest}>
          <div className="btn-container">
            {startIcon && <div className="icon">{startIcon}</div>}
            <span className="label">{children}</span>
            {endIcon && <div className="icon">{endIcon}</div>}
          </div>
        </StyledButton>
      </Link>
    );
  return (
    <StyledButton {...rest}>
      <div className="btn-container">
        {startIcon && <div className="icon">{startIcon}</div>}
        <span className="label">{children}</span>
        {endIcon && <div className="icon">{endIcon}</div>}
      </div>
    </StyledButton>
  );
};

ButtonLink.defaultProps = {
  size: "medium",
  palette: "primary",
  variant: "contain",
  fullWidth: false,
};
