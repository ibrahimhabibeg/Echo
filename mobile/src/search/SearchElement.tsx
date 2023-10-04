import { Text } from "react-native-paper";
import { Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Navigators/Logged";

interface propsType {
  username: string;
  navigation: NativeStackNavigationProp<NavigationParamList, "search">;
}

const SearchElement = ({ username, navigation }: propsType) => {
  return (
    <Pressable
      style={{ alignSelf: "center", marginVertical: 15 }}
      onPress={() => navigation.navigate("chat", { userId: username })}
    >
      <Text variant="bodyLarge">{username}</Text>
    </Pressable>
  );
};

export default SearchElement;
