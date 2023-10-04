import { AuthProvider } from "./providers/Auth";
import { ThemeProvider } from "./providers/Theme";
import MainNavigator from "./Navigators/Main";
import QueryProvider from "./providers/Query";
import SocketHandler from "./socket/SocketHandler";
import { SocketProvider } from "./providers/SocketProvider";

const Index = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <SocketProvider>
            <SocketHandler>
              <MainNavigator />
            </SocketHandler>
          </SocketProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default Index;
