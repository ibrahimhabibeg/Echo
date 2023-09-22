import type { Express, Request, Response } from "express";
import { error } from "../types/error";
import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

/**
 * Creates JWT from given data.
 * @param data
 * @returns JWT
 */
export const createJWT = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return "Bearer " + token;
};

/**
 * Adds verify route to the express app.
 * Verifies user and returns user id if valid.
 * @param app
 * @returns
 */
const verifyRoute = (app: Express) => app.get("/verify", verify);

const verify = (req: Request<{}, {}, {}>, res: Response<ResBody>) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send(invalidToken);
  const token = authHeader.slice(7);
  try {
    const { userId } = jwt_decode<tokenDecoded>(token);
    if (!userId) return res.status(401).send(invalidToken);
    return res.send({ userId });
  } catch (error) {
    return res.status(401).send(invalidToken);
  }
};

type ResBody = error | { userId: string };

const invalidToken: error = {
  message: "Invalid Token",
};

interface tokenDecoded {
  userId: string;
}

export default verifyRoute;
