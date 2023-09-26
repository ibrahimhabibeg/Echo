import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../providers/Theme";

const createDateString = (dateString: string): string => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const date = new Date(dateString);
  const now = new Date();
  const delta = now.getTime() - date.getTime();
  if (delta < MINUTE) return "Now";
  else if (delta < 2*MINUTE) return `${Math.floor(delta / MINUTE)} minute ago`;
  else if (delta < HOUR) return `${Math.floor(delta / MINUTE)} minutes ago`;
  else if (delta < 2*HOUR) return `${Math.floor(delta / HOUR)} hour ago`;
  else if (delta < DAY) return `${Math.floor(delta / HOUR)} hours ago`;
  else return date.toLocaleDateString("en-GB");
};

const ChatCard = ({ name, to, message, createdAt }: propsType) => {
  const { theme } = useContext(ThemeContext);
  const messageText = `${name === to ? "Me" : name}: ${message}`;

  return (
    <Pressable style={styles.card}>
      <View style={styles.topView}>
        <Text variant="titleLarge" style={{}}>
          {name}
        </Text>
        <Text
          style={{
            ...theme.fonts.labelMedium, opacity:0.7
          }}
        >
          {createDateString(createdAt)}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        style={{
          ...theme.fonts.bodyMedium, opacity:0.8
        }}
      >
        {messageText}
      </Text>
    </Pressable>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 15,
    justifyContent: "space-between",
    height: 60,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
interface propsType {
  name: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
}
