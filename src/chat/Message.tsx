import { useContext } from "react";
import { messageType } from "./types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ThemeContext } from "../providers/Theme";
import { AuthContext } from "../providers/Auth";
import { createDateString } from "../utils";

const Message = ({ message, from, to, createdAt }: messageType) => {
  const { theme } = useContext(ThemeContext);
  const { userId } = useContext(AuthContext);
  const amISender = userId === from;
  return (
    <View
      style={{
        alignSelf: userId === from ? "flex-end" : "flex-start",
        backgroundColor: amISender
          ? theme.colors.primaryContainer
          : theme.colors.secondaryContainer,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopRightRadius: amISender ? 0 : 15,
        borderBottomRightRadius: amISender ? 0 : 15,
        borderTopLeftRadius: amISender ? 15 : 0,
        borderBottomLeftRadius: amISender ? 15 : 0,
      }}
    >
      <Text variant="bodyLarge">{message}</Text>
      <Text variant="labelSmall" style={{ opacity: 0.7 }}>
        {createDateString(createdAt)}
      </Text>
    </View>
  );
};

export default Message;
