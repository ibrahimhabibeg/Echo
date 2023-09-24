import { AuthProvider } from "./providers/Auth";
import { ThemeProvider } from "./providers/Theme";
import MainNavigator from "./Navigators/Main";
import QueryProvider from "./providers/Query";

const Index = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default Index;
