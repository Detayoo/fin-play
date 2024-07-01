import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";
import { BackButton } from "./BackButton";

export const AuthLayout = ({
  children,
  currentStep = 1,
  showStep = true,
}: {
  children: React.ReactNode;
  currentStep?: number;
  showStep?: boolean;
}) => {
  return (
    <>
      <View style={styles.actionContainer}>
        <Pressable style={styles.backButton}>
          <BackButton />
        </Pressable>
        {!!showStep && (
          <View style={styles.stepContainer}>
            <AppText style={styles.step} color={Colors.primary}>
              Step {currentStep}/2
            </AppText>
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  stepContainer: {
    borderRadius: 100,
    backgroundColor: "rgba(144, 173, 4, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  step: {
    fontSize: 13,
    fontFamily: fonts["satoshi-medium"],
    opacity: 1,
  },
  backButton: {
    // height: 45,
    // width: 45,
    // borderColor: "#F1F1F1",
    // textAlignVertical: "center",
  },
});
