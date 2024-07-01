import { config } from "@/config";
import { getToken } from "@/utils";
import axios from "axios";

export const baseRequest = axios.create({
  baseURL: config.SERVER_URL,
});

export const authenticatedRequest = async () => {
  const token = await getToken();

  const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
  });
  return instance;

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
      } else {
        return Promise.reject(error);
      }
    }
  );
};
