import { themeColor, useUniqueId } from "core";
import React from "react";
import styled from "styled-components";
import {
  BaseLayoutStyleProps,
  BaseTextStyleProps,
  StandardProps,
} from "./system";

export interface ModalProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children"> {
  isOpen: boolean;
  handleClose: () => void;
  fullWidth?: boolean;
  scroll?: "body" | "content";
  variant?: "standard" | "fill";
  disabled?: boolean;
  size?: "small" | "medium" | "large" | "exlarge";
  palette?: "primary" | "secondary" | "error" | "info" | "success";
  round?: string | boolean;
  outline?: string | boolean;
}

export interface ModalHeadProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseTextStyleProps,
    BaseLayoutStyleProps {
  flex?: boolean;
}

export interface ModalFootProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseTextStyleProps,
    BaseLayoutStyleProps {
  textAlign?: "inherit" | "left" | "center" | "right" | "justify";
  flex?: boolean;
}

export interface ModalBodyProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, "children">,
    BaseTextStyleProps,
    BaseLayoutStyleProps {
  flex?: boolean;
}

const StyledModal = styled("div")<ModalProps>`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(0.25rem);
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (!props.isOpen ? "hidden" : "visible")};
  & .modal-container {
    overflow-y: auto;
    ${(props) => {
      if (!props.fullWidth) {
        if (props.scroll === "content" || props.fullWidth)
          return `
            outline: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
          `;
        return `
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
        `;
      }
      return `
        display: block;
      `;
    }}
    height: 100%;
    outline: 0;
    opacity: ${(props) => (!props.isOpen ? "0" : "1")};
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    & .modal-content {
      margin: ${(props) => (props.fullWidth ? "0" : "2rem")};
      ${(props) => {
        if (props.scroll === "content" || props.fullWidth)
          return `
            max-height: ${props.fullWidth ? `100%` : `calc(100% - 4rem)`};
            height: ${props.fullWidth ? `100%` : `auto`};
            position: relative;
            display: flex;
            flex-direction: column;            
          `;
        return `
          position: relative;
          display: flex;
          flex: 0 1 auto;
          flex-direction: column;
      `;
      }}
      max-width: ${(props) => {
        const { size, fullWidth } = props;
        if (fullWidth) return "100%";
        if (size === "small") return "24.281rem";
        if (size === "large") return "56.25rem";
        if (size === "exlarge") return "75rem";
        return "37.5rem";
      }};
      width: ${(props) => (props.fullWidth ? "100%" : "calc(100% - 4rem)")};
      background-color: ${(props) => {
        const { palette, theme, variant } = props;
        if (variant === "fill") {
          return theme.palette[palette || "primary"].default;
        }
        return "transparent";
      }};
      border-radius: ${(props) => {
        if (props.round)
          if (typeof props.round === "string") return props.round;
          else return props.theme.width.round;
        return "inherit";
      }};
      ${({ theme, outline, palette }) =>
        outline
          ? `outline: solid ${theme.palette[palette || "primary"].default} ${
              typeof outline === "string" ? outline : `0.0625em`
            }`
          : null};
      ${(props) =>
        !props.outline &&
        `
      > * {
        &:first-child {
          border-top-left-radius: inherit;
          border-top-right-radius: inherit;
        }
        &:last-child {
          border-bottom-left-radius: inherit;
          border-bottom-right-radius: inherit;
        }
      }`}
      .modal-head {
        background-color: ${({ theme, palette }) =>
          theme.palette[palette || "primary"].default};
        color: ${({ theme, palette }) =>
          theme.palette[palette || "primary"].opposite};
      }
      .modal-foot {
        background-color: ${(props) => {
          const { palette, theme, variant } = props;
          if (variant === "fill") {
            return theme.palette[palette || "primary"].default;
          }
          return theme.colors.body;
        }};
      }
      .modal-body {
        height: ${(props) => (props.fullWidth ? "100%" : "auto")};
        ${(props) =>
          props.scroll === "content" || props.fullWidth
            ? "overflow-y: auto;"
            : null}
        background-color: ${(props) => {
          const { palette, theme, variant } = props;
          if (variant === "fill") {
            return theme.palette[palette || "primary"].default;
          }
          return theme.colors.body;
        }};
      }
    }
  }
`;

