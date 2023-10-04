import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

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
      component={Signup}
    />
  </Stack.Navigator>
);

export default NotLoggedNavigator;
