import { Layout } from "components";
import type { NextLayout } from "next";
import React from "react";

const Logs: NextLayout = function Logs() {
  return (
    <section>
      <h3>Iam history page</h3>
    </section>
  );
};

export default Logs;

Logs.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout title="History">{page}</Layout>;
};
