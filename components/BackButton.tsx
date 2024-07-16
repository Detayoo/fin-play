import { router } from "expo-router";
import { Pressable, StyleSheet, TextStyle } from "react-native";

import { BackIcon } from "@/assets";
import { Colors } from "@/constants";
export const BackButton = ({ style }: { style?: TextStyle }) => {
  return (
    <Pressable onPress={() => router.back()} style={[styles.container, style]}>
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
    zIndex: 99999999999,
    // paddingHorizontal: 30,
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
