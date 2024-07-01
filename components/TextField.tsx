import { StyleSheet, TextInput, View, Text } from "react-native";

export const TextField = ({
  touched,
  onChange,
  onBlur,
  value,
  placeholder,
  errors,
}: {
  touched: any;
  onChange: any;
  onBlur: any;
  value: string;
  placeholder?: string;
  errors: any;
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#999"
      />
      {touched && errors && (
        <Text style={styles.errorText}>{errors}</Text>
      )}
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
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
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
});
