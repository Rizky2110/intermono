import { NextLayout } from "next";
import styled from "styled-components";
import { ButtonLink, Button, Box, BoxLink } from "ui/sc";
import { useTheme } from "src/app/contexts/ThemeContext";

const StyledDashboard = styled("section")`
  background-color: ${(props) => props.theme.colors.success};
`;

const Home: NextLayout = function Home() {
  const { setTheme } = useTheme();
  return (
    <StyledDashboard aria-label="dashboard">
      <BoxLink
        width="min(100% - 2rem, 800px)"
        marginLeft="auto"
        marginRight="auto"
        backgroundColor="accent"
        color="purple"
        display="flex"
      >
        <Box flex={1}>
          <h1>hai</h1>
        </Box>
        <ButtonLink
          size="small"
          palette="secondary"
          onClick={() => setTheme("defaultTheme")}
        >
          Set Default Theme
        </ButtonLink>
      </BoxLink>

      <Button
        size="small"
        palette="primary"
        onClick={() => setTheme("defaultTheme")}
      >
        Set Default Theme
      </Button>
    </StyledDashboard>
  );
};

export default Home;
