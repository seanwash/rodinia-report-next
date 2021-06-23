import withSession, { NextIronRequest } from "../../lib/session";
import firebase from "../../lib/firebase";
import type { NextApiResponse } from "next";

export default withSession(
  async (req: NextIronRequest, res: NextApiResponse) => {
    const { email } = await req.body;
    const { password } = await req.body;

    try {
      const credentials = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const user = {
        isLoggedIn: true,
        id: credentials.user.uid,
        email: credentials.user.email,
        token: credentials.user.getIdToken,
      };

      req.session.set("user", user);
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
