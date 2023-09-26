import type { Express, Request, Response } from "express";
import { User } from "../models";
import { error } from "../types/error";

/**
 * Adds search route to the express server.
 * @param app
 */
const searchRoute = (app: Express) =>
  app.get(
    "/search",
    async (req: Request<reqBody, {}, {}>, res: Response<resBody>) => {
      const { username, size = 5, cursor = "" } = req.params;
      if (username === "") return res.send({ users: [] });
      if (!username)
        return res.status(400).send({ message: "No username provided" });
      const users = await User.find(
        { username: { $regex: username, $gt: cursor } },
        { username: true },
        { sort: { username: 1 }, limit: size }
      );
      return res.send({ users });
    }
  );

export default searchRoute;

interface reqBody {
  username: string;
  size: number;
  cursor: string;
}

type resBody = { users: user[] } | error;

interface user {
  username: string;
}
