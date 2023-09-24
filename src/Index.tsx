import { View, Text, Button } from "react-native";
import { AuthContext, AuthProvider } from "./providers/Auth";
import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { token, isLoggedIn, login, logout } = useContext(AuthContext);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <AuthProvider>
          <Text>Hello World!</Text>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;
