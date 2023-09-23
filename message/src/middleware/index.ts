import type { Socket } from "socket.io";
import type { ExtendedError } from "socket.io/dist/namespace";
import axios from "axios";

export const verifyUser = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const token = socket.handshake.headers.token;
  if (Array.isArray(token)) return next(new Error("User not verified"));
  const { userId, isValid } = await getUserId(token);
  if (!isValid) return next(new Error("User not verified"));
  socket.data.userId = userId;
  return next();
};

const getUserId = async (token = ""): Promise<getUserIdRes> => {
  try {
    const {
      data: { userId },
    } = await axios.get<Res>("http://user:3000/verify", {
      headers: {
        Authorization: token,
      },
    });
    return { isValid: true, userId };
  } catch (error) {
    return {
      isValid: false,
      userId: "",
    };
  }
};

interface Res {
  userId: string;
}

interface getUserIdRes {
  isValid: boolean;
  userId: string;
}
