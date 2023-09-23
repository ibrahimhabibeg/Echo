import express from "express";
import { connectDB } from "./db";
import { Server } from "socket.io";
import { verifyUser } from "./middleware";
import addConnection from "./socket";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types";

const app = express();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(4000);

app.use(express.json());
connectDB(app);

io.use(verifyUser);
addConnection(io);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.on("dbConnected", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
