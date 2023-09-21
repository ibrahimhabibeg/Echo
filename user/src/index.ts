import express from "express";
import { connectDB } from "./db";

const app = express();
connectDB(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.on("dbConnected", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
