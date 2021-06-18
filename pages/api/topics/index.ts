import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import nc from "next-connect";

interface Data {}

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const topics = await db.topic.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return res.json({ topics });
});

export default handler;
