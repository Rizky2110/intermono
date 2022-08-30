import { NextLayout } from "next";
import styled from "styled-components";
import { ButtonLink, Button, Box, BoxLink } from "ui/sc";
import { useTheme } from "src/app/contexts/ThemeContext";
import React from "react";
import { Layout } from "components";

const StyledDashboard = styled("section")``;

const Home: NextLayout = function Home() {
  const { setTheme } = useTheme();
  return (
    <StyledDashboard aria-label="dashboard">
      <BoxLink>
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

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Dashboard">{page}</Layout>;
};
