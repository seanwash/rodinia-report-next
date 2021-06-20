import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import scraper from "open-graph-scraper";

interface Data {}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { url } = req.query;
  try {
    const { result } = await scraper({ url: url as string });
    return res.json({ metadata: result });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default handler;
