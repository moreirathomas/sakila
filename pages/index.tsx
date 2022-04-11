import type { NextPage } from "next";
import { useContext, useState } from "react";

import { Table } from "../components";
import { Button } from "../components/Button";
import { QueryParamNumber, QueryParamString } from "../components/QueryParam";
import { FilmsContext } from "../contexts/FilmsContext";

const Home: NextPage = () => {
  const { state, dispatch } = useContext(FilmsContext);

  const [order, setOrder] = useState("asc");
  const [by, setBy] = useState("title");

  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(10);

  const queryFilms = () => {
    dispatch({
      type: "query",
      orderBy: {
        order: order as "asc" | "desc",
        by: by as "title" | "category" | "timesRented",
      },
      page: {
        cursor,
        limit,
      },
    });
  };

  return (
    <main>
      <QueryParamString
        value={order}
        label={"order"}
        setter={setOrder}
      ></QueryParamString>

      <QueryParamString
        value={by}
        label={"by"}
        setter={setBy}
      ></QueryParamString>

      <QueryParamNumber
        value={cursor}
        label={"cursor"}
        setter={setCursor}
      ></QueryParamNumber>

      <QueryParamNumber
        value={limit}
        label={"limit"}
        setter={setLimit}
      ></QueryParamNumber>

      <Button action={() => queryFilms()}>Query films</Button>

      <Table films={state} />
    </main>
  );
};

export default Home;
