import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";

import { ToastComponent } from "./ToastComponent";

export const Screen = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <>
      <ToastComponent />
      <SafeAreaView style={[styles.safeArea, style]}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
