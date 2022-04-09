import { FunctionComponent } from "react";

import { Film } from "../modules/query/film";
import { Row } from "./Row";

interface Props {
  films: Film[];
}

const headers = ["Title", "Category", "Rating", "Rental rate", "Times rented"];

export const Table: FunctionComponent<Props> = ({ films }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {films.map((film) => (
          <Row key={film.id} film={film} />
        ))}
      </tbody>
    </table>
  );
};
