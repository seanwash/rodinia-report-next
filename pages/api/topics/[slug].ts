import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const { slug } = req.query;

  const topic = await db.topic.findFirst({
    where: {
      slug: slug as string,
    },
  });

  return res.json({ topic });
});

export default handler;
