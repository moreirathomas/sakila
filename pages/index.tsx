import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Table } from "../components";

const Home: NextPage = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    fetch("api/films")
      .then((res) => res.json())
      .then((data) => setFilms(data.films));
  }, []);

  return (
    <div>
      <main>{films.length > 0 && <Table films={films} />}</main>
    </div>
  );
};

export default Home;
