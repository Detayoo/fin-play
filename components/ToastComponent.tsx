import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

// Custom toast styles
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        zIndex: 9999,
        width: "95%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        paddingVertical: 30,
        zIndex: 9999,

        width: "95%",
      }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 13,
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
