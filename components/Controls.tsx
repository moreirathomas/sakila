import { FunctionComponent, useContext, useState } from "react";

import { OrderBy, Page } from "../modules/query";
import { Button } from "./Button";
import { QueryParamNumber, QueryParamString } from "./QueryParam";

interface Props {
  action: (orderBy: OrderBy, page: Page) => void;
}

export const Controls: FunctionComponent<Props> = ({ action }) => {
  const [order, setOrder] = useState("asc");
  const [by, setBy] = useState("title");

  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleQuery = () => {
    action({ order, by } as OrderBy, { cursor, limit });
  };

  return (
    <div>
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

      <Button action={() => handleQuery()}>Query films</Button>
    </div>
  );
};
