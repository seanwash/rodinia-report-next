import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const stories = await db.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
    },
  });

  res.status(200).json({ stories });
}
