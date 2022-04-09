import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../modules/mysql";
import { executeQuery, MAX_ROW } from "../../../modules/query";
import { parseQueryParams } from "./params";

type Data = {
  films: any; // Type is irrelevant here.
  size: number;
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  const params = parseQueryParams(req);

  const conn = connect();

  const data = await executeQuery(conn, params);

  if (data instanceof Error) {
    res.status(500).json({ error: data.message });
    return;
  }

  res.status(200).json({ films: data, size: data.length, total: MAX_ROW });
}
