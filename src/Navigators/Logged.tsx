import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsList from "../chatsList/ChatLists";
import Search from "../search/Search";
import Chat from "../chat/Chat";
import ChatListHeaderRight from "../chatsList/HeaderRight";

export type NavigationParamList = {
  chatsList: undefined;
  search: undefined;
  chat: { userId: string };
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
      name="chat"
      options={({ route }) => ({ title: route.params.userId })}
      component={Chat}
    />
    <Stack.Screen
      name="search"
      options={{ title: "Search" }}
      component={Search}
    />
  </Stack.Navigator>
);

export default LoggedNavigator;
