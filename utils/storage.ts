import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    if (token !== null) {
      console.log("Token retrieved:", token);
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("Token stored successfully");
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
