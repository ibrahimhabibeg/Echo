import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsList from "../chatsList/ChatLists";

type ParamList = {
  chatsList: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const LoggedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="chatsList"
      options={{ title: "Chats" }}
      component={ChatsList}
    />
  </Stack.Navigator>
);

export default LoggedNavigator;
