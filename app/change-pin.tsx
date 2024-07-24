import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import { isValid } from "date-fns";
import { useMutation } from "@tanstack/react-query";

import {
  AuthLayout,
  PasswordField,
  PrimaryButton,
  Screen,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { ERRORS, changePinSchema, extractServerError } from "@/utils";
import { ChangePinPayloadType } from "@/types";
import { changePinFn } from "@/services";
import { useAuth } from "@/context";

const ChangePinPage = () => {
  const { token, user, saveUser } = useAuth();
  const [pin, setPin] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePinFn,
    onSuccess: (data) => {
      saveUser({ ...user, pin }, token); // save the user's new pin
      showToast("success", data?.message);
      setTimeout(() => {
        router.replace("/(tabs)/profile");
      }, 1000);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });
  const handleSubmit = async (values: ChangePinPayloadType) => {
    const { newPin, oldPin, confirmPin } = values;
    setPin(newPin);
    try {
      await mutateAsync({
        oldPin,
        newPin,
        confirmPin,
        token,
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <Formik
        initialValues={{
          oldPin: "",
          newPin: "",
          confirmPin: "",
        }}
        validationSchema={changePinSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <AuthLayout showStep={false} headerText="Change Pin">
            <View style={styles.container}>
              <View style={styles.inputFields}>
                <PasswordField
                  name="oldPin"
                  label="Old Pin"
                  placeholder="Enter your old PIN"
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <PasswordField
                  name="newPin"
                  label="New Pin"
                  placeholder="Enter your new PIN"
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <PasswordField
                  name="confirmPin"
                  label="Confirm Pin"
                  placeholder="Confirm your new PIN"
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
              <PrimaryButton
                disabled={!isValid || isPending}
                style={{ marginTop: "auto" }}
                onPress={() => handleSubmit()}
                label="Save Changes"
              />
            </View>
          </AuthLayout>
        )}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    minHeight: "90%",
  },
  inputFields: {
    // marginTop: 48,
    gap: 25,
    flex: 1,
  },
});

export default ChangePinPage;
