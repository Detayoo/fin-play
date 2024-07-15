import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { useMutation } from "@tanstack/react-query";

import {
  TextField,
  AuthLayout,
  AppText,
  PasswordField,
  Checkbox,
  PrimaryButton,
  Screen,
  showToast,
  Loading,
} from "@/components";
import { Colors } from "@/constants";
import { extractServerError, loginSchema, storeToken } from "@/utils";
import { LoginType } from "@/types";
import { FaceId, Fingerprint } from "@/assets";
import { useBiometrics } from "@/hooks";
import { loginFn } from "@/services";
import { useAuth } from "@/context";

const LoginPage = () => {
  const { saveUser, user, logout, isLoading, biometrics, saveBiometrics } =
    useAuth();
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [isUsingBiometrics, setIsUsingBiometrics] = useState(false);
  const [rememberMe, setRememberMe] = useState(user?.rememberMe);

  const clearStorageOfToken = async () => {
    await storeToken("");
  };

  useEffect(() => {
    clearStorageOfToken(); //clear out token for anytime i come to the login page
  }, []);

  const { isBiometricSupported, isBiometricType } = useBiometrics();

  const promptOptions = {
    promptMessage: "Login with Biometrics",
  };

  const loginWithBiometric = async () => {
    setIsUsingBiometrics(true);
    try {
      const authentication = await LocalAuthentication.authenticateAsync(
        promptOptions
      );

      if (authentication.success) {
        handleSubmit({ email: user?.email, password: user?.password });
      }
    } catch (error) {
    } finally {
      setIsUsingBiometrics(false);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      saveUser(
        { ...data.data.metadata?.profile, password, rememberMe },
        data.data.data.token
      );
      if (!data.data.metadata.profile.verified) {
        showToast("error", "Please verify your account to continue");
        storeToken(data.data.data.token);
        router.push({
          pathname: "/account-verification",
          params: {
            email,
            from: "/login",
          },
        });
        return;
      }

      if (!data.data.metadata.profile.bvnVerified) {
        showToast("error", "Please link your BVN to continue");
        router.push("/bvn-verification");
        return;
      }

      if (!data?.data?.metadata?.wallet.pinSet) {
        router.push("/set-transaction-pin");
        return;
      }

      router.push("/(tabs)");
    },
    onError: (error) => {
      showToast(
        "error",
        extractServerError(error, "Something happened, please try again")
      );
    },
  });
  const handleSubmit = async (values: LoginType) => {
    const { email, password } = values;
    setEmail(email);
    setPassword(password);

    // saveUser({}, "toks");
    // router.push("/(tabs)");

    // return;

    try {
      await mutateAsync({
        email,
        password: user?.rememberMe ? user?.password : values.password,
      });
    } catch (error) {}

    return;
  };

  const switchAccount = () => {
    saveUser(null, "");
    logout();
    saveBiometrics(false);
  };

  const renderBiometric = () => {
    if (isBiometricType === 1) {
      return <Fingerprint />;
    }

    if (isBiometricType === 2) {
      return <FaceId />;
    }

    return null;
  };

  if (isLoading) return <Loading />;

  return (
    <Screen>
      <Formik
        enableReinitialize={!!user?.rememberMe}
        initialValues={{
          email: user?.email && user?.rememberMe ? user?.email : "",
          password: "",
        }}
        // validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          return (
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
                    disabled={!!user?.rememberMe}
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
                    disabled={isPending || isUsingBiometrics}
                    style={{ marginTop: 60 }}
                    onPress={() => handleSubmit()}
                    label="Login"
                  />
                  {/* <PrimaryButton
                    disabled={isPending}
                    style={{ marginTop: 60 }}
                    onPress={() => saveBiometrics(!biometrics)}
                    label="Toggle"
                  /> */}
                </View>
                {user?.rememberMe ? (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      backgroundColor: Colors.white,
                      marginTop: 25,
                    }}
                  >
                    <AppText variant="medium">Not {user?.email}?</AppText>
                    <AppText
                      onPress={switchAccount}
                      variant="medium"
                      color={Colors.inputFocusBorder}
                    >
                      Switch Account
                    </AppText>
                  </View>
                ) : (
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
                )}

                {!!isBiometricSupported && biometrics && (
                  <Pressable
                    onPress={loginWithBiometric}
                    style={styles.biometricContainer}
                  >
                    {renderBiometric()}
                  </Pressable>
                )}
              </View>
            </AuthLayout>
          );
        }}
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
