import React from "react";
import { Redirect, Tabs } from "expo-router";

import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  ActiveHome,
  ActiveRewards,
  ActiveSavings,
  Home,
  ProfileIcon,
  Rewards,
  Savings,
} from "@/assets";
import { useAuth } from "@/context";
import { Loading } from "@/components";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { token, isLoading, user } = useAuth();
  // console.log("isloading is", isLoading);
  // console.log("token is then", token);
  // console.log("user is then", user);

  if (isLoading) return <Loading />;
  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.inputFocusBorder,
        tabBarInactiveTintColor: Colors.faintBlack,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (focused ? <ActiveHome /> : <Home />),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          headerShown: false,
          title: "Rewards",
          tabBarIcon: ({ focused }) =>
            focused ? <ActiveRewards /> : <Rewards />,
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          headerShown: false,
          title: "Savings",
          tabBarIcon: ({ focused }) =>
            focused ? <ActiveSavings /> : <Savings />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? <ActiveHome /> : <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
