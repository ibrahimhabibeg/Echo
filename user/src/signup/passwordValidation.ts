import type { NextFunction, Request, Response } from "express";
import { ReqBody, ResBody } from ".";
import { authError } from "../types/error";

/**
 * Ensures password fits requirments.
 * Returns AuthError if error exists or calls next function.
 * @param req
 * @param res
 * @param next
 */
const passwordValidation = (
  req: Request<{}, {}, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction
) => {
  const password = req.body?.password;
  if (!password) return res.status(400).send(notProvided);
  if (password.length < 6) return res.status(400).send(tooShort);
  return next();
};

const tooShort: authError = {
  message: "Password must contain 6 letters at least.",
  field: "password",
};

const notProvided: authError = {
  message: "Must provide a password.",
  field: "password",
};

export default passwordValidation;
