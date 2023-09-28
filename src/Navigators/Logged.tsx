import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsList from "../chatsList/ChatLists";
import Search from "../search/Search";
import ChatListHeaderRight from "../chatsList/HeaderRight";

export type NavigationParamList = {
  chatsList: undefined;
  search: undefined;
};

const Stack = createNativeStackNavigator<NavigationParamList>();

const LoggedNavigator = () => (
  <Stack.Navigator initialRouteName="chatsList">
    <Stack.Screen
      name="chatsList"
      options={({ navigation }) => ({
        title: "Chats",
        headerRight: ChatListHeaderRight(navigation),
      })}
      component={ChatsList}
    />
    <Stack.Screen
      name="search"
      options={{ title: "Search" }}
      component={Search}
    />
  </Stack.Navigator>
);

export default LoggedNavigator;
