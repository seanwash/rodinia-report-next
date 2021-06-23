import type { NextApiResponse } from "next";
import nc from "next-connect";
import scraper from "open-graph-scraper";
import { NextIronRequest, requireUser, session } from "../../../../lib/session";

interface Data {}

const handler = nc<NextIronRequest, NextApiResponse>();

handler
  .use(session)
  .use(requireUser)
  .get(async (req, res) => {
    const { url } = req.query;

    try {
      const { result } = await scraper({ url: url as string });
      return res.json({ metadata: result });
    } catch (e) {
      return res.status(500).json(e);
    }
  });

export default handler;
