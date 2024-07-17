import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

import { Colors, fonts } from "@/constants";
import { Hide, Search, Show } from "@/assets";
import { AppText } from "./AppText";
import { formatMoney } from "@/utils";
import { useAuth } from "@/context";
import { useBalance } from "@/hooks";
export const TextField = ({
  touched,
  onChange,
  onBlur,
  value,
  placeholder,
  errors,
  disabled,
  label,
  hasBalance = false,
  ...rest
}: {
  touched: any;
  onChange: any;
  onBlur: any;
  value: string | undefined;
  placeholder?: string;
  errors: any;
  disabled?: boolean;
  label: string;
  hasBalance?: boolean;
  [x: string]: any;
}) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const { token } = useAuth();
  const { data: mainBalance } = useBalance({
    token,
  });

  const handleBlur = (e: any) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>{label}</Text>
        {!!hasBalance && (
          <View
            style={{
              backgroundColor: "#90AD044D",
              height: 25,
              borderRadius: 100,
              paddingHorizontal: 10,
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <AppText size="small">
              Bal.{" "}
              {show
                ? `NGN ${formatMoney(mainBalance?.data?.balance || 0)}`
                : "*****"}
            </AppText>
            {show ? (
              <Hide onPress={() => setShow(!show)} />
            ) : (
              <Show onPress={() => setShow(!show)} stroke={Colors.black} />
            )}
          </View>
        )}
      </View>
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
        editable={!disabled}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={Colors.placeholder}
        {...rest}
      />
      {/* {touched && errors && <Text style={styles.errorText}>{errors}</Text>} */}
    </View>
  );
};
export const SearchField = ({
  touched,
  onChange,
  onBlur,
  value,
  errors,
  disabled,
  ...rest
}: {
  touched?: any;
  onChange: any;
  onBlur?: any;
  value: string;
  errors?: any;
  disabled?: boolean;
  [x: string]: any;
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
      <View
        style={[
          styles.input,
          focused ? styles.focusedStyle : undefined,
          disabled ? styles.disabledStyle : undefined,
          {
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 20,
            alignItems: "center",
          },
        ]}
      >
        <Search />
        <TextInput
          style={{
            flex: 1,
          }}
          onFocus={() => setFocused(true)}
          cursorColor={Colors.inputFocusBorder}
          selectionColor={Colors.inputFocusBorder}
          onChangeText={onChange}
          onBlur={handleBlur}
          value={value}
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          placeholderTextColor={Colors.placeholder}
          {...rest}
        />
      </View>
      {/* {touched && errors && <Text style={styles.errorText}>{errors}</Text>} */}
    </View>
  );
};

export const AmountField = ({
  touched,
  onChange,
  onBlur,
  value,
  placeholder,
  errors,
  disabled,
  label,
  hasBalance = false,
  ...rest
}: {
  touched: any;
  onChange: any;
  onBlur: any;
  value: string;
  placeholder?: string;
  errors: any;
  disabled?: boolean;
  label: string;
  hasBalance?: boolean;
  [x: string]: any;
}) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  const handleBlur = (e: any) => {
    setFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>{label}</Text>
        {!!hasBalance && (
          <View
            style={{
              backgroundColor: "#90AD044D",
              height: 25,
              borderRadius: 100,
              paddingHorizontal: 10,
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <AppText size="small">
              Bal. {show ? formatMoney("5000") : "*****"}
            </AppText>
            {show ? (
              <Hide onPress={() => setShow(!show)} />
            ) : (
              <Show onPress={() => setShow(!show)} stroke={Colors.black} />
            )}
          </View>
        )}
      </View>
      <View
        style={[
          styles.input,
          focused ? styles.focusedStyle : undefined,
          disabled ? styles.disabledStyle : undefined,
          { flexDirection: "row", alignItems: "center", gap: 15 },
        ]}
      >
        <AppText variant="medium">NGN</AppText>
        <View
          style={{ backgroundColor: Colors.inputBorder, height: 35, width: 1 }}
        />
        <TextInput
          style={{ flex: 1 }}
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
          {...rest}
        />
      </View>
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
    backgroundColor: "#fff",
  },
});
