import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetworkLogger from "react-native-network-logger";
import { View } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const options = {
  headerShown: false,
};

export default function RootLayout() {
  const [data, setData] = useState<any>(null);
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

  const handleDeepLink = (event: any) => {
    let data = Linking.parse(event.url);
  };
  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL));
    };
    Linking.addEventListener("url", handleDeepLink);

    if (!data) {
      getInitialURL();
    }

    // return () => {
    //   Linking.removeEventListener("url");
    // };
  }, []);

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
            <Stack.Screen name="user-profile" options={options} />
            <Stack.Screen name="preferences" options={options} />
            <Stack.Screen name="contact-support" options={options} />
            <Stack.Screen name="account-limit" options={options} />
            <Stack.Screen name="referrals" options={options} />
            <Stack.Screen name="buy-airtime" options={options} />
            <Stack.Screen name="buy-data" options={options} />
            <Stack.Screen name="review-payment" options={options} />
            <Stack.Screen name="security" options={options} />
            <Stack.Screen name="cashback" options={options} />
            <Stack.Screen name="buy-electricity" options={options} />
            <Stack.Screen name="buy-betting" options={options} />
            <Stack.Screen name="initiate-upgrade" options={options} />
            <Stack.Screen name="tier-details" options={options} />
            <Stack.Screen name="enter-nin" options={options} />
            <Stack.Screen name="tier-three-upgrade" options={options} />
            <Stack.Screen name="how-to-use-cashbacks" options={options} />
            <Stack.Screen name="invites-list" options={options} />
            <Stack.Screen name="change-password" options={options} />
            <Stack.Screen name="change-pin" options={options} />
            <Stack.Screen name="forgot-pin" options={options} />
            <Stack.Screen name="cable-tv" options={options} />
            <Stack.Screen name="transaction-details" options={options} />
            {/* </Screen> */}
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack>
        </QueryClientProvider>
        {/* <View style={{ height: 250 }}>
          <NetworkLogger />
        </View> */}
      </AuthProvider>

      {/* </ThemeProvider> */}
    </>
  );
}
