import { Text } from "react-native-paper";
import { Pressable, View } from "react-native";

interface propsType {
  username: string;
}

const SearchElement = ({ username }: propsType) => {
  return (
    <Pressable style={{ alignSelf: "center", marginVertical: 15 }}>
      <Text variant="bodyLarge">{username}</Text>
    </Pressable>
  );
};

export default SearchElement;
