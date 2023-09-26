import { User } from "../models";
import type { Request, Response } from "express";
import { ReqBody, ResBody } from ".";
import { error } from "../types/error";
import bcrypt from "bcrypt";
import { createUserJWT } from "../verification";

/**
 * Creates the user instance in DB.
 * Returns token for the user.
 * @param req
 * @param res
 */
const signup = async (
  req: Request<{}, {}, ReqBody>,
  res: Response<ResBody>
) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    return res.send({ token: createUserJWT(user) });
  } catch (error) {
    return res.status(500).send(databaseError);
  }
};

const databaseError: error = {
  message: "An unknown error occured at the server. Please try again later.",
};

export default signup;
