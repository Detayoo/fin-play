import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText } from "./AppText";
import { Cancel } from "@/assets";
import { Colors, fonts } from "@/constants";
import { useEffect } from "react";

export const ConfirmTransactionPin = ({
  pin,
  setPin,
}: {
  pin: string;
  setPin: (state: string) => void;
}) => {
  const handleKeyPress = (key: string) => {
    if (pin.length < 4) {
      setPin(pin + key);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const renderPinIndicators = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <View
          key={index}
          style={[
            styles.pinIndicator,
            index < pin.length && styles.pinIndicatorFilled,
          ]}
        />
      ));
  };
  const renderKeypad = () => {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];
    return keys.map((key, index) => (
      <TouchableOpacity
        key={index}
        style={styles.keypadButton}
        onPress={() => (key === "del" ? handleDelete() : handleKeyPress(key))}
        disabled={key === ""}
      >
        {key === "del" ? (
          <Cancel />
        ) : (
          <AppText style={styles.keypadButtonText}>{key}</AppText>
        )}
      </TouchableOpacity>
    ));
  };
  return (
    <>
      <View style={styles.pinContainer}>{renderPinIndicators()}</View>
      <View style={styles.keypadContainer}>{renderKeypad()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  pinIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 10,
  },
  pinIndicatorFilled: {
    backgroundColor: Colors.primary,
  },
  keypadContainer: {
    marginTop: 80,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "80%",
  },
  keypadButton: {
    width: "33.33%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  keypadButtonText: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: fonts["satoshi-medium"],
  },
});
