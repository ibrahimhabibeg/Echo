import mongoose from "mongoose";
import type { Express } from "express";

export const connectDB = (app: Express) => {
  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017/chat`)
      .then(() => app.emit("dbConnected"))
      .catch((err) => setTimeout(connectWithRetry, 2000));
  };
  connectWithRetry();
};
