import withSession, { NextIronRequest } from "../../lib/session";
import type { NextApiResponse } from "next";

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
