import { BackIcon } from "@/assets";
import { Colors } from "@/constants";
import { Pressable, StyleSheet } from "react-native";

export const BackButton = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <BackIcon />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    elevation: 3,
  },
});
