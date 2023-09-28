import { IconButton } from "react-native-paper";
import { NavigationParamList } from "../Navigators/Logged";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HeaderRight =
  (navigation: NativeStackNavigationProp<NavigationParamList, "chatsList">) =>
  () =>
    <IconButton icon="magnify" onPress={() => navigation.navigate("search")} />;

export default HeaderRight;
