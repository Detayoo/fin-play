import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import { isValid } from "date-fns";
import { useMutation } from "@tanstack/react-query";

import {
  AuthLayout,
  AppText,
  PasswordField,
  PrimaryButton,
  Screen,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { ERRORS, extractServerError, resetPasswordSchema } from "@/utils";
import { ResetPasswordPayloadType } from "@/types";
import { resetPasswordFn } from "@/services";
import { useAuth } from "@/context";

const ResetPasswordPage = () => {
  const { token } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPasswordFn,
    onSuccess: (data) => {
      showToast("success", data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });
  const handleSubmit = async (values: ResetPasswordPayloadType) => {
    const { confirmPassword, newPassword } = values;
    try {
      await mutateAsync({
        confirmPassword,
        password: newPassword,
        token,
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <AuthLayout showStep={false}>
            <View style={styles.container}>
              <AppText
                color={Colors.black}
                variant="medium"
                style={{
                  fontSize: 20,
                  width: "90%",
                }}
              >
                Reset Password
              </AppText>
              <AppText
                color={Colors.faintBlack}
                style={{
                  marginTop: 16,
                }}
              >
                Kindly enter your new password for your uzzy account
              </AppText>
              <View style={styles.inputFields}>
                <PasswordField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your password"
                />
                <PasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />

                <PrimaryButton
                  disabled={!isValid || isPending}
                  style={{ marginTop: 100 }}
                  onPress={() => handleSubmit()}
                  label="Submit"
                />
              </View>
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
    paddingVertical: 19,
    backgroundColor: Colors.white,
  },
  inputFields: {
    marginTop: 48,
    gap: 25,
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

export default ResetPasswordPage;
