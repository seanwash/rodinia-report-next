import withSession from "../../lib/session";
import firebase from "../../lib/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

type NextIronRequest = NextApiRequest & { session: Session };

export default withSession(
  async (req: NextIronRequest, res: NextApiResponse) => {
    await firebase.auth().signOut();
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
);
