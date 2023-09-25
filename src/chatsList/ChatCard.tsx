import { View } from "react-native";
import { Text } from "react-native-paper";

const ChatCard = ({ id, to, from, message, createdAt }: propsType) => {
  return (
    <View>
      <Text>{id}</Text>
      <Text>{to}</Text>
      <Text>{from}</Text>
      <Text>{message}</Text>
      <Text>{createdAt}</Text>
    </View>
  );
};

export default ChatCard;

interface propsType {
  id: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
}
