import { createServer } from "http";
import { NextApiResponse } from "next";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import request from "supertest";
import { NextConnect } from "next-connect";
import { NextIronRequest } from "../../lib/session";

export const testClient = async (
  handler: NextConnect<NextIronRequest, NextApiResponse>
) =>
  request(
    createServer(async (req, res) => {
      return apiResolver(req, res, undefined, handler, {} as any, true);
    })
  );
