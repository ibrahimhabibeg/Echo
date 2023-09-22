import jwt from "jsonwebtoken";

/**
 * Creates JWT from given data.
 * @param data
 * @returns JWT
 */
export const createJWT = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return "Bearer " + token;
};
