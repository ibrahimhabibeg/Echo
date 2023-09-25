import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/Auth";
import ChatCard from "./ChatCard";
import { Text } from "react-native-paper";

const ChatsList = () => {
  const { token } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
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

  if (isLoading) return <Text>Loading ...</Text>;
  else if (data)
    return (
      <>
        {data.map((chat) => (
          <ChatCard key={chat._id} id={chat._id} {...chat} />
        ))}
      </>
    );
  else return <Text>Can't reach server now. Please, try again later.</Text>;
};

export default ChatsList;

interface chatType {
  _id: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
}
