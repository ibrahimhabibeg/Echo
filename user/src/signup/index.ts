import type { Express } from "express";
import usernameValidation from "./usernameValidation";
import emailValidation from "./emailValidation";
import passwordValidation from "./passwordValidation";
import signup from "./controller";
import { error } from "../types/error";

/**
 * Adds signup route to the express server.
 * @param app
 */
const signupRoute = (app: Express) =>
  app.post(
    "/signup",
    [usernameValidation, emailValidation, passwordValidation],
    signup
  );

/**
 * The type of the body for the request to signup route.
 */
export interface ReqBody {
  username: string;
  email: string;
  password: string;
}

/**
 * The type of the response of the signup route.
 */
export type ResBody = successRes | error;

interface successRes {
  token: string;
}

export default signupRoute;
