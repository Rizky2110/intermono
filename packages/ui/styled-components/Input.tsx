import { hexToHsl, hexToRgba } from "core";
import React from "react";
import styled from "styled-components";
import { StandardProps } from "./system";

export interface InputProps
  extends StandardProps<
    React.HTMLAttributes<HTMLInputElement>,
    | "children"
    | "onChange"
    | "onKeyUp"
    | "onKeyDown"
    | "onBlur"
    | "onFocus"
    | "defaultValue"
  > {
  "aria-describedby"?: string;
  name?: string;
  fullWidth?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  inline?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  min?: string;
  max?: string;
  type?:
    | "text"
    | "email"
    | "alphabetic"
    | "number"
    | "numeric"
    | "date"
    | "password"
    | "file";
  value?: any;
  defaultValue?: any;
  accept?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  variant?: "standard" | "plain" | "fill";
  size?: "small" | "medium" | "large";
  palette?: "primary" | "secondary" | "error" | "info" | "success";
  paletteFocus?: "primary" | "secondary" | "error" | "info" | "success";
  round?: string;
  label?: string;
  disabled?: boolean;
}

export interface SelectProps
  extends StandardProps<
    React.HTMLAttributes<HTMLSelectElement>,
    | "children"
    | "onChange"
    | "onKeyUp"
    | "onKeyDown"
    | "onBlur"
    | "onFocus"
    | "defaultValue"
  > {
  "aria-describedby"?: string;
  name?: string;
  fullWidth?: boolean;
  onChange?: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  inline?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  value?: any;
  autoComplete?: string;
  autoFocus?: boolean;
  variant?: "standard" | "plain" | "fill";
  size?: "small" | "medium" | "large";
  palette?: "primary" | "secondary" | "error" | "info" | "success";
  paletteFocus?: "primary" | "secondary" | "error" | "info" | "success";
  label?: string;
  round?: boolean | string;
  disabled?: boolean;
}

export interface ToggleProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    | "children"
    | "onChange"
    | "onKeyUp"
    | "onKeyDown"
    | "onBlur"
    | "onFocus"
    | "defaultValue"
  > {
  "aria-describedby"?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  readOnly?: boolean;
  required?: boolean;
  value?: any;
  autoComplete?: string;
  autoFocus?: boolean;
  inline?: boolean;
  checked?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  palette?: "primary" | "secondary" | "error" | "info" | "success";
}

export interface CheckboxProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    | "children"
    | "onChange"
    | "onKeyUp"
    | "onKeyDown"
    | "onBlur"
    | "onFocus"
    | "defaultValue"
  > {
  "aria-describedby"?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  required?: boolean;
  value?: any;
  autoComplete?: string;
  autoFocus?: boolean;
  inline?: boolean;
  checked?: boolean;
  disabled?: boolean;
  round?: boolean | string;
  size?: "small" | "medium" | "large";
  palette?: "primary" | "secondary" | "error" | "info" | "success";
}

