import * as React from "react";
import { View } from "react-native";

import { AppText } from "@/components";
import { Colors } from "@/constants";
export const Uzzy = () => {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: Colors.lightGreen,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText size="large" variant="medium">
        U
      </AppText>
    </View>
  );
};
