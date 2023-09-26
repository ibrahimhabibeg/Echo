import type { Express, Request, Response } from "express";
import { Message } from "../models";

const getChatsRoute = (app: Express) => {
  app.get(
    "/chats",
    async (req: Request<ReqBody, {}, {}>, res: Response<ResBody>) => {
      const { userId, size = 10 } = req.params;
      const cursor = req.params.cursor ? new Date(req.params.cursor) : new Date();
      try {
        const chats: chatI[] = await Message.aggregate([
          { $match: { $or: [{ to: userId }, { from: userId }] } },
          {
            $project: {
              user: { $cond: [{ $eq: ["$from", userId] }, "$to", "$from"] },
              to: true,
              from: true,
              message: true,
              createdAt: true,
            },
          },
          { $sort: { createdAt: -1 } },
          {
            $group: {
              _id: "$user",
              from: { $first: "$from" },
              to: { $first: "$to" },
              message: { $first: "$message" },
              createdAt: { $first: "$createdAt" },
            },
          },
          { $sort: { createdAt: -1 } },
          { $match: { createdAt: { $lt: cursor } } },
          { $limit: size },
        ]);
        return res.send({ chats });
      } catch (error) {
        return res.status(500).send(dbError);
      }
    }
  );
};

type ResBody =
  | {
      chats: chatI[];
    }
  | {
      message: string;
    };

interface chatI {
  _id: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
}

interface ReqBody {
  userId: string;
  cursor?: NativeDate;
  size?: number;
}

const dbError = { message: "An unknown error has occured. Try again later." };

export default getChatsRoute;