export const StyledInput = styled("div")<InputProps>`
  width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-family: inherit;
  transition: all 0.25s ease;
  overflow: hidden;
  position: relative;
  ${(props) => {
    const { variant, theme, palette, paletteFocus } = props;
    if (variant === "plain") return null;
    return `
    ::before {
      border-bottom: 0.0625rem solid
        ${
          variant === "fill"
            ? theme.palette[palette || "primary"].opposite
            : theme.palette[palette || "primary"].default
        };
      left: 0;
      bottom: 0;
      content: ' ';
      position: absolute;
      right: 0;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }
    ::after {
      border-bottom: 0.125rem solid
        ${theme.palette[paletteFocus || "primary"].default};
      left: 0;
      bottom: 0;
      content: '';
      position: absolute;
      right: 0;
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }
  `;
  }}
  ._focused.label {
    color: ${(props) => {
      const { variant, theme, paletteFocus } = props;
      if (variant === "fill") return "inherit";
      return theme.palette[paletteFocus || "primary"].default;
    }};
  }
  .container {
    letter-spacing: ${(props) => props.theme.typography.spacing};
    width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: ${(props) => {
      if (props.round)
        if (typeof props.round === "string") return props.round;
        else return "0.125rem";
      return "inherit";
    }};
    color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "fill")
        return theme.palette[palette || "primary"].opposite;
      return theme.palette[palette || "primary"].default;
    }};
    background-color: ${(props) => {
      const { variant, palette, theme, disabled } = props;
      if (disabled) return hexToRgba(theme.colors.body2, 0.8);
      if (variant === "fill")
        return theme.palette[palette || "primary"].default;
      if (variant === "plain")
        return theme.palette[palette || "primary"].opposite;
      return hexToRgba(theme.colors.body2, 0.4);
    }};
    text-align: center;
    .label {
      line-height: ${(props) => props.theme.typography.height};
      letter-spacing: ${(props) => props.theme.typography.spacing};
      color: ${(props) => props.theme.colors.blue900};
      font-weight: ${(props) => props.theme.typography.weight.body1};
    }
    .input-field {
      display: block;
      transition: all 0.25s ease-in-out;
      width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
      height: ${(props) => {
        const { size } = props;
        if (size === "small") return "1.75rem";
        if (size === "large") return "2.5rem";
        return "2rem";
      }};
      padding: ${(props) => {
        const { size } = props;
        if (size === "small") return "0.25rem";
        if (size === "large") return "0.5rem";
        return "0.375rem";
      }};
      font-size: ${(props) => {
        const { size, theme } = props;
        if (size === "small") return theme.typography.size.sub3;
        if (size === "large") return theme.typography.size.sub1;
        return theme.typography.size.sub2;
      }};
      background-color: transparent;
      color: ${(props) => {
        const { variant, theme, palette } = props;
        if (variant === "fill")
          return theme.palette[palette || "primary"].opposite;
        return theme.palette[palette || "primary"].default;
      }};
      flex: 1;
      border: none;
      outline: none;
      ::placeholder {
        color: ${(props) => {
          const { variant, theme, palette } = props;
          if (variant === "fill")
            return theme.palette[palette || "primary"].opposite;
          return theme.palette[palette || "primary"].default;
        }};
        opacity: 0.8;
      }
      :-ms-input-placeholder {
        color: ${(props) => {
          const { variant, theme, palette } = props;
          if (variant === "fill")
            return theme.palette[palette || "primary"].opposite;
          return theme.palette[palette || "primary"].default;
        }};
      }
      ::-ms-input-placeholder {
        color: ${(props) => {
          const { variant, theme, palette } = props;
          if (variant === "fill")
            return theme.palette[palette || "primary"].opposite;
          return theme.palette[palette || "primary"].default;
        }};
      }
      :disabled {
        cursor: not-allowed;
      }
    }

    .adornment {
      color: ${(props) => {
        const { variant, theme, palette } = props;
        if (variant === "fill")
          return theme.palette[palette || "primary"].opposite;
        return theme.palette[palette || "primary"].default;
      }};
      font-size: 1.2rem;
      padding: ${(props) => {
        const { size } = props;
        if (size === "small") return "0.25rem";
        if (size === "large") return "0.5rem";
        return "0.375rem";
      }};
    }
    .adornment svg {
      display: block;
      transition: all 0.25s ease-in-out;
    }
  }

  ${(props) => props.hidden && `display:none`}
`;

