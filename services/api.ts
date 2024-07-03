import { config } from "@/config";
import { useAuth } from "@/context";
import { getToken } from "@/utils";
import axios from "axios";

export const baseRequest = axios.create({
  baseURL: config.SERVER_URL,
});

export const authenticatedApi = () => {
  const token = "";
  const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

export const authenticatedRequest = (token: string | null) => {
  const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
      } else {
        return Promise.reject(error);
      }
    }
  );
  return instance;
};
