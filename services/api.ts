import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { config } from "@/config";

const logout = async () => {
  await AsyncStorage.multiRemove(["USER", "TOKEN"]);
};

export const baseRequest = axios.create({
  baseURL: config.SERVER_URL,
});

export const authenticatedRequest = (token: string | null) => {
  const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        logout();
      } else {
        return Promise.reject(error);
      }
    }
  );
  return instance;
};
