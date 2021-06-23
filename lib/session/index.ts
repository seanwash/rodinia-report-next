// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { ironSession, Session, withIronSession } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const sessionConfig = {
  password: process.env.SESSION_SECRET!,
  cookieName: "TheRodiniaReport",
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === "production",
  },
};

export type NextIronRequest = NextApiRequest & { session: Session };

export const session = ironSession(sessionConfig);

export default function withSession(handler) {
  return withIronSession(handler, sessionConfig);
}

export function requireUser(
  req: NextIronRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  const user = req.session.get("user");
  if (!user) return res.status(401).end();

  next();
}
