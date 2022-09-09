import React from "react";
import styled from "styled-components";
import { Input as DefaultInput, InputProps as DefaultInputProps } from "ui/sc";

const StyledInput = styled("div")`
  .custom-input {
    .label {
      font-size: 12px;
      font-weight: 500;
    }

    .container {
      padding: 0.5rem 0.5rem;
      border: 1px solid ${(props) => props.theme.colors.body3};
      border-radius: 8px;
    }

    .icon {
      color: ${(props) => props.theme.colors.body3};
    }
  }
`;

const Input: React.FC<DefaultInputProps> = function Input(
  props: DefaultInputProps
) {
  return (
    <StyledInput>
      <DefaultInput {...props} />
    </StyledInput>
  );
};

export default Input;
