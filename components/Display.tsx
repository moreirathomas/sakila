import { FunctionComponent } from "react";

import { Film } from "../modules/query/film";
import { Row } from "./DisplayRow";
import { Headers } from "./DisplayHeaders";

interface Props {
  films: Film[];
}

const headers = ["Title", "Category", "Rating", "Rental rate", "Times rented"];

export const Display: FunctionComponent<Props> = ({ films }) => {
  return (
    <table>
      <Headers headers={headers} />

      <tbody>
        {films.map((film) => (
          <Row key={film.id} film={film} />
        ))}
      </tbody>
    </table>
  );
};
