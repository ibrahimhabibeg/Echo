import type { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types";

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
    socket.on("sendMessage", ({ message, to }) => {
      if (!message || !to) return { isSent: false };
      socket.to(to).emit("recieveMessage", { message, from: userId });
      return { isSent: true };
    });
  });
};

export default addConnection;
