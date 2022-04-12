import { FunctionComponent } from "react";

import { Film } from "../modules/query/film";

interface Props {
  film: Film;
}

export const Row: FunctionComponent<Props> = ({ film }) => {
  return (
    <tr>
      <td>{film.title}</td>
      <td>{film.category}</td>
      <td>{film.rating}</td>
      <td>{film.rentalRate}</td>
      <td>{film.timesRented}</td>
    </tr>
  );
};
