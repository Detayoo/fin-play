import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import {
  ActiveHome,
  ActiveRewards,
  ActiveSavings,
  Home,
  ProfileIcon,
  Rewards,
  Savings,
} from "@/assets";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const token = "hh";

  if (!token) {
    return <Redirect href="/" />;
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
