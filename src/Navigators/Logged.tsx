import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";

type ParamList = {
  chatsList: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const LoggedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="chatsList"
      options={{ title: "Chats" }}
      component={() => <Text>Hello World!</Text>}
    />
  </Stack.Navigator>
);

export default LoggedNavigator;
