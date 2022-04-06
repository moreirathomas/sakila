import { NextApiRequest } from "next";
import { Page, OrderBy } from "../../../modules/query";

type QueryParams = {
  page: Page;
  orderBy: OrderBy;
};

export const parseQueryParams = (req: NextApiRequest): QueryParams => {
  const { cursor, limit, order, by } = req.query;

  return {
    page: parsePage(cursor, limit),
    orderBy: parseOrderBy(order, by),
  };
};

const DEFAULT_PAGE_CURSOR = 0;
const DEFAULT_PAGE_LIMIT = 10;

/**
 * Alias to NextApiRequest.query.
 */
type QueryKey = string | string[];

const toPositiveInt = (val: QueryKey, defaultVal: number): number => {
  const i = parseInt(val as string, 10);
  return !isNaN(i) && i > 0 ? i : defaultVal;
};

const parsePage = (cursor: QueryKey, limit: QueryKey): Page => ({
  cursor: toPositiveInt(cursor, DEFAULT_PAGE_CURSOR),
  limit: toPositiveInt(limit, DEFAULT_PAGE_LIMIT),
});

const isString = (val: unknown): val is string => typeof val === "string";

const snakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const isOrder = (val: string): val is OrderBy["order"] =>
  val === "asc" || val === "desc";

const isBy = (val: string): val is OrderBy["by"] =>
  val === "title" || val === "category" || snakeCase(val) === "times_rented";

const parseOrderBy = (order: QueryKey, by: QueryKey): OrderBy => ({
  order: isString(order) && isOrder(order) ? order : "asc",
  by: isString(by) && isBy(by) ? by : "title",
});
