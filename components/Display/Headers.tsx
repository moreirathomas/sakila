import { FunctionComponent } from "react";

interface Props {
  headers: string[];
}

export const Headers: FunctionComponent<Props> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, i) => (
          <th key={i} scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
