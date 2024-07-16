import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { usePathname } from "expo-router";

import { ToastComponent } from "./ToastComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Screen = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  const pathName = usePathname();
  return (
    <>
      <ToastComponent />
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <SafeAreaView style={[styles.safeArea, style]}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                paddingVertical: 16,
                paddingHorizontal: pathName === "/" ? 0 : 16,
                backgroundColor: "#fff",
              }}
            >
              {children}
            </View>
          </GestureHandlerRootView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
