import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Cancel, LockIcon } from "@/assets";
import { Colors, fonts } from "@/constants";

const ConfirmTransactionPIN = () => {
  const [pin, setPin] = useState("");

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
          <Text style={styles.keypadButtonText}>{key}</Text>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LockIcon />
        <Text style={styles.title}>Set Transaction PIN</Text>
        <Text style={styles.subtitle}>
          This is the PIN used to confirm transactions.
        </Text>
        <Text style={styles.subtitle}>Be sure to keep it safe.</Text>
      </View>
      <View style={styles.pinContainer}>{renderPinIndicators()}</View>
      <View style={styles.keypadContainer}>{renderKeypad()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    // justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: fonts["satoshi-medium"],
    marginVertical: 10,
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.faintBlack,
    textAlign: "center",
  },
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

export default ConfirmTransactionPIN;
