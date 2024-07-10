import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, useAuth } from "@/context";
import { showToast } from "@/components";
import { extractServerError } from "./extractAppError";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("TOKEN", token);
    console.log("Token stored successfully");
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem("USER");
    if (userString !== null) {
      const user: User = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting User:", error);
    return null;
  }
};

export const getBiometricOption = async () => {
  try {
    const biometrics = await AsyncStorage.getItem("BIOMETRICS");
    if (biometrics !== null) {
      return JSON.parse(biometrics);
    } else {
      return null;
    }
  } catch (error) {}
};
