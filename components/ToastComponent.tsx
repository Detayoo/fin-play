import { Colors, fonts } from "@/constants";
import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

// Custom toast styles
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.primary,
        zIndex: 9999,
        width: "95%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontFamily: fonts["satoshi"],
        color: Colors.primary,
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: fonts["satoshi"],
        color: Colors.primary,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.error,
        zIndex: 9999,
        width: "95%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontFamily: fonts["satoshi"],
        color: Colors.error,
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: fonts["satoshi"],
        color: Colors.error,
      }}
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

export const ToastComponent = () => <Toast config={toastConfig} />;
