import { Colors, fonts } from "@/constants";
import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, StyleSheet } from "react-native";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.successToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, styles.successText]}
      text2Style={[styles.text2, styles.successText]}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.toast, styles.errorToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, styles.errorText]}
      text2Style={[styles.text2, styles.errorText]}
    />
  ),
};

export const showToast = (
  type: "success" | "error",
  text1: string,
  text2?: string
) => {
  return Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    position: "top",
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 0,
  });
};

export const ToastComponent = () => (
  <View style={styles.container}>
    <Toast config={toastConfig} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 9999999,

    elevation: 9999,
    backgroundColor: "red",
  },
  toast: {
    width: "95%",
    zIndex: 9999999999,

    elevation: 10000,
  },
  successToast: {
    borderLeftColor: Colors.primary,
  },
  errorToast: {
    borderLeftColor: Colors.error,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    fontFamily: fonts["satoshi"],
  },
  text2: {
    fontSize: 13,
    fontFamily: fonts["satoshi"],
  },
  successText: {
    color: Colors.primary,
  },
  errorText: {
    color: Colors.error,
  },
});
