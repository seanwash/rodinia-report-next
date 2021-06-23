import withSession, { NextIronRequest } from "../../lib/session";
import firebase from "../../lib/firebase";
import type { NextApiResponse } from "next";

export default withSession(
  async (req: NextIronRequest, res: NextApiResponse) => {
    await firebase.auth().signOut();
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
);
