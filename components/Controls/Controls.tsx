import { FunctionComponent, useEffect, useState } from "react";

import { OrderBy, Page, MAX_ROW } from "../../modules/query";
import { Button } from "./Button";
import { InputNumber } from "./Input";
import { Select } from "./Select";

interface Props {
  action: (orderBy: OrderBy, page: Page) => void;
}

const byOptions = [
  { value: "title", label: "Title" },
  { value: "category", label: "Category" },
  { value: "timesRented", label: "Times rented" },
];

const orderOptions = [
  { value: "asc", label: "Ascendant" },
  { value: "desc", label: "Descendant" },
];

const cursor = (limit: number, page: number): number => {
  return (page - 1) * limit; // limit is zero indexed
};

const pages = (limit: number): number => {
  return Math.ceil(MAX_ROW / limit);
};

export const Controls: FunctionComponent<Props> = ({ action }) => {
  const [order, setOrder] = useState("asc");
  const [by, setBy] = useState("title");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleQuery = () => {
    action({ by, order } as OrderBy, { cursor: cursor(limit, page), limit });
  };

  useEffect(() => {
    handleQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, by, page, limit]);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Select
        value={order}
        label={"Order"}
        options={orderOptions}
        setter={setOrder}
      ></Select>

      <Select
        value={by}
        label={"By"}
        options={byOptions}
        setter={setBy}
      ></Select>

      <InputNumber
        value={page}
        label={"Page"}
        setter={setPage}
        min={1}
        max={pages(limit)}
      ></InputNumber>

      <InputNumber
        value={limit}
        label={"Results per page"}
        setter={setLimit}
        min={1}
        max={MAX_ROW}
      ></InputNumber>

      <Button action={() => handleQuery()}>Refresh</Button>
    </form>
  );
};
