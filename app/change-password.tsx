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
  const { token } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePasswordFn,
    onSuccess: (data) => {
      showToast("success", data?.message);
      setTimeout(() => {
        router.push("/security");
      }, 1000);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });
  const handleSubmit = async (values: ChangePasswordPayloadType) => {
    const { confirmPassword, newPassword, oldPassword } = values;
    try {
      await mutateAsync({
        oldPassword,
        newPassword,
        token,
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
    minHeight: "100%",
  },
  inputFields: {
    // marginTop: 48,
    gap: 25,
    flex: 1,
  },
  termsContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  biometricContainer: {
    alignItems: "center",
    marginTop: 45,
  },
});

export default ChangePasswordPage;
