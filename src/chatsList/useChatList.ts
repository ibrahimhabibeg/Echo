import { useContext } from "react";
import { AuthContext } from "../providers/Auth";
import { useInfiniteQuery } from "@tanstack/react-query";

const useChatList = () => {
  const { token } = useContext(AuthContext);
  const query = useInfiniteQuery({
    queryKey: ["chats", "list"],
    queryFn: async ({ pageParam }): Promise<chatType[]> => {
      const cursorString =
        typeof pageParam === "undefined" ? "" : "cursor=" + pageParam;      
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MESSAGE_SERVICE_URL}/chats?${cursorString}`,
        {
          headers: { authorization: token, "Content-Type": "application/json" },
        }
      );
      if (!response.ok)
        throw new Error("Can't reach server now. Please, try again later.");
      const res = await response.json();
      return res.chats;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      else return lastPage[lastPage.length - 1].createdAt;
    },
  });
  return query;
};

export default useChatList;

interface chatType {
  _id: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
}
