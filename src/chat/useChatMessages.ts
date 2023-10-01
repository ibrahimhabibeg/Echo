import { useContext } from "react";
import { AuthContext } from "../providers/Auth";
import { useInfiniteQuery } from "@tanstack/react-query";

const useChatMessages = (otherUser: string) => {
  const { token } = useContext(AuthContext);
  const query = useInfiniteQuery({
    queryKey: ["chat", otherUser],
    queryFn: async ({ pageParam }): Promise<messageType[]> => {      
      const cursorString =
        typeof pageParam === "undefined" ? "" : "cursor=" + pageParam;
      
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MESSAGE_SERVICE_URL}/messages?otherUser=${otherUser}&${cursorString}`,
        { headers: { authorization: token } }
      );      
      if (!response.ok)
        throw new Error("Can't reach server now. Please, try again later.");
      const res = await response.json();      
      return res.messages;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      else return lastPage[lastPage.length - 1].createdAt;
    },
  });
  return query;
};

export default useChatMessages;

interface messageType {
  from: string;
  to: string;
  message: string;
  createdAt: Date;
  _id: string;
}
