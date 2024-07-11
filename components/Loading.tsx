import { Colors } from "@/constants";
import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingProps {
  size?: number | "small" | "large";
  color?: string;
  text?: string;
  textStyle?: object;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "large",
  color = Colors.primary,
  text = "Loading..",
  textStyle = {},
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary,
  },
});
