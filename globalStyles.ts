import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  shadow: {
    marginHorizontal: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#ababab",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
