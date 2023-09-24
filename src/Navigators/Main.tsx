import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../providers/Theme";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";

type StackParamList = {
  chats: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const MainNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="chats"
          options={{ title: "Chats" }}
          component={() => <Text>Hello World!</Text>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
