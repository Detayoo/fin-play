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
import { ERRORS, changePasswordSchema, extractServerError } from "@/utils";
import { ChangePasswordPayloadType } from "@/types";
import { changePasswordFn } from "@/services";
import { useAuth } from "@/context";

const ChangePasswordPage = () => {
  const { token, user, saveUser } = useAuth();
  const [password, setPassword] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePasswordFn,
    onSuccess: (data) => {
      showToast("success", data?.message);
      saveUser({ ...user, password }, token); // save user's new password after password change
      setTimeout(() => {
        router.replace("/(tabs)/profile");
      }, 1000);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });
  const handleSubmit = async (values: ChangePasswordPayloadType) => {
    const { confirmPassword, newPassword, oldPassword } = values;
    setPassword(newPassword);
    try {
      await mutateAsync({
        oldPassword,
        newPassword,
        token,
        confirmPassword,
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <AuthLayout showStep={false} headerText="Change Password">
            <View style={styles.container}>
              <View style={styles.inputFields}>
                <PasswordField
                  name="oldPassword"
                  label="Old Password"
                  placeholder="Enter your old password"
                />
                <PasswordField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your new password"
                />
                <PasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />
              </View>
              <PrimaryButton
                disabled={!isValid || isPending}
                style={{}}
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
    // justifyContent: "space-between",
    // alignItems:'center',
    minHeight: "90%",
  },
  inputFields: {
    // marginTop: 48,
    gap: 25,
    flex: 1,
    // backgroundColor: "blue",
    // minHeight: "80%",
    // marginBottom: 100,
  },
  termsContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});

export default ChangePasswordPage;
