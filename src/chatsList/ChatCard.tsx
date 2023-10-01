import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../providers/Theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Navigators/Logged";
import { createDateString } from "../utils";

const ChatCard = ({ name, to, message, createdAt, navigation }: propsType) => {
  const { theme } = useContext(ThemeContext);
  const messageText = `${name === to ? "Me" : name}: ${message}`;

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("chat", { userId: name })}
    >
      <View style={styles.topView}>
        <Text variant="titleLarge">{name}</Text>
        <Text
          style={{
            ...theme.fonts.labelMedium,
            opacity: 0.7,
          }}
        >
          {createDateString(createdAt)}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        style={{
          ...theme.fonts.bodyMedium,
          opacity: 0.8,
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
  navigation: NativeStackNavigationProp<NavigationParamList, "chatsList">;
}
