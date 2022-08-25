import { NextLayout } from "next";
import styled from "styled-components";
import { Button } from "ui";
import { useTheme } from "src/app/contexts/ThemeContext";

const StyledDashboard = styled("section")``;

const Home: NextLayout = function Home() {
  const { setTheme } = useTheme();
  return (
    <StyledDashboard aria-label="dashboard">
      <h1>hai</h1>
      <Button
        size="small"
        palette="secondary"
        onClick={() => setTheme("defaultTheme")}
      >
        Set Default Theme
      </Button>
      <Button
        onClick={() => setTheme("darkTheme")}
        size="small"
        palette="success"
      >
        Set Dark Theme
      </Button>
    </StyledDashboard>
  );
};

export default Home;
