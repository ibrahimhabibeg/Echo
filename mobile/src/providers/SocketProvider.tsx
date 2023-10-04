import { createContext, useContext } from "react";
import type { JSX } from "react";
import { AuthContext } from "./Auth";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  socket: io(),
});

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const { token } = useContext(AuthContext);
  const url = process.env.EXPO_PUBLIC_MESSAGE_WEBSOCKET_URL || "";

  const socket = io(url, {
    rejectUnauthorized: false,
    extraHeaders: { token },
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
