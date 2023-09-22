import express from "express";
import { connectDB } from "./db";
import signupRoute from "./signup";

const app = express();
app.use(express.json());
connectDB(app);
signupRoute(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.on("dbConnected", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
