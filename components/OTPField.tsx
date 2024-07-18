import { StyleSheet, View } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { Colors, fonts } from "@/constants";
export const OtpField = ({
  code,
  setCode,
  count,
  handleAction,
  autoFocus,
  ...rest
}: {
  code: string;
  setCode?: (e: string) => void;
  count: number;
  handleAction?: () => void;
  autoFocus?: boolean;
  [x: string]: any;
}) => {
  return (
    <View>
      <OTPInputView
        pinCount={count}
        secureTextEntry={true}
        onCodeChanged={setCode}
        autoFocusOnLoad={autoFocus || false}
        keyboardType="number-pad"
        style={styles.otpInput}
        codeInputFieldStyle={styles.codeInputFieldStyle}
        codeInputHighlightStyle={styles.codeInputHighlightStyle}
        selectionColor={Colors.inputFocusBorder}
        placeholderTextColor={Colors.inputFocusBorder}
        code={code}
        onCodeFilled={handleAction}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: Colors.primary,
  },
  otpInput: {
    marginTop: 35,
    margin: 0,
    padding: 0,
    flexDirection: "row",
    gap:10
  },

  codeInputFieldStyle: {
    borderWidth: 1,
    borderColor: Colors.inputFocusBorder,
    height: 50,
    width: 50,
    borderRadius: 5,
    color: Colors.black,
    fontSize: 16,
  },
  codeInputHighlightStyle: {
    borderColor: Colors.inputFocusBorder,
    borderWidth: 1,
  },

  expiry: {
    marginTop: 20,
    fontSize: 14,
  },

  expiryTime: {
    fontFamily: fonts["satoshi-medium"],
  },

  resendCode: {
    fontFamily: fonts["satoshi-medium"],
  },
});
