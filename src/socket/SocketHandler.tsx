import { useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { messageType, chatType } from "../types";
import { SocketContext } from "../providers/SocketProvider";

const SocketHandler = ({ children }: { children: JSX.Element }) => {
  const queryClient = useQueryClient();
  const {socket} = useContext(SocketContext)

  const updateChatList = (message: messageType) =>
    queryClient.setQueryData<InfiniteData<chatType[]>>(
      ["chats", "list"],
      (oldData) => {
        if (oldData) {
          const isUserCached = oldData.pages
            .flatMap((_) => _)
            .reduce((val, chat) => val || chat._id === message.from, false);
          if (isUserCached)
            return {
              ...oldData,
              pages: oldData.pages.map((page) =>
                page.map((chat) => {
                  if (chat._id === message.from)
                    return { ...message, _id: chat._id };
                  else return chat;
                })
              ),
            };
          else
            return {
              ...oldData,
              pages: [[{ ...message, _id: message.from }], ...oldData.pages],
            };
        } else return oldData;
      }
    );

  const updateChat = (message: messageType) =>
    queryClient.setQueryData<InfiniteData<messageType[]>>(
      ["chat", message.from],
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
    updateChatList(message);
    updateChat(message);
  };

  useEffect(() => {
    socket.on("recieveMessage", onRecieveMessage);
    return () => {
      socket.off("recieveMessage", onRecieveMessage);
    };
  }, []);

  return children;
};

export default SocketHandler;

interface InfiniteData<TData> {
  pages: TData[];
  pageParams: any[];
}
