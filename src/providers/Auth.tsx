import { createContext, useContext, useEffect, useState } from "react";
import { setItemAsync, deleteItemAsync, getItemAsync } from "expo-secure-store";
import { TOKEN_KEY } from "../config";
import type { JSX } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  logout: async () => {},
  login: async (token: string) => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    token: "",
  });

  const queryClient = useQueryClient();

  const setDefaultState = async () => {
    const token = await getItemAsync(TOKEN_KEY);
    if (!token) setAuthState({ isLoggedIn: false, token: "" });
    else setAuthState({ token, isLoggedIn: true });
  };

  useEffect(() => {
    setDefaultState();
  }, []);

  const logout = async () => {
    queryClient.clear();
    setAuthState({ isLoggedIn: false, token: "" });
    await deleteItemAsync(TOKEN_KEY);
  };

  const login = async (token: string) => {    
    await setItemAsync(TOKEN_KEY, token);
    setAuthState({ token, isLoggedIn: true });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        ...authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