export const SelectStyle = styled("div")<InputProps>`
  width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-family: inherit;
  transition: all 0.25s ease;
  overflow: hidden;
  position: relative;
  ${(props) => {
    const { variant, theme, palette, paletteFocus } = props;
    if (variant === "plain") return null;
    return `
    ::before {
      border-bottom: 0.0625rem solid
        ${
          variant === "fill"
            ? theme.palette[palette || "primary"].opposite
            : theme.palette[palette || "primary"].default
        };
      left: 0;
      bottom: 0;
      content: ' ';
      position: absolute;
      right: 0;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }
    ::after {
      border-bottom: 0.125rem solid
        ${theme.palette[paletteFocus || "primary"].default};
      left: 0;
      bottom: 0;
      content: '';
      position: absolute;
      right: 0;
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }
  `;
  }}
  ._focused.label {
    color: ${(props) => {
      const { variant, theme, paletteFocus } = props;
      if (variant === "fill") return "inherit";
      return theme.palette[paletteFocus || "primary"].default;
    }};
  }
  .container {
    cursor: pointer;
    letter-spacing: ${(props) => props.theme.typography.spacing};
    width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: ${(props) => {
      if (props.round)
        if (typeof props.round === "string") return props.round;
        else return "0.125rem";
      return "inherit";
    }};
    color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "fill")
        return theme.palette[palette || "primary"].opposite;
      return theme.palette[palette || "primary"].default;
    }};
    background-color: ${(props) => {
      const { variant, palette, theme } = props;
      if (variant === "fill")
        return theme.palette[palette || "primary"].default;
      return hexToRgba(theme.colors.body2, 0.4);
    }};
    .label {
      line-height: ${(props) => props.theme.typography.height};
      letter-spacing: ${(props) => props.theme.typography.spacing};
      color: ${(props) => props.theme.colors.blue900};
      font-weight: ${(props) => props.theme.typography.weight.body1};
    }
    text-align: center;
    .select-field {
      cursor: pointer;
      display: block;
      transition: all 0.25s ease-in-out;
      width: ${(props) => (props.fullWidth ? "100%" : "max-content")};
      height: ${(props) => {
        const { size } = props;
        if (size === "small") return "1.75rem";
        if (size === "large") return "2.5rem";
        return "2rem";
      }};
      padding: ${(props) => {
        const { size } = props;
        if (size === "small") return "0.25rem";
        if (size === "large") return "0.5rem";
        return "0.375rem";
      }};
      font-size: ${(props) => {
        const { size, theme } = props;
        if (size === "small") return theme.typography.size.sub3;
        if (size === "large") return theme.typography.size.sub1;
        return theme.typography.size.sub2;
      }};
      background-color: transparent;
      color: ${(props) => {
        const { variant, theme, palette } = props;
        if (variant === "fill")
          return theme.palette[palette || "primary"].opposite;
        return theme.palette[palette || "primary"].default;
      }};
      flex: 1;
      border: none;
      outline: none;
      font-weight: ${(props) => props.theme.typography.weight.body1};
      ::placeholder {
        color: ${(props) => {
          const { variant, theme, palette } = props;
          if (variant === "fill")
            return theme.palette[palette || "primary"].opposite;
          return theme.palette[palette || "primary"].default;
        }};
        opacity: 0.8;
      }
      :-ms-input-placeholder {
        color: ${(props) => {
          const { variant, theme, palette } = props;
          if (variant === "fill")
            return theme.palette[palette || "primary"].opposite;
          return theme.palette[palette || "primary"].default;
        }};
      }
      ::-ms-input-placeholder {
        color: ${(props) => {
          const { variant, theme, palette } = props;
          if (variant === "fill")
            return theme.palette[palette || "primary"].opposite;
          return theme.palette[palette || "primary"].default;
        }};
      }
    }
    .adornment {
      color: ${(props) => {
        const { variant, theme, palette } = props;
        if (variant === "fill")
          return theme.palette[palette || "primary"].opposite;
        return theme.palette[palette || "primary"].default;
      }};
      font-size: 1.2rem;
      padding: ${(props) => {
        const { size } = props;
        if (size === "small") return "0.25rem";
        if (size === "large") return "0.5rem";
        return "0.375rem";
      }};
    }
    .adornment svg {
      display: block;
      transition: all 0.25s ease-in-out;
    }
  }
  ${(props) => props.hidden && `display:none`}
`;
export const ToggleStyle = styled("div")<ToggleProps>`
  --sig-width: 3.75rem;
  --sig-height: 2.125rem;
  --sig-slider-size: 1.625rem;
  position: relative;
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-family: inherit;
  font-weight: ${(props) => props.theme.typography.weight.sub1};
  line-height: ${(props) => props.theme.typography.spacing};
  width: ${(props) => {
    if (props.size === "small") return "calc(var(--sig-width) * 0.75)";
    if (props.size === "medium") return "var(--sig-width)";
    if (props.size === "large") return "calc(var(--sig-width) * 1.25)";
    return "var(--sig-width)";
  }};
  height: ${(props) => {
    if (props.size === "small") return "calc(var(--sig-height) * 0.75)";
    if (props.size === "medium") return "var(--sig-height)";
    if (props.size === "large") return "calc(var(--sig-height) * 1.25)";
    return "var(--sig-height)";
  }};
  transition: all 0.25s ease;
  & input {
    position: absolute;
    z-index: 15;
    opacity: 0;
    top: 0;
    left: 0;
    width: ${(props) => {
      if (props.size === "small") return "calc(var(--sig-width) * 0.75)";
      if (props.size === "medium") return "var(--sig-width)";
      if (props.size === "large") return "calc(var(--sig-width) * 1.25)";
      return "var(--sig-width)";
    }};
    height: ${(props) => {
      if (props.size === "small") return "calc(var(--sig-height) * 0.75)";
      if (props.size === "medium") return "var(--sig-height)";
      if (props.size === "large") return "calc(var(--sig-height) * 1.25)";
      return "var(--sig-height)";
    }};
  }
  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.body2};
    transition: 0.4s;
    border-radius: 2.125rem;
  }
  & .slider:before {
    position: absolute;
    content: "";
    height: ${(props) => {
      if (props.size === "small") return "calc(var(--sig-slider-size) * 0.75)";
      if (props.size === "medium") return "var(--sig-slider-size)";
      if (props.size === "large") return "calc(var(--sig-slider-size) * 1.25)";
      return "var(--sig-slider-size)";
    }};
    width: ${(props) => {
      if (props.size === "small") return "calc(var(--sig-slider-size) * 0.75)";
      if (props.size === "medium") return "var(--sig-slider-size)";
      if (props.size === "large") return "calc(var(--sig-slider-size) * 1.25)";
      return "var(--sig-slider-size)";
    }};
    left: ${(props) => {
      if (props.size === "small") return "calc(0.25rem * 0.75)";
      if (props.size === "medium") return "0.25rem";
      if (props.size === "large") return "calc(0.25rem * 1.25)";
      return "0.25rem";
    }};
    bottom: ${(props) => {
      if (props.size === "small") return "calc(0.25rem * 0.75)";
      if (props.size === "medium") return "0.25rem";
      if (props.size === "large") return "calc(0.25rem * 1.25)";
      return "0.25rem";
    }};
    background-color: ${(props) =>
      props.theme.palette[props.palette || "primary"].opposite};
    transition: 0.4s;
    border-radius: 50%;
  }
  & input:checked + .slider {
    background-color: ${(props) =>
      props.theme.palette[props.palette || "primary"].default};
  }
  & input:focus + .slider {
    box-shadow: 0 0 0.0625rem #${(props) => props.theme.palette[props.palette || "primary"].default};
  }
  & input:checked + .slider:before {
    transform: ${(props) => {
      if (props.size === "small")
        return "translateX(calc(var(--sig-slider-size) * 0.75))";
      if (props.size === "medium") return "translateX(var(--sig-slider-size))";
      if (props.size === "large")
        return "translateX(calc(var(--sig-slider-size) * 1.25))";
      return "translateX(var(--sig-slider-size))";
    }};
  }
  ${(props) => props.hidden && `display:none`}
`;

