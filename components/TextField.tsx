import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import { Colors, fonts } from "@/constants";
export const TextField = ({
  touched,
  onChange,
  onBlur,
  value,
  placeholder,
  errors,
  disabled,
  label,
}: {
  touched: any;
  onChange: any;
  onBlur: any;
  value: string;
  placeholder?: string;
  errors: any;
  disabled?: boolean;
  label: string;
}) => {
  const [focused, setFocused] = useState(false);

  const handleBlur = (e: any) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          focused ? styles.focusedStyle : undefined,
          disabled ? styles.disabledStyle : undefined,
        ]}
        onFocus={() => setFocused(true)}
        cursorColor={Colors.inputFocusBorder}
        selectionColor={Colors.inputFocusBorder}
        onChangeText={onChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={Colors.placeholder}
      />
      {/* {touched && errors && <Text style={styles.errorText}>{errors}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: fonts["satoshi-medium"],
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: Colors.black,
    backgroundColor: Colors.inputBackground,
    fontFamily: fonts["satoshi-medium"],
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
