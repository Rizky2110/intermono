import { hexToHsl, PACKAGE_NAME } from "core";
import styled from "styled-components";

const StyledButton = styled("button")`
  font-size: 1.5rem;
  background-color: #e8204f;
  color: ${(props) => props.theme.colors?.primary || "white"};

  &:hover {
    background-color: ${(props) => hexToHsl("#e8204f", 10)};
  }
`;

export const Button = () => {
  const hsl = hexToHsl("#ffffff", 0.2);
  return (
    <StyledButton>
      {PACKAGE_NAME}, {hsl}
    </StyledButton>
  );
};
