import { NextIronRequest, requireUser, session } from "../../../lib/session";
import { db } from "../../../lib/db";
import nc from "next-connect";
import { NextApiResponse } from "next";

const handler = nc<NextIronRequest, NextApiResponse>();

handler
  .use(session)
  .use(requireUser)
  .delete(async (req, res) => {
    try {
      const user = req.session.get("user");
      const { reactionId } = req.query;

      const reaction = await db.storyReaction.findFirst({
        where: {
          id: Number(reactionId),
        },
      });

      if (user.id !== reaction?.userId) {
        return res.status(401);
      }

      await db.storyReaction.delete({
        where: {
          id: Number(reactionId),
        },
      });

      return res.status(204).end();
    } catch (e) {
      console.error("ERROR: Deleting Reaction", e);
      return res.status(500).json(e);
    }
  });

export default handler;
