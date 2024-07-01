import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

import {
  TextField,
  AuthLayout,
  AppText,
  PasswordField,
  Checkbox,
  PrimaryButton,
} from "@/components";
import { Colors } from "@/constants";
import { loginSchema } from "@/utils";
import { LoginType } from "@/types";
import { FaceId, Fingerprint } from "@/assets";
import { useBiometrics } from "@/hooks";

const LoginPage = () => {
  const { isBiometricSupported, isBiometricType } = useBiometrics();
  const renderBiometric = () => {
    if (isBiometricType === 1) {
      return <Fingerprint />;
    }

    if (isBiometricType === 2) {
      return <FaceId />;
    }

    return null;
  };

  const promptOptions = {
    promptMessage: "Login with Biometrics",
  };

  const loginWithBiometric = async () => {
    try {
      const authentication = await LocalAuthentication.authenticateAsync(
        promptOptions
      );

      console.log(authentication);
    } catch (error) {
      console.log(error);
    }
  };
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = (values: LoginType) => {
    console.log("got here");
    console.log(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
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
              Welcome Back! Manage Your Finances with Ease.
            </AppText>
            <AppText
              color={Colors.faintBlack}
              style={{
                marginTop: 16,
              }}
            >
              Log in to your account and continue to stay on top of your
              financial goals seamlessly.
            </AppText>
            <View style={styles.inputFields}>
              <TextField
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Enter your email"
                errors={errors.email}
                touched={touched.email}
                label="Email"
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <View style={styles.termsContainer}>
                  <Checkbox
                    onChange={() => setRememberMe(!rememberMe)}
                    checked={rememberMe}
                  />
                  <AppText
                    size="small"
                    variant="medium"
                    color={Colors.faintBlack}
                  >
                    Remember me
                  </AppText>
                </View>

                <AppText
                  onPress={() => router.push("/forgot-password")}
                  size="small"
                  variant="medium"
                  color={Colors.primary}
                >
                  Forgot Password?
                </AppText>
              </View>
              <PrimaryButton
                style={{ marginTop: 60 }}
                onPress={() => handleSubmit()}
                label="Login"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
                backgroundColor: Colors.white,
                marginTop: 25,
              }}
            >
              <AppText variant="medium">Don't have an account?</AppText>
              <AppText
                onPress={() => router.push("/registration")}
                variant="medium"
                color={Colors.inputFocusBorder}
              >
                Create an account
              </AppText>
            </View>

            {!!isBiometricSupported && (
              <Pressable
                onPress={loginWithBiometric}
                style={styles.biometricContainer}
              >
                {renderBiometric()}
              </Pressable>
            )}
          </View>
        </AuthLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 19,
    backgroundColor: Colors.white,
  },
  inputFields: {
    marginTop: 52,
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

export default LoginPage;
