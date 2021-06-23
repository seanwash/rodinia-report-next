import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { db } from "../../../lib/db";

interface Data {}

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

handler.post(async (req, res) => {
  try {
    // TODO: Would be nice to validate the incoming data.
    const { story: storyData } = JSON.parse(req.body);

    const story = await db.story.create({
      data: {
        sourceTitle: storyData.sourceTitle,
        sourceUrl: storyData.sourceUrl,
        sourcePaywalled: false,
        userId: storyData.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        topics: {
          connect: storyData.topicIds.map((id: string) => ({ id: Number(id) })),
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
