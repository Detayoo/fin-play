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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context";
import NetworkLogger from "react-native-network-logger";

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

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 1 } },
  });

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
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
            <Stack.Screen name="data" options={options} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="internal-transfer" options={options} />
            <Stack.Screen name="bank-transfer" options={options} />
            <Stack.Screen name="payment-summary" options={options} />
            <Stack.Screen name="payment-receipt" options={options} />
            <Stack.Screen name="beneficiaries" options={options} />
            <Stack.Screen name="beneficiary-transfer" options={options} />
            <Stack.Screen name="transactions-history" options={options} />
            <Stack.Screen name="initiate-bill-payment" options={options} />
            {/* </Screen> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
        {/* <NetworkLogger /> */}
      </AuthProvider>

      {/* </ThemeProvider> */}
    </>
  );
}