export const CheckboxStyle = styled("div")<CheckboxProps>`
  --sig-width: 1.5rem;
  --sig-height: 1.5rem;
  --sig-checkmark-size: 1.625rem;
  position: relative;
  display: block;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.weight.sub1};
  line-height: ${({ theme }) => theme.typography.spacing};
  width: ${({ size }) => {
    if (size === "small") return "calc(var(--sig-width) * 0.75)";
    if (size === "medium") return "var(--sig-width)";
    if (size === "large") return "calc(var(--sig-width) * 1.25)";
    return "var(--sig-width)";
  }};
  height: ${({ size }) => {
    if (size === "small") return "calc(var(--sig-height) * 0.75)";
    if (size === "medium") return "var(--sig-height)";
    if (size === "large") return "calc(var(--sig-height) * 1.25)";
    return "var(--sig-height)";
  }};
  input {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 15;
    opacity: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  label::before {
    z-index: 5;
    content: "";
    display: block;
    position: absolute;
    text-align: center;
    width: ${({ size }) => {
      if (size === "small") return "calc(var(--sig-width) * 0.75)";
      if (size === "medium") return "var(--sig-width)";
      if (size === "large") return "calc(var(--sig-width) * 1.25)";
      return "var(--sig-width)";
    }};
    height: ${({ size }) => {
      if (size === "small") return "calc(var(--sig-height) * 0.75)";
      if (size === "medium") return "var(--sig-height)";
      if (size === "large") return "calc(var(--sig-height) * 1.25)";
      return "var(--sig-height)";
    }};
    left: 0;
    top: 0;
    background-color: ${({ theme, palette }) =>
      hexToHsl(theme.palette[palette || "primary"].default, 30)};
    font-family: inherit;
    border: 0.0625rem solid
      ${({ theme, palette }) => theme.palette[palette || "primary"].default};
    border-radius: ${({ round }) => {
      if (round)
        if (typeof round === "string") return round;
        else return "0.25rem";
      return "inherit";
    }};
  }
  input:checked + label::before {
    z-index: 5;
    content: "";
    display: block;
    position: absolute;
    text-align: center;
    width: ${({ size }) => {
      if (size === "small") return "calc(var(--sig-width) * 0.75)";
      if (size === "medium") return "var(--sig-width)";
      if (size === "large") return "calc(var(--sig-width) * 1.25)";
      return "var(--sig-width)";
    }};
    height: ${({ size }) => {
      if (size === "small") return "calc(var(--sig-height) * 0.75)";
      if (size === "medium") return "var(--sig-height)";
      if (size === "large") return "calc(var(--sig-height) * 1.25)";
      return "var(--sig-height)";
    }};
    left: 0;
    top: 0;
    background-color: ${({ theme, palette }) =>
      theme.palette[palette || "primary"].default};
    font-family: inherit;
    border-radius: ${({ round }) => {
      if (round)
        if (typeof round === "string") return round;
        else return "0.25rem";
      return "inherit";
    }};
  }

  input:checked + label::after {
    z-index: 5;
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>');
    display: block;
    position: absolute;
    left: ${({ size }) => {
      if (size === "small") return "calc(.1875rem * 0.75)";
      if (size === "medium") return ".1875rem";
      if (size === "large") return "calc(.1875rem * 1.25)";
      return ".1875rem";
    }};
    top: ${({ size }) => {
      if (size === "small") return "calc(.175rem * 0.75)";
      if (size === "medium") return ".175rem";
      if (size === "large") return "calc(.175rem * 1.25)";
      return ".175rem";
    }};
  }
  ${(props) => props.hidden && `display:none`}
`;
const CustomInput = styled(StyledInput)`
  margin: 0.375rem 0 0.375rem 0;
`;
export const Input: React.FC<InputProps> = function Input(props: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const {
    children,
    label,
    startAdornment,
    endAdornment,
    size,
    palette,
    paletteFocus,
    variant,
    fullWidth,
    type,
    style,
    disabled,
    ...rest
  } = props;
  const inputId = React.useId();
  return (
    <CustomInput
      className={`custom-input css-1ee5rio ${focus ? "_focused" : ""}`}
      variant={variant}
      palette={palette}
      style={style}
      disabled={disabled}
      paletteFocus={paletteFocus}
      size={size}
      fullWidth={fullWidth}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {label && (
        <label htmlFor={inputId} className={`label ${focus ? "_focused" : ""}`}>
          {label}
        </label>
      )}
      <div className="container">
        {startAdornment && <div className="adornment">{startAdornment}</div>}
        <input
          {...rest}
          id={inputId}
          type={type}
          disabled={disabled}
          className={`${rest.className} input-field`}
        />
        {endAdornment && <div className="adornment">{endAdornment}</div>}
      </div>
    </CustomInput>
  );
};
Input.defaultProps = {
  size: "medium",
  palette: "primary",
  paletteFocus: "secondary",
  variant: "standard",
  fullWidth: false,
  type: "text",
};

