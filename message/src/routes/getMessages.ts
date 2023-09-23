import type { Express, Request, Response } from "express";
import { Message } from "../models";

const getMessagesRoute = (app: Express) => {
  app.get(
    "/messages",
    async (req: Request<{}, {}, ReqBody>, res: Response<ResBody>) => {
      const { userId, otherUser, cursor = Date.now(), size = 10 } = req.body;
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
      messages: messageI[];
    }
  | {
      message: string;
    };

interface messageI {
  from: string;
  to: string;
  message: string;
  createdAt: NativeDate;
}

interface ReqBody {
  userId: string;
  otherUser: string;
  cursor?: NativeDate;
  size?: number;
}

export default getMessagesRoute;
