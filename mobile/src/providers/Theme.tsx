import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createContext, useState } from "react";

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

const LightTheme = {
  ...MD3LightTheme,
  ...AdaptedLightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...AdaptedLightTheme.colors,
    primaryContainer: "#cbc3e3"
  },
};
const DarkTheme = {
  ...MD3DarkTheme,
  ...AdaptedDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...AdaptedDarkTheme.colors,
  },
};

export const ThemeContext = createContext({
  theme: DarkTheme,
  toggleTheme: () => {},
  isDark: true,
});

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider
      value={{
        isDark: isDark,
        theme: isDark ? DarkTheme : LightTheme,
        toggleTheme: () => setIsDark((val) => !val),
      }}
    >
      <PaperProvider theme={isDark ? DarkTheme : LightTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
