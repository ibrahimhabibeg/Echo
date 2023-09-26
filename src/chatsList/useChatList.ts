import { useContext } from "react";
import { AuthContext } from "../providers/Auth";
import { useQuery } from "@tanstack/react-query";

const useChatList = () => {
  const { token } = useContext(AuthContext);
  const query = useQuery({
    queryKey: ["chats", "list"],
    queryFn: async (): Promise<chatType[]> => {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MESSAGE_SERVICE_URL}/chats`,
        { headers: { authorization: token } }
      );
      if (!response.ok)
        throw new Error("Can't reach server now. Please, try again later.");
      const res = await response.json();
      return res.chats;
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
