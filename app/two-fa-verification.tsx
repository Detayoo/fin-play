import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import { isValid } from "date-fns";
import { useMutation } from "@tanstack/react-query";

import {
  AppText,
  AuthLayout,
  PasswordField,
  PrimaryButton,
  Screen,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { ERRORS, extractServerError, storeToken, twoFALoginSchema } from "@/utils";
import { validate2faOtpFn } from "@/services";
import { useAuth } from "@/context";

const TwoFAVerificationPage = () => {
  const { user, saveUser } = useAuth();
  const { loginToken } = useLocalSearchParams();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: validate2faOtpFn,
    onSuccess: (data) => {
      //   storeToken()

      //save token , then take the user to the dashboard

      router.replace("/(tabs)");
    },
    onError: (error) => {
      showToast(
        "error",
        extractServerError(error, ERRORS.FAILED_TWOFA_VERIFICATION)
      );
    },
  });
  const handleSubmit = async (values: { otp: string }) => {
    const { otp } = values;
    try {
      await mutateAsync({
        otp,
        loginToken,
        mode: "LOGIN",
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={twoFALoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values }) => (
          <AuthLayout showStep={false}>
            <AppText>
              Enter the code that was generated from your authenticator
            </AppText>
            <View style={styles.container}>
              <View style={styles.inputFields}>
                <PasswordField
                  name="otp"
                  label="Enter One-Time Code"
                  placeholder="Enter OTP"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
              <PrimaryButton
                disabled={!isValid || isPending || values.otp.length !== 6}
                style={{ marginTop: 60 }}
                onPress={() => handleSubmit()}
                label="Submit"
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

export default TwoFAVerificationPage;
