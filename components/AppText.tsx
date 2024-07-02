import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { Colors, fonts } from "@/constants";

export interface AppTextProps extends TextProps {
  color?: string;
  size?: "normal" | "xsmall" | "small" | "large" | "xlarge" | "xxlarge";
  variant?: "normal" | "medium" | "semi-bold" | "bold" | "bolder";
}

export const AppText = ({
  style,
  color,
  size,
  variant = "normal",
  ...props
}: AppTextProps) => {
  const additionalStyle: TextStyle = {};

  if (color) {
    additionalStyle.color = color;
  }

  return (
    <Text
      style={[
        styles.label,
        styles[variant],
        size ? styles[size] : undefined,
        additionalStyle,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: fonts.satoshi,
  },
  normal: {
    fontSize: 14,
    fontFamily: fonts.satoshi,
  },
  medium: {
    fontWeight: "500",
    fontFamily: fonts.satoshi,
  },
  ["semi-bold"]: {
    fontWeight: "600",
    fontFamily: fonts.satoshi,
  },
  bold: {
    fontWeight: "700",
    fontFamily: fonts.satoshi,
  },
  bolder: {
    fontWeight: "800",
  },
  xsmall: {
    fontSize: 10,
  },
  small: {
    fontSize: 12,
  },
  large: {
    fontSize: 16,
  },
  xlarge: {
    fontSize: 18,
  },
  xxlarge: {
    fontSize: 20,
  },
});
