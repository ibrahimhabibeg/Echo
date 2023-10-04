import type { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { ReqBody, ResBody } from ".";
import { authError } from "../types/error";

/**
 * Ensures username fits requirments.
 * Returns AuthError if error exists or calls next function.
 * @param req
 * @param res
 * @param next
 */
const usernameValidation = async (
  req: Request<{}, {}, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction
) => {  
  const username = req.body?.username;
  if (!username) return res.status(400).send(notProvided);
  const user = await User.findOne({ username });  
  const formRegex = /^[a-z|0-9]*$/;
  if (user) return res.status(400).send(usernameExists);
  if (username.length < 4) return res.status(400).send(tooShort);
  if (username.length > 15) return res.status(400).send(tooLong);
  if (!formRegex.test(username)) return res.status(400).send(wrongForm);
  return next();
};

const usernameExists: authError = {
  message: "Username taken by another user.",
  field: "username",
};

const tooShort: authError = {
  message: "Username must contain 4 letters at least.",
  field: "username",
};

const tooLong: authError = {
  message: "Username can't have more than 15 letters.",
  field: "username",
};

const wrongForm: authError = {
  message: "Username can contain only small English letters and numbers.",
  field: "username",
};

const notProvided: authError = {
  message: "Must provide a username.",
  field: "username",
};

export default usernameValidation;
