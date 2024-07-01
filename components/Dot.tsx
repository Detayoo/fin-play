import { View, StyleSheet } from "react-native";

export const Dot = ({
  activeIndex,
  length,
}: {
  activeIndex: number;
  length: number;
}) => {
  const renderDots = () => {
    return [...Array(length)].map((_, index) => (
      <View
        style={[styles.dotContent, activeIndex === index && styles.activeDot]}
        key={index + 1}
      />
    ));
  };

  return <View style={styles.container}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  dotContent: {
    width: 40,
    height: 5,
    backgroundColor: "#ABABAB3D",
  },
  activeDot: {
    backgroundColor: "#BFDB38",
  },
});
