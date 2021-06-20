import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import { db } from "../../../lib/db";

interface Data {}

const mult = multer();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const stories = await db.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
    },
  });

  return res.json({ stories });
});

handler.use(mult.none()).post(async (req, res) => {
  try {
    const params = new URLSearchParams(req.body);
    const story = await db.story.create({
      data: {
        sourceTitle: params.get("title")!,
        sourceUrl: params.get("sourceUrl")!,
        sourcePaywalled: false,
        userId: params.get("userId")!,
        createdAt: new Date(),
        updatedAt: new Date(),
        topics: {
          connect: params.getAll("topicId").map((id) => ({ id: Number(id) })),
        },
      },
    });

    return res.status(200).json({ story });
  } catch (e) {
    console.error("ERROR: Creating Story", e);
    return res.status(500).json(e);
  }
});

export default handler;
