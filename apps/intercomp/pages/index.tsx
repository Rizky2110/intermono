import type { GetServerSideProps, NextLayout } from "next";
import styled from "styled-components";
import React from "react";
import { Box } from "ui/sc";
import { Layout, CardBanner, CardStatus } from "components";
import wrapper from "src/app/store";
import Cookies from "cookies";
import { getComponentStatus } from "src/app/action";
import { useAppSelector } from "src/app/hook";

const StyledDashboard = styled("section")`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(4, auto);
  row-gap: 2rem;

  .dashboard-banner {
    .text.text-dashboard-bannerTitle {
      line-height: 1.5;
      font-size: 2rem;
      margin-block-end: 1rem;
    }
  }

  .dashboard-device {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;

const Home: NextLayout = function Home() {
  const {
    componentStatus: {
      result: { breaker },
    },
  } = useAppSelector((state) => state.dashboard);

  return (
    <StyledDashboard aria-label="dashboard">
      <Box className="dashboard-banner">
        <h1 className="text text-dashboard-bannerTitle">Breaker</h1>
        <CardBanner
          palette="info"
          totalDevice={
            breaker.inactive +
            breaker.offline +
            breaker.online +
            breaker.trouble
          }
          title="All Breaker"
          description="The total number of all breakers that have been recorded and available in the intercom system"
          buttonTitle="Go to iBreaker"
          href="/ibreaker"
        />
      </Box>

      <Box className="dashboard-device">
        <CardStatus
          palette="primary"
          totalDevice={breaker.inactive}
          title="Ready to Use"
          description="Breaker"
          buttonTitle="View"
          href="/ibreaker"
        />

        <CardStatus
          palette="success"
          totalDevice={breaker.online}
          title="Online"
          description="Breaker"
          buttonTitle="View"
          href="/ibreaker?status=online"
        />

        <CardStatus
          palette="warning"
          totalDevice={breaker.offline}
          title="Offline"
          description="Breaker"
          buttonTitle="View"
          href="/ibreaker?status=offline"
        />

        <CardStatus
          palette="error"
          totalDevice={breaker.trouble}
          title="Problem"
          description="Breaker"
          buttonTitle="View"
          href="/ibreaker?status=offline"
        />
      </Box>

      <Box className="dashboard-banner">
        <h1 className="text text-dashboard-bannerTitle">Beacon</h1>
        <CardBanner
          palette="primary"
          totalDevice={800}
          title="All Beacon"
          description="The total number of all beacons that have been recorded and available in the intercom system"
          buttonTitle="Go to Sensor"
          href="/sensor"
        />
      </Box>

      <Box className="dashboard-device">
        <CardStatus
          palette="primary"
          totalDevice={1234}
          title="Ready to Use"
          description="Beacon"
          buttonTitle="View"
          href="/sensor"
        />

        <CardStatus
          palette="success"
          totalDevice={666}
          title="Online"
          description="Beacon"
          buttonTitle="View"
          href="/sensor?status=online"
        />

        <CardStatus
          palette="warning"
          totalDevice={666}
          title="Offline"
          description="Beacon"
          buttonTitle="View"
          href="/sensor?status=offline"
        />

        <CardStatus
          palette="error"
          totalDevice={666}
          title="Problem"
          description="Beacon"
          buttonTitle="View"
          href="/sensor?status=offline"
        />
      </Box>
    </StyledDashboard>
  );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Dashboard">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { req, res } = ctx;

    const cookies = new Cookies(req, res);

    const accessToken = cookies.get("access") || "";

    await store.dispatch(
      getComponentStatus({ cookie: `access=${accessToken};`, datas: {} })
    );

    return {
      props: {},
    };
  });
