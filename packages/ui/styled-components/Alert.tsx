import { hexToHsl } from "core";
import { CheckCircle, Question, WarningCircle } from "phosphor-react";
import React from "react";
import styled from "styled-components";

export interface AlertPropsBase extends React.ComponentPropsWithRef<"dialog"> {
  catchOnCancel?: boolean;
  variant?: "success" | "warning" | "error";
  title: string;
  message: string;
}

export interface AlertProps extends AlertPropsBase {
  open?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
  onView?: () => void;
}

const StyledAlert = styled("dialog")<Omit<AlertProps, "onCancel">>`
  --alert-width: 25rem;
  --alert-height: 30rem;
  --alert-icon-size: 11rem;

  background: ${(props) => {
    const { variant, theme } = props;
    if (variant === "success") return theme.components.alert.success.body;
    if (variant === "error") return theme.components.alert.error.body;
    if (variant === "warning") return theme.components.alert.warning.body;
    return theme.components.alert.success.body;
  }};

  border: none;
  outline: none;
  border-radius: 2rem;
  padding: 0;

  &::backdrop {
    backdrop-filter: blur(0.375rem);
    background-blend-mode: exclusion;
    background: rgba(0, 0, 0, 0.5);
  }

  &[open] {
    animation: scale-up 250ms forwards, fade-in 125ms forwards;
  }

  &[closing] {
    display: block;
    pointer-events: none;
    inset: 0;
    animation: fade-out 250ms forwards, scale-down 200ms forwards;
  }

  .alert {
    width: var(--alert-width);
    height: var(--alert-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 4rem 1.5rem 1.5rem;

    .icon {
      display: block;

      & polyline {
        stroke: ${(props) => props.theme.colorPalette.white};
      }

      & line {
        stroke: ${(props) => props.theme.colorPalette.white};
      }

      ${(props) => {
        const { variant, theme } = props;
        if (variant === "error") {
          return `
            & circle:last-child {
              fill: ${theme.colorPalette.white};
            }
          `;
        }

        return null;
      }}

      ${(props) => {
        const { variant, theme } = props;
        if (variant === "warning") {
          return `
            & circle:nth-child(3) {
              fill: ${theme.colorPalette.white};
            }

            & path {
              stroke: ${theme.colorPalette.white};
            }
          `;
        }

        return null;
      }}
    }

    .text {
      margin-block-end: 0;
      font-weight: ${(props) => props.theme.typography.weight.body1};
      color: ${(props) => props.theme.colors.primary};
      font-size: ${(props) => props.theme.typography.size.body1};
    }

    .button {
      flex: 1;
      border: none;
      outline: none;
      border-radius: 0.8rem;
      padding: 0.5rem 2rem;
      font-size: 1rem;
      font-weight: 500;
      background: #fff;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    &-box-icon {
      position: relative;
      width: var(--alert-icon-size);
      height: var(--alert-icon-size);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease;

      &::before {
        position: absolute;
        content: "";
        inset: 0;
        border-radius: 50%;
        background: #fff;
        border: 0.625rem solid
          ${(props) => {
            const { variant, theme } = props;
            if (variant === "success")
              return theme.components.alert.success.button;
            if (variant === "error") return theme.components.alert.error.button;
            if (variant === "warning")
              return theme.components.alert.warning.button;
            return theme.components.alert.success.button;
          }};
        z-index: -1;
        transition: all 0.5s ease;
      }

      &::after {
        position: absolute;
        content: "";
        width: calc(var(--alert-icon-size) * 0.8);
        height: calc(var(--alert-icon-size) * 0.8);
        background: transparent;
        border-radius: 50%;
        background-color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return theme.components.alert.success.button;
          if (variant === "error") return theme.components.alert.error.button;
          if (variant === "warning")
            return theme.components.alert.warning.button;
          return theme.components.alert.success.button;
        }};
        z-index: -1;
        transition: all 0.5s ease;
      }

      & .icon {
        color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return theme.components.alert.success.button;
          if (variant === "error") return theme.components.alert.error.button;
          if (variant === "warning")
            return theme.components.alert.warning.button;
          return theme.components.alert.success.button;
        }};

        font-size: var(--alert-icon-size);
      }
    }

    &-box-message {
      width: 100%;

      & .text-title {
        margin-block-end: 0.5rem;
        font-weight: 600;
        font-size: 2rem;
        color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return theme.components.alert.success.button;
          if (variant === "error") return theme.components.alert.error.button;
          if (variant === "warning")
            return theme.components.alert.warning.button;
          return theme.components.alert.success.button;
        }};
      }
    }

    &-box-action {
      width: 100%;
      display: flex;
      align-items: stretch;
      gap: 0.5rem;
      flex-wrap: wrap;

      & .btn-view {
        background-color: ${(props) => {
          const { variant, theme } = props;

          if (variant === "success")
            return theme.components.alert.success.button;
          if (variant === "error") return theme.components.alert.error.button;
          if (variant === "warning")
            return theme.components.alert.warning.button;
          return theme.components.alert.success.button;
        }};
        color: ${(props) => props.theme.colorPalette.white};
      }

      & .btn-view:hover {
        background-color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return hexToHsl(theme.components.alert.success.button, 10);
          if (variant === "error")
            return hexToHsl(theme.components.alert.error.button, 10);
          if (variant === "warning")
            return hexToHsl(theme.components.alert.warning.button, 10);
          return hexToHsl(theme.components.alert.success.button, 10);
        }};
      }

      & .btn-cancel {
        color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return theme.components.alert.success.button;
          if (variant === "error") return theme.components.alert.error.button;
          if (variant === "warning")
            return theme.components.alert.warning.button;
          return theme.components.alert.success.button;
        }};
        background-color: ${(props) => props.theme.colorPalette.white};
      }

      & .btn-cancel:hover {
        background-color: ${(props) =>
          hexToHsl(props.theme.colorPalette.white, 10)};
      }

      & .btn-next {
        background-color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return theme.components.alert.success.button;
          if (variant === "error") return theme.components.alert.error.button;
          if (variant === "warning")
            return theme.components.alert.warning.button;
          return theme.components.alert.success.button;
        }};
        color: ${(props) => props.theme.colorPalette.white};
      }

      & .btn-next:hover {
        background-color: ${(props) => {
          const { variant, theme } = props;
          if (variant === "success")
            return hexToHsl(theme.components.alert.success.button, 10);
          if (variant === "error")
            return hexToHsl(theme.components.alert.error.button, 10);
          if (variant === "warning")
            return hexToHsl(theme.components.alert.warning.button, 10);
          return hexToHsl(theme.components.alert.success.button, 10);
        }};
      }
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes scale-up {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes scale-down {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

const Alert: React.FC<AlertProps> = function Alert({
  variant,
  title,
  message,
  onView,
  onCancel,
  onConfirm,
  open,
}: AlertProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const animationOnClose = React.useCallback(() => {
    dialogRef.current?.removeAttribute("closing");
    dialogRef.current?.close();
  }, []);

  React.useEffect(() => {
    const refs = dialogRef.current;
    refs?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    });

    if (open) {
      if (!refs?.open) {
        refs?.showModal();
      }
    } else if (refs?.open) {
      refs?.setAttribute("closing", "");

      refs?.addEventListener("animationend", animationOnClose, {
        once: true,
      });
    }

    return () => {
      refs?.removeEventListener("animationend", animationOnClose);
      refs?.removeEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") onCancel();
      });
    };
  }, [open, animationOnClose, onCancel]);

  return (
    <StyledAlert
      ref={dialogRef}
      variant={variant}
      title={title}
      message={message}
    >
      <div className={`alert ${variant || ""}`}>
        <span className="alert-box-icon">
          {variant === "success" && (
            <CheckCircle weight="thin" className="icon" />
          )}
          {variant === "error" && (
            <WarningCircle weight="thin" className="icon" />
          )}
          {variant === "warning" && <Question weight="thin" className="icon" />}
        </span>
        <div className="alert-box-message">
          <h3 className="text text-title">{title}</h3>
          <p className="text text-message">{message}</p>
        </div>
        <div className="alert-box-action">
          {onView && (
            <button
              type="button"
              className="button btn-view"
              onClick={onConfirm}
            >
              View Changes
            </button>
          )}

          {onCancel && (
            <button
              type="button"
              className="button btn-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

          {onConfirm && (
            <button
              type="button"
              className="button btn-next"
              onClick={onConfirm}
            >
              Yes, Sure
            </button>
          )}
        </div>
      </div>
    </StyledAlert>
  );
};

Alert.defaultProps = {
  onView: undefined,
  onConfirm: undefined,
  open: false,
};

export default Alert;
