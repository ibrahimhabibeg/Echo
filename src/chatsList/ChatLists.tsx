import { useContext } from "react";
import { AuthContext } from "../providers/Auth";
import ChatCard from "./ChatCard";
import { Button, Text } from "react-native-paper";
import useChatList from "./useChatList";

const ChatsList = () => {
  const { logout } = useContext(AuthContext);
  const { data, isLoading } = useChatList();

  if (isLoading) return <Text>Loading ...</Text>;
  else if (data)
    return (
      <>
        {data.map((chat) => (
          <ChatCard key={chat._id} name={chat._id} {...chat} />
        ))}
        <Button onPress={logout}>logout</Button>
      </>
    );
  else return <Text>Can't reach server now. Please, try again later.</Text>;
};

export default ChatsList;
