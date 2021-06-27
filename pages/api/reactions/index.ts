import { NextIronRequest, requireUser, session } from "../../../lib/session";
import { db } from "../../../lib/db";
import nc from "next-connect";
import { NextApiResponse } from "next";

interface CreateReactionRequest extends NextIronRequest {
  body: {
    reaction: {
      storyId: number;
      reactionOptionId: number;
    };
  };
}

const handler = nc<NextIronRequest, NextApiResponse>();

handler
  .use(session)
  .use(requireUser)
  .post<CreateReactionRequest>(async (req, res) => {
    const user = req.session.get("user");

    try {
      // TODO: Would be nice to validate the incoming data.
      const { reaction: reactionData } = req.body;

      const reaction = await db.storyReaction.create({
        data: {
          userId: user.id,
          createdAt: new Date(),
          story: {
            connect: {
              id: reactionData.storyId,
            },
          },
          reactionOption: {
            connect: {
              id: reactionData.reactionOptionId,
            },
          },
        },
      });

      return res.status(201).json({ reaction });
    } catch (e) {
      console.error("ERROR: Creating Reaction", e);
      return res.status(500).json(e);
    }
  });

export default handler;
