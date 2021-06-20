import withSession from "../../lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

type NextIronRequest = NextApiRequest & { session: Session };

export default withSession(
  async (req: NextIronRequest, res: NextApiResponse) => {
    const user = req.session.get("user");
    if (user) {
      res.json({
        isLoggedIn: true,
        ...user,
      });
    } else {
      res.json({
        isLoggedIn: false,
      });
    }
  }
);
