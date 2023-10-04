export interface error {
  message: string;
}
export interface authError extends error {
  message: string;
  field: "username" | "email" | "password";
}
