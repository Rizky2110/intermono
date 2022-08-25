import { NextLayout } from "next";
import { Button } from "ui";

const Home: NextLayout = function Home() {
  return (
    <section aria-label="dashboard">
      <h1>hai</h1>
      <Button size="small" palette="secondary">
        Hello World
      </Button>
    </section>
  );
};

export default Home;
