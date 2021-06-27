import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { db } from "../../../../lib/db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const reactionOptions = await db.reactionOption.findMany({});
  return res.json({ reactionOptions });
});

export default handler;
