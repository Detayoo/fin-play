import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { BackIcon } from "@/assets";
import { Colors } from "@/constants";
export const BackButton = () => {
  return (
    <Pressable onPress={() => router.back()} style={styles.container}>
      <BackIcon />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowRadius: 2,
    // shadowOpacity: 0.15,
    // elevation: 3,
  },
});
