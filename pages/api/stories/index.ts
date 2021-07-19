import type { NextApiResponse } from "next";
import nc from "next-connect";
import { db, Prisma } from "../../../lib/db";
import { NextIronRequest, requireUser, session } from "../../../lib/session";

const handler = nc<NextIronRequest, NextApiResponse>();

handler.use(session).get(async (req, res) => {
  const { topic }: { topic?: string } = req.query;

  let createStoryArgs: Prisma.StoryFindManyArgs = {
    orderBy: {
      createdAt: "desc",
    },
    include: {
      topics: true,
      reactions: {
        include: {
          reactionOption: true,
        },
      },
    },
  };

  if (topic) {
    createStoryArgs = {
      ...createStoryArgs,
      where: {
        topics: {
          some: {
            slug: topic,
          },
        },
      },
    };
  }

  const stories = await db.story.findMany(createStoryArgs);

  return res.json({ stories });
});

handler
  .use(session)
  .use(requireUser)
  .post(async (req, res) => {
    const user = req.session.get("user");

    try {
      // TODO: Would be nice to validate the incoming data.
      const { story: storyData } = req.body;

      const story = await db.story.create({
        data: {
          sourceTitle: storyData.sourceTitle,
          sourceUrl: storyData.sourceUrl,
          sourcePaywalled: false,
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          topics: {
            connect: storyData.topicIds.map((id: string) => ({
              id: Number(id),
            })),
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
