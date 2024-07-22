import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { LockIcon } from "@/assets";
import { Colors, fonts } from "@/constants";
import {
  ConfirmTransactionPin,
  Screen,
  SetTransactionPin,
  showToast,
} from "@/components";
import { setTransactionPinFn } from "@/services";
import { ERRORS, extractServerError } from "@/utils";
import { useAuth } from "@/context";

const ConfirmTransactionPIN = () => {
  const { token, saveUser, user } = useAuth();
  const [stage, setStage] = useState(1);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => {
        setStage(2);
      }, 500);
    }
  }, [pin]);

  useEffect(() => {
    if (confirmPin.length === 4) {
      setTimeout(() => {
        handlePin();
      }, 500);
    }
  }, [confirmPin]);

  const clearFields = () => {
    setPin("");
    setConfirmPin("");
  };

  const { mutateAsync } = useMutation({
    mutationFn: setTransactionPinFn,
    onSuccess: (data) => {
      saveUser({ ...user, pin }, token);

      showToast("success", data?.message);
      router.push("/(tabs)");
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const handlePin = async () => {
    if (confirmPin !== pin) {
      showToast("error", "Pins do not match");
      clearFields();
      setStage(1);
      return;
    }

    try {
      await mutateAsync({
        pin,
        confirmPin,
        token,
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.header}>
          <LockIcon />
          <Text style={styles.title}>
            {stage == 1 ? "Set" : "Confirm"} Transaction PIN
          </Text>
          <Text style={styles.subtitle}>
            This is the PIN used to confirm transactions.
          </Text>
          <Text style={styles.subtitle}>Be sure to keep it safe.</Text>
        </View>
        {stage === 1 ? (
          <SetTransactionPin pin={pin} setPin={setPin} />
        ) : (
          <ConfirmTransactionPin pin={confirmPin} setPin={setConfirmPin} />
        )}
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
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
