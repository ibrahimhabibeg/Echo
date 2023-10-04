import { useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { messageType, chatType } from "../types";
import { SocketContext } from "../providers/SocketProvider";
import { AuthContext } from "../providers/Auth";

const SocketHandler = ({ children }: { children: JSX.Element }) => {
  const queryClient = useQueryClient();
  const { socket } = useContext(SocketContext);
  const { userId } = useContext(AuthContext);

  const updateChatList = (message: messageType) =>
    queryClient.setQueryData<InfiniteData<chatType[]>>(
      ["chats", "list"],
      (oldData) => {
        const otherUser = userId === message.from ? message.to : message.from;
        if (oldData) {
          const isUserCached = oldData.pages
            .flatMap((_) => _)
            .reduce((val, chat) => val || chat._id === otherUser, false);
          if (isUserCached)
            return {
              ...oldData,
              pages: oldData.pages.map((page) =>
                page.map((chat) => {
                  if (chat._id === otherUser)
                    return { ...message, _id: chat._id };
                  else return chat;
                })
              ),
            };
          else
            return {
              ...oldData,
              pages: [[{ ...message, _id: otherUser }], ...oldData.pages],
            };
        } else return oldData;
      }
    );

  const updateChat = (message: messageType) =>
    queryClient.setQueryData<InfiniteData<messageType[]>>(
      ["chat", userId === message.from ? message.to : message.from],
      (oldData) => {
        if (oldData)
          return {
            ...oldData,
            pages: [[message], ...oldData.pages],
          };
        else return oldData;
      }
    );

  const onRecieveMessage = (message: messageType) => {
    console.log(message);

    updateChatList(message);
    updateChat(message);
  };

  useEffect(() => {
    socket.on("recieveMessage", onRecieveMessage);
    return () => {
      socket.off("recieveMessage", onRecieveMessage);
    };
  }, [socket]);

  return children;
};

export default SocketHandler;

interface InfiniteData<TData> {
  pages: TData[];
  pageParams: any[];
}
