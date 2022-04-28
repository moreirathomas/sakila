import { NextApiRequest } from "next";
import { Page, OrderBy, MAX_ROW } from "../../../modules/query";

type QueryParams = {
  page: Page;
  orderBy: OrderBy;
};

export const parseQueryParams = (req: NextApiRequest): QueryParams => {
  const { offset, limit, order, by } = req.query;

  return {
    page: parsePage(limit, offset),
    orderBy: parseOrderBy(order, by),
  };
};

const DEFAULT_PAGE_OFFSET = 0;
const DEFAULT_PAGE_LIMIT = 10;

/**
 * Alias to NextApiRequest.query.
 */
type QueryKey = string | string[];

const minMaxParser =
  (min: number, max: number) =>
  (val: QueryKey, fallback: number): number => {
    const i = parseInt(val as string, 10);
    if (isNaN(i) || i < min || i > max) {
      return fallback;
    }
    return i;
  };

const parseLimit = minMaxParser(1, MAX_ROW);
const parseOffset = minMaxParser(1, MAX_ROW);

const parsePage = (limit: QueryKey, offset: QueryKey): Page => ({
  limit: parseLimit(limit, DEFAULT_PAGE_LIMIT),
  offset: parseOffset(offset, DEFAULT_PAGE_OFFSET),
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
