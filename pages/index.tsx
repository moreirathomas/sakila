import type { NextPage } from "next";
import { useContext } from "react";

import { FilmsContext } from "../contexts/FilmsContext";
import { OrderBy, Page } from "../modules/query";
import { Controls, Display } from "../components";

const Home: NextPage = () => {
  const { state, dispatch } = useContext(FilmsContext);

  const queryFilms = (orderBy: OrderBy, page: Page) => {
    dispatch({ type: "query", orderBy, page });
  };

  return (
    <main>
      <Controls action={queryFilms} />
      <Display films={state} />
    </main>
  );
};

export default Home;
