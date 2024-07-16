import React from "react";
import {
  Pressable,
  ActivityIndicator,
  StyleProp,
  TextStyle,
  StyleSheet,
} from "react-native";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";

interface ButtonProps {
  disabled?: boolean;
  label?: any;
  loading?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  variant?: "primary" | "outline" | "default";
  style?: any;
  onPress?: any;
}

export const PrimaryButton = ({
  disabled,
  loading,
  variant = "primary",
  style,
  labelStyle,
  label,
  onPress,
  ...props
}: ButtonProps) => {
  const getBtnLabelColor = () => {
    switch (variant) {
      case "outline":
        return Colors.inputFocusBorder;
      case "primary":
        return Colors.white;
      case "default":
        return Colors.white;
    }
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        styles[variant],
        { opacity: pressed ? 0.7 : 1 },
        disabled ? styles.disabled : undefined,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <AppText
          size="large"
          variant="medium"
          style={[labelStyle, { fontFamily: fonts["satoshi-medium"] }]}
          color={getBtnLabelColor()}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 1000,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.7,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.inputFocusBorder,
    backgroundColor: Colors.white,
  },
  default: {
    backgroundColor: Colors.primary,
  },
});
