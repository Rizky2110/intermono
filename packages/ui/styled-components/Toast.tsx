import { hexToRgba } from "core";
import { CheckCircle, Question, WarningCircle, X } from "phosphor-react";
import React from "react";
import styled from "styled-components";
import { ToastKind, useToast } from "./ThemeContext";

const StyledToast = styled("div")`
  --toast-width: 22rem;
  --toast-height: 4.875rem;

  box-sizing: border-box;
  position: fixed;
  z-index: 99999999999999999999;
  right: 1rem;
  top: 1rem;
  animation: toast-in-right 0.7s;

  .toast-notification .icon {
    display: block;
    fill: currentColor;
    color: ${(props) => props.theme.colorPalette.white};
  }

  .toast-notification .text {
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0.01em;
    margin-block-end: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    width: calc(var(--toast-width) - 10rem);
    color: ${(props) => props.theme.colorPalette.white};
  }

  .toast-notification .button {
    padding: 0;
    font-size: 1.25rem;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }

  .toast-notification {
    background: ${(props) => props.theme.colors.body};
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    pointer-events: auto;
    overflow: hidden;
    padding: 1.5rem;
    width: var(--toast-width);
    max-height: 4.875rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.625rem #999;
    opacity: 0.9;
    background-position: 0.938rem;
    background-repeat: no-repeat;
    transition: 0.3s ease;
    margin-block-end: 1rem;
    animation: toast-in-right 0.7s;
  }

  .toast-notification.info {
    background: ${(props) => props.theme.colors.info};
  }

  .toast-notification.success {
    background: ${(props) => props.theme.colors.success};
  }

  .toast-notification.error {
    background: ${(props) => props.theme.colors.error};
  }

  .toast {
    height: var(--toast-height);
    width: var(--toast-width);
  }

  .toast-notification:hover {
    box-shadow: 0 0 0.75rem
      ${({ theme }) => hexToRgba(theme.colors.shadow1, 0.8)};
    opacity: 1;
    cursor: pointer;
  }

  .toast-notification .toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
  }

  .toast-notification .toast-icon .icon {
    font-size: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      fill: currentColor;
      color: red;
      display: block;
    }
  }

  .toast-notification .toast-information {
    flex: 1;
  }

  .toast-notification .toast-information .text-toast-title {
    font-size: 1rem;
    font-weight: 600;
  }

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (min-width: 36rem) {
    --toast-width: 30rem;
    --toast-height: 4.875rem;
  }

  @media (min-width: 48rem) {
    --toast-width: 37.5rem;
    --toast-height: 4.875rem;
  }
`;

const Toast: React.FC = function Toast() {
  const {
    toast: { toasts },
    dispatchToast,
  } = useToast();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length) {
        dispatchToast({
          type: ToastKind.Remove,
          payload: toasts[toasts.length - 1],
        });
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [toasts, dispatchToast]);

  return (
    <StyledToast className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-notification toast ${toast.type} `}
        >
          <span className="toast-icon">
            {toast.type === "success" && (
              <CheckCircle weight="fill" className="icon" />
            )}
            {toast.type === "error" && (
              <WarningCircle weight="fill" className="icon" />
            )}
            {toast.type === "info" && (
              <Question weight="fill" className="icon" />
            )}
          </span>
          <div className="toast-information">
            <h3 className="text text-toast-title">{toast.title}</h3>
            <p className="text text-toast-desc">{toast.description}</p>
          </div>
          <button
            type="button"
            className="button btn-toast"
            onClick={() =>
              dispatchToast({
                type: ToastKind.Remove,
                payload: toasts[toasts.length - 1],
              })
            }
          >
            <X weight="bold" className="icon" />
          </button>
        </div>
      ))}
    </StyledToast>
  );
};

export default Toast;
