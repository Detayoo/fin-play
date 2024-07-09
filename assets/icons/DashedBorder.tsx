import { StyleSheet, View } from "react-native";

export const DashedBorder = () => {
  return (
    <View style={styles.dottedBorderContainer}>
      <View style={[styles.dottedBorder, { borderColor: "#d6d6d6" }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  dottedBorderContainer: {
    height: 1,
    overflow: "hidden",
  },
  dottedBorder: {
    height: 2,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderStyle: "dashed",
  },
});
