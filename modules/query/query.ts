import { Film, film } from "./film";
import { MAX_ROW } from "./constants";
import { statement } from "./statement";

export type OrderBy = {
  by: "title" | "category" | "timesRented";
  order: "asc" | "desc";
};

export const whereClauseOf = (byField: OrderBy["by"]) => {
  switch (byField) {
    case "title":
      return "film.title";
    case "category":
      return "category.name";
    case "timesRented":
      return "film_rental.times_rented";
  }
};

export type Page = {
  cursor: number;
  limit: number;
};

interface Connection {
  query(sql: string, values?: any[]): Promise<any>;
  end(): Promise<void>;
}

export const executeQuery = async (
  db: Connection,
  { page, orderBy }: { page: Page; orderBy: OrderBy }
): Promise<Film[] | Error> => {
  const stmt = statement(orderBy.order);

  if (orderBy.order === "desc") {
    page.cursor = MAX_ROW - page.cursor;
  }

  try {
    const res: Film[] = await db.query(stmt, [
      page.cursor,
      whereClauseOf(orderBy.by),
      page.limit,
    ]);
    await db.end();
    return res.map((data) => film(data));
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else if (typeof error === "string") {
      return new Error(error);
    }
    return new Error("Unable to query database");
  }
};