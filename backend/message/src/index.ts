import express from "express";
import { connectDB } from "./db";
import { Server } from "socket.io";
import { verifyUserExpress, verifyUserIo } from "./middleware";
import addConnection from "./socket";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";
import { getMessagesRoute, getChatsRoute } from "./routes";

const app = express();
const io = new Server<
  ClientToServerEvents, 
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(4000, { cors: { origin: "*" } });

app.use(express.json());
app.use(verifyUserExpress);
connectDB(app);
getMessagesRoute(app);
getChatsRoute(app);

io.use(verifyUserIo);
addConnection(io);

app.on("dbConnected", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
