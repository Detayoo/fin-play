import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getToken, getUser } from "@/utils";
import { router } from "expo-router";

interface User {
  id: string;
  email: string;
}

interface AuthContextData {
  token: null | string;
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  saveUser: (user: any, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadStoredAuth();
  }, [user, token]);

  const loadStoredAuth = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const user = await getUser();
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error("Failed to load auth", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.multiRemove(["USER", "TOKEN"]);
      setUser(null);
      setToken(null);
      // router.push("/login");
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (user: any, token: string) => {
    try {
      setUser(user);
      setToken(token);
      await AsyncStorage.setItem("USER", JSON.stringify(user));
      await AsyncStorage.setItem("TOKEN", token);
    } catch (error) {
      console.log("error saving user", user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, saveUser, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
