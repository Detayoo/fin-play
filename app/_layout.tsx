import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Screen, ToastComponent } from "@/components";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const options = {
  headerShown: false,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    satoshi: require("../assets/fonts/satoshi-regular.otf"),
    "satoshi-medium": require("../assets/fonts/satoshi-medium.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ToastComponent />
      {/* <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        > */}
      <Stack>
        {/* <Screen> */}
        <Stack.Screen name="index" options={options} />
        <Stack.Screen name="login" options={options} />
        <Stack.Screen name="registration" options={options} />
        <Stack.Screen name="forgot-password" options={options} />
        <Stack.Screen name="reset-password" options={options} />
        <Stack.Screen name="account-verification" options={options} />
        <Stack.Screen name="bvn-verification" options={options} />
        <Stack.Screen name="set-transaction-pin" options={options} />
        <Stack.Screen name="airtime" options={options} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="internal-transfer" options={options} />
        <Stack.Screen name="payment-summary" options={options} />
        <Stack.Screen name="payment-receipt" options={options} />
        {/* </Screen> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      {/* </ThemeProvider> */}
    </>
  );
}