// SELECT
const CustomSelect = styled(SelectStyle)`
  margin: 0.375rem 0 0.375rem 0;
`;

export const Select: React.FC<SelectProps> = function Select(
  props: SelectProps
) {
  const [focus, setFocus] = React.useState(false);
  const {
    children,
    label,
    startAdornment,
    endAdornment,
    size,
    palette,
    paletteFocus,
    variant,
    fullWidth,
    style,
    round,
    ...rest
  } = props;
  const inputId = React.useId();
  return (
    <CustomSelect
      className={`custom-select css-1ee5rio ${focus ? "_focused" : ""}`}
      variant={variant}
      palette={palette}
      style={style}
      paletteFocus={paletteFocus}
      size={size}
      fullWidth={fullWidth}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {label && (
        <label htmlFor={inputId} className={`label ${focus ? "_focused" : ""}`}>
          {label}
        </label>
      )}
      <div className="container">
        {startAdornment && <div className="adornment">{startAdornment}</div>}
        <select
          {...rest}
          id={inputId}
          className={`${rest.className} select-field`}
        >
          {children}
        </select>

        {endAdornment && <div className="adornment">{endAdornment}</div>}
      </div>
    </CustomSelect>
  );
};
Select.defaultProps = {
  size: "medium",
  palette: "primary",
  paletteFocus: "secondary",
  variant: "standard",
  fullWidth: false,
};

