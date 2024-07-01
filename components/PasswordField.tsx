import { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextStyle,
  View,
} from "react-native";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";
import { useField } from "formik";

export const PasswordField = ({
  disabled,
  label,
  onBlur,
  inputStyle,
  name,
  handleTextChange,
  ...rest
}: any) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [_, meta, helper] = useField(name);

  const handleBlur = (e: any) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View>
      <AppText style={styles.label}>{label}</AppText>
      <View
        style={[
          styles.container,
          focused ? styles.focusedStyle : undefined,
          disabled ? styles.disabledStyle : undefined,
          inputStyle,
        ]}
      >
        <TextInput
          value={meta.value}
          onChangeText={helper.setValue}
          onBlur={handleBlur}
          cursorColor={Colors.inputFocusBorder}
            selectionColor={Colors.inputFocusBorder}
          secureTextEntry={!showPassword}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.placeholder}
          {...rest}
          style={styles.passwordField}
        />
        <AppText
          variant="medium"
          onPress={() => setShowPassword((state) => !state)}
        >
          {showPassword ? "Hide" : "Show"}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.inputBackground,
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
  },
  labelWrapper: {
    marginBottom: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: fonts["satoshi-medium"],
  },
  passwordField: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: Colors.primary,
    fontFamily: fonts["satoshi-medium"],
  },
  focusedStyle: {
    borderWidth: 1,
    borderColor: Colors.inputFocusBorder,
    backgroundColor: Colors.white,
  },
  disabledStyle: {
    backgroundColor: "#F6FFFC",
  },
});
