export type messageType = {
  from: string;
  to: string;
  message: string;
  createdAt: NativeDate;
};

export interface ServerToClientEvents {
  recieveMessage: (data: messageType) => void | Promise<void>;
}

export interface ClientToServerEvents {
  sendMessage: ({ message, to }: { message: string; to: string }) =>
    | {
        isSent: boolean;
      }
    | Promise<{
        isSent: boolean;
      }>;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: string;
}