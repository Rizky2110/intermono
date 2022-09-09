import { Layout } from "components";
import type { NextLayout } from "next";
import React from "react";

const Sensor: NextLayout = function Sensor() {
  return (
    <section>
      <h3>Iam sensor page</h3>
    </section>
  );
};

export default Sensor;

Sensor.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="Sensor">{page}</Layout>;
};
