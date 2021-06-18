import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const topics = await db.topic.findMany({
    orderBy: {
      name: "asc",
    },
  });

  res.status(200).json({ topics });
}
