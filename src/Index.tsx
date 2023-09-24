import { AuthProvider } from "./providers/Auth";
import { ThemeProvider } from "./providers/Theme";
import MainNavigator from "./Navigators/Main";

const Index = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Index;