const StyledHead = styled("div")<ModalHeadProps>`
  border-bottom: 0.063rem solid ${({ theme }) => theme.colors.divider};
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
  padding: ${(props) => props.padding || `0.675rem 1rem 0.675rem 1rem`};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  ${(props) => {
    const { flex } = props;
    if (flex) {
      return `
        display: flex;
        align-items: center;
        gap: 1rem;
      `;
    }
    return ``;
  }}
`;
const StyledFoot = styled("div")<ModalFootProps>`
  border-top: 0.063rem solid ${({ theme }) => theme.colors.divider};
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
  padding: ${(props) => props.padding || `0.675rem 1rem 0.675rem 1rem`};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  ${(props) => {
    const { flex } = props;
    if (flex) {
      return `
        display: flex;
        align-items: center;
        flex-warp: warp;
        gap: 1rem;    
      `;
    }
    return ``;
  }}
`;
const StyledBody = styled("div")<ModalBodyProps>`
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
  padding: ${(props) => props.padding || `1rem`};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-top: ${(props) => props.marginTop};
  ${(props) => {
    const { flex } = props;
    if (flex) {
      return `
        display: flex;
        align-items: center;
        gap: 1rem;    
      `;
    }
    return ``;
  }}
`;

const StyledDefaultModal = styled(StyledModal)`
  z-index: 100000;
`;

export const Modal: React.FC<ModalProps> = function Modal(props: ModalProps) {
  const { children, isOpen, handleClose, ...rest } = props;
  const unique = useUniqueId();
  React.useEffect(() => {
    const modalList = document.querySelector(".modal-root.show");

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else if (!modalList) {
      document.body.style.overflow = "auto";
    }
    return () => {
      if (!modalList) document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onClick = (event: React.MouseEvent) => {
    const dataRole = (event.target as HTMLElement).getAttribute("data-role");
    if (dataRole === `modal-backdrop-${unique}`) {
      handleClose();
    }
  };

  return (
    <StyledDefaultModal
      role="presentation"
      data-role={`modal-backdrop-${unique}`}
      isOpen={isOpen}
      onClick={onClick}
      handleClose={handleClose}
      {...rest}
    >
      <div style={{ display: "block" }} data-test="sentinelStart" />
      <div
        className="modal-container"
        data-role={`modal-backdrop-${unique}`}
        role="presentation"
      >
        <div className="modal-content" role="dialog">
          {children}
        </div>
      </div>
      <div style={{ display: "block" }} data-test="sentinelEnd" />
    </StyledDefaultModal>
  );
};

export const ModalHead: React.FC<ModalHeadProps> = function ModalHead(
  props: ModalHeadProps
) {
  const { children, className, ...rest } = props;
  return (
    <StyledHead className={`modal-head ${className}`} {...rest}>
      {children}
    </StyledHead>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = function ModalBody(
  props: ModalBodyProps
) {
  const { children, className, ...rest } = props;
  return (
    <StyledBody className={`modal-body ${className}`} {...rest}>
      {children}
    </StyledBody>
  );
};

export const ModalFoot: React.FC<ModalFootProps> = function ModalFoot(
  props: ModalFootProps
) {
  const { children, className, ...rest } = props;
  return (
    <StyledFoot className={`modal-foot ${className}`} {...rest}>
      {children}
    </StyledFoot>
  );
};

Modal.defaultProps = {
  size: "medium",
  color: "primary",
  variant: "standard",
  fullWidth: false,
};

ModalHead.defaultProps = {
  flex: false,
};
ModalFoot.defaultProps = {
  flex: false,
};
