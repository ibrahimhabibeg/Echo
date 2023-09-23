export interface ServerToClientEvents {
  recieveMessage: ({
    message,
    from,
  }: {
    message: string;
    from: string;
  }) => void | Promise<void>;
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
