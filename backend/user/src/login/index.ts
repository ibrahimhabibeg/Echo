import type { Express, Request, Response } from "express";
import { authError, error } from "../types/error";
import { User } from "../models";
import bcrypt from "bcrypt";
import { createUserJWT } from "../verification";

/**
 * Adds login route to the express server.
 * @param app
 */
const loginRoute = (app: Express) => app.post("/login", login);

/**
 * Returns token if email and password are correct.
 * @param req
 * @param res
 * @returns
 */
const login = async (req: Request<{}, {}, ReqBody>, res: Response<ResBody>) => {  
  const { email = "", password = "" } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send(notRegistered);
  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!isCorrectPassword) return res.status(400).send(wrongPassword);  
  return res.send({ token: createUserJWT(user), userId: user.username });
};

/**
 * The type of the body for the request to login route.
 */
interface ReqBody {
  email: string;
  password: string;
}

/**
 * The type of the response of the login route.
 */
type ResBody = successRes | error;

interface successRes {
  token: string;
  userId: string;
}

const notRegistered: authError = {
  message: "Email not registered",
  field: "email",
};

const wrongPassword: authError = {
  message: "Password is incorrect",
  field: "password",
};

export default loginRoute;
