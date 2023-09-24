export type loginRes = loginSuccessRes & authError;

interface loginSuccessRes {
  token: string;
}

interface authError {
  message: string;
  field: "email" | "username" | "password";
}

export interface loginReq {
  email: string;
  password: string;
}
