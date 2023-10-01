export type authRes = authSuccessRes & authError;

interface authSuccessRes {
  token: string;
  userId: string;
}

interface authError {
  message: string;
  field: "email" | "username" | "password";
}

export interface loginReq {
  email: string;
  password: string;
}

export interface signupReq {
  username: string;
  email: string;
  password: string;
}
