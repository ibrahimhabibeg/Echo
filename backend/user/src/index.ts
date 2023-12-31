import express from "express";
import { connectDB } from "./db";
import signupRoute from "./signup";
import loginRoute from "./login";
import verifyRoute from "./verification";
import searchRoute from "./search";

const app = express();
app.use(express.json());
connectDB(app);
signupRoute(app);
loginRoute(app);
verifyRoute(app);
searchRoute(app);

app.on("dbConnected", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
