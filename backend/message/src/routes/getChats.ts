import type { Express, Request, Response } from "express";
import { Message } from "../models";
import { messageType } from "../types";

const getChatsRoute = (app: Express) => {
  app.get(
    "/chats",
    async (req: Request<{}, {}, ReqBody, ReqQuery>, res: Response<ResBody>) => {
      const { userId } = req.body;
      const { size = 10 } = req.query;
      const cursor = req.query.cursor
        ? new Date(req.query.cursor)
        : new Date();      
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

type chatI = {_id: string;} & messageType

interface ReqQuery {
  cursor?: NativeDate;
  size?: number;
}

interface ReqBody {
  userId: string;
}

const dbError = { message: "An unknown error has occured. Try again later." };

export default getChatsRoute;
