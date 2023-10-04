import type { Express, Request, Response } from "express";
import { Message } from "../models";
import { messageType } from "../types";

const getMessagesRoute = (app: Express) => {
  app.get(
    "/messages",
    async (req: Request<{}, {}, ReqBody, ReqQuery>, res: Response<ResBody>) => {
      const { userId } = req.body;
      const { otherUser, cursor = Date.now(), size = 10 } = req.query;
      if (!otherUser)
        return res.status(400).send({ message: "No user selected." });
      try {
        const messages = await Message.find(
          {
            $or: [
              {
                from: userId,
                to: otherUser,
              },
              { from: otherUser, to: userId },
            ],
            ...(cursor ? { createdAt: { $lt: cursor } } : {}),
          },
          null,
          { limit: size, sort: { createdAt: -1 } }
        );
        return res.send({ messages });
      } catch (error) {
        return res
          .status(500)
          .send({ message: "An unknown error has occured. Try again later." });
      }
    }
  );
};

type ResBody =
  | {
      messages: messageType[];
    }
  | {
      message: string;
    };

interface ReqBody {
  userId: string;
}

interface ReqQuery {
  otherUser: string;
  cursor?: NativeDate;
  size?: number;
}

export default getMessagesRoute;
