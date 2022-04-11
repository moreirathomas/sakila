import type { NextPage } from "next";
import { useContext } from "react";

import { Table } from "../components";
import { FilmsContext } from "../contexts/FilmsContext";

const Home: NextPage = () => {
  const { state } = useContext(FilmsContext);
  return (
    <main>
      <Table films={state} />
    </main>
  );
};

export default Home;
