import type { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types";
import { Message } from "../models";

const addConnection = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  io.on("connection", (socket) => {
    const { userId } = socket.data;    
    socket.join(socket.data.userId);
    socket.on("sendMessage", async ({ message, to }) => {
      if (!message || !to) return { isSent: false };
      try {
        const newMessage = new Message({ from: userId, to, message });
        await newMessage.save();
        socket.to(to).emit("recieveMessage", newMessage);
        socket.emit("recieveMessage", newMessage);
        return { isSent: true };
      } catch (error) {
        return { isSent: false };
      }
    });
  });
};

export default addConnection;
