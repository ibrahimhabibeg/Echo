export interface messageType {
  from: string;
  to: string;
  message: string;
  createdAt: string;
  _id: string;
}

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

export interface chatType {
  _id: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
}