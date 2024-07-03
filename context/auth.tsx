import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextData {
  token: null | string;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  async function loadStoredAuth() {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      setToken(token);
    } catch (error) {
      console.error("Failed to load auth", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    try {
      // Implement your sign in logic here
      // This is a placeholder implementation
      const response = await fetch("https://your-api.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        await AsyncStorage.setItem("TOKEN", data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Sign in failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      // Implement your sign out logic here
      await AsyncStorage.removeItem("TOKEN");
      setUser(null);
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email: string, password: string) {
    setIsLoading(true);
    try {
      // Implement your sign up logic here
      // This is a placeholder implementation
      const response = await fetch("https://your-api.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        await AsyncStorage.setItem("TOKEN", data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Sign up failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signOut, signUp, token }}
    >
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
