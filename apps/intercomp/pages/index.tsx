import { NextLayout } from "next";
import styled from "styled-components";
import React from "react";
import { Layout, CardBanner } from "components";

const StyledDashboard = styled("section")``;

const Home: NextLayout = function Home() {
  return (
    <StyledDashboard aria-label="dashboard">
      <CardBanner
        palette="info"
        totalDevice={9999999999999999}
        title="All Breaker"
        description="The total number of all breakers that have been recorded and available in the intercom system"
        buttonTitle="Go to iBreaker"
        href="/ibreaker"
      />
      <CardBanner
        palette="primary"
        totalDevice={800}
        title="All Beacon"
        description="The total number of all beacons that have been recorded and available in the intercom system"
        buttonTitle="Go to Sensor"
        href="/sensor"
      />
    </StyledDashboard>
  );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Dashboard">{page}</Layout>;
};
