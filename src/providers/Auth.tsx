import { createContext, useContext, useEffect, useState } from "react";
import { setItemAsync, deleteItemAsync, getItemAsync } from "expo-secure-store";
import { TOKEN_KEY, USER_ID_KEY } from "../config";
import type { JSX } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface loginParams {
  token: string;
  userId: string;
}

export const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  userId: "",
  logout: async () => {},
  login: async (loginData: loginParams) => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    token: "",
    userId: "",
  });

  const queryClient = useQueryClient();

  const setDefaultState = async () => {
    const token = await getItemAsync(TOKEN_KEY);
    const userId = await getItemAsync(USER_ID_KEY);
    if (!token || !userId) setAuthState({ isLoggedIn: false, token: "", userId: "" });
    else setAuthState({ userId, token, isLoggedIn: true });
  };

  useEffect(() => {
    setDefaultState();
  }, []);

  const logout = async () => {
    queryClient.clear();
    setAuthState({ isLoggedIn: false, token: "", userId: "" });
    await deleteItemAsync(TOKEN_KEY);
    await deleteItemAsync(USER_ID_KEY);
  };

  const login = async ({ token, userId }: loginParams) => {
    await setItemAsync(TOKEN_KEY, token);
    await setItemAsync(USER_ID_KEY, userId);
    setAuthState({ userId, token, isLoggedIn: true });
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
