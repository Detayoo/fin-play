import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";

import {
  AuthLayout,
  AppText,
  PasswordField,
  PrimaryButton,
  Screen,
} from "@/components";
import { Colors } from "@/constants";
import { resetPasswordSchema } from "@/utils";
import { LoginType } from "@/types";

const ResetPasswordPage = () => {
  const handleSubmit = (values: LoginType) => {
    console.log("got here");
    console.log(values);
    router.push("/login");
  };

  return (
    <Screen>
      <Formik
        enableReinitialize
        initialValues={{ email: "", password: "" }}
        // validationSchema={resetPasswordSchema}
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
                  name="password"
                  label="New Password"
                  placeholder="Enter your password"
                />
                <PasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />

                <PrimaryButton
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
