import type { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { ReqBody, ResBody } from ".";
import { authError } from "../types/error";

/**
 * Ensures email fits requirments.
 * Returns AuthError if error exists or calls next function.
 * @param req
 * @param res
 * @param next
 */
const emailValidation = async (
  req: Request<{}, {}, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction
) => {
  const email = req.body?.email;
  if (!email) return res.status(400).send(notProvided);
  const user = await User.findOne({ email });
  const formRegex = /^\S+@\S+\.\S+$/;
  if (user) return res.status(400).send(emailExists);
  if (!formRegex.test(email)) return res.status(400).send(wrongForm);
  return next();
};

const emailExists: authError = {
  message: "Email is already registered.",
  field: "email",
};

const wrongForm: authError = {
  message: "Not a valid email.",
  field: "email",
};

const notProvided: authError = {
  message: "Must provide an email.",
  field: "email",
};

export default emailValidation;
