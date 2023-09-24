import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import Login from "../auth/Login";

export type ParamList = {
  login: undefined;
  signup: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const NotLoggedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="login"
      options={{ title: "Login" }}
      component={Login}
    />
    <Stack.Screen
      name="signup"
      options={{ title: "Signup" }}
      component={() => <Text>Signup</Text>}
    />
  </Stack.Navigator>
);

export default NotLoggedNavigator;