// TOGGLE
const CustomToggle = styled(ToggleStyle)`
  margin: 0.5rem 0 0.5rem 0;
`;
export const Toggle: React.FC<ToggleProps> = function Toggle(
  props: ToggleProps
) {
  const { children, size, palette, style, inline, checked, onChange, ...rest } =
    props;
  const inputId = React.useId();
  return (
    <CustomToggle
      className="custom-toogle css-1ee5rio"
      palette={palette}
      style={style}
      size={size}
      inline={inline}
      checked={checked}
      {...rest}
    >
      <label htmlFor={inputId} className="label">
        <input
          onChange={onChange}
          id={inputId}
          type="checkbox"
          checked={checked}
          className={`${rest.className} input-toogle`}
        />
        <span className="slider" />
      </label>
    </CustomToggle>
  );
};
Toggle.defaultProps = {
  size: "medium",
  palette: "primary",
};
// CHECKBOX
const CustomCheckbox = styled(CheckboxStyle)``;
export const Checkbox: React.FC<CheckboxProps> = function Checkbox(
  props: CheckboxProps
) {
  const {
    children,
    size,
    palette,
    style,
    inline,
    checked,
    onChange,
    disabled,
    value,
    ...rest
  } = props;
  const inputId = React.useId();
  return (
    <CustomCheckbox
      className="custom-checkbox css-1ee5rio"
      palette={palette}
      style={style}
      size={size}
      inline={inline}
      checked={checked}
      {...rest}
    >
      <input
        onChange={onChange}
        id={inputId}
        disabled={disabled}
        type="checkbox"
        checked={checked || false}
        value={value || ""}
        className={`${rest.className} input-checkbox`}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={inputId} className="label" />
    </CustomCheckbox>
  );
};

Checkbox.defaultProps = {
  size: "medium",
  palette: "primary",
};
