import express from "express";
import { connectDB } from "./db";
import { Server } from "socket.io";

const app = express();
const io = new Server(4000);
app.use(express.json());
connectDB(app);

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.on("dbConnected", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
