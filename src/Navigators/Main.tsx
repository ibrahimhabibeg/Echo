import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../providers/Theme";
import { useContext } from "react";
import { AuthContext } from "../providers/Auth";
import LoggedNavigator from "./Logged";
import NotLoggedNavigator from "./NotLogged";

const MainNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer theme={theme}>
      {isLoggedIn ? <LoggedNavigator /> : <NotLoggedNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
