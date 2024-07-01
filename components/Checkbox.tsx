import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, fonts } from "@/constants";
export const Checkbox = ({ onChange, checked }: any) => {
  return (
    <Pressable
      onPress={onChange}
      style={[
        styles.checkboxBase,
        checked && styles.checkboxChecked,
        checked ? styles.blackBorder : styles.defaultBorder,
      ]}
    >
      {checked && <Ionicons name="checkmark" size={16} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  defaultBorder: {
    borderColor: Colors.checkboxBorder,
  },
  blackBorder: {
    borderColor: Colors.primary,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontFamily: fonts["satoshi-medium"],
    fontSize: 14,
  },
});
