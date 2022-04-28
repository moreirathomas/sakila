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
      <h1>Sekila</h1>
      <h2>Movie rental explorer</h2>
      <Controls action={queryFilms} />
      <Display films={state} />
    </main>
  );
};

export default Home;
