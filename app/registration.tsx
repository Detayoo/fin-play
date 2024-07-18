import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import {
  TextField,
  showToast,
  AuthLayout,
  AppText,
  PasswordField,
  Checkbox,
  PrimaryButton,
  Screen,
} from "@/components";
import { Colors } from "@/constants";
import { ERRORS, extractServerError, registrationSchema } from "@/utils";
import { RegistrationType } from "@/types";
import { registerFn } from "@/services";
import { useAuth } from "@/context";

const RegistrationPage = () => {
  const [password, setPassword] = useState("");
  const { saveUser } = useAuth();
  const [email, setEmail] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      saveUser({ ...data?.metadata?.profile, password }, data?.data?.token);
      router.push({
        pathname: "/account-verification",
        params: {
          email,
          from: "/registration",
        },
      });
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });
  const handleSubmit = async (values: RegistrationType, { resetForm }: any) => {
    const { email, fullName, password, phone } = values;
    setEmail(email);
    setPassword(password);
    try {
      await mutateAsync({
        email,
        password,
        fullName,
        phone
      
      });
      resetForm();
    } catch (error) {}
  };

  return (
    <Screen>
      <Formik
        initialValues={{ email: "", password: "", fullName: "", terms: false, phone:'' }}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isValid,
        }) => {
          return (
            <AuthLayout>
              <View style={styles.container}>
                <AppText
                  color={Colors.black}
                  variant="medium"
                  style={{
                    fontSize: 20,
                    width: "90%",
                  }}
                >
                  Join Us Today and Start Managing Your Finances Effortlessly!
                </AppText>
                <View style={styles.inputFields}>
                  <TextField
                    onChange={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    placeholder="Enter your full name"
                    errors={errors.fullName}
                    touched={touched.fullName}
                    label="Full Name"
                  />
                  <TextField
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Enter your email"
                    errors={errors.email}
                    touched={touched.email}
                    label="Email"
                  />
                  <TextField
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    placeholder="Enter your phone number"
                    errors={errors.phone}
                    touched={touched.phone}
                    label="Phone number"
                    maxLength={11}
                    keyboardType='number-pad'
                  />
                  <PasswordField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />

                  <View style={styles.termsContainer}>
                    <Checkbox
                      onChange={() => setFieldValue("terms", !values?.terms)}
                      checked={values?.terms}
                    />
                    <AppText
                      size="small"
                      variant="medium"
                      color={Colors.faintBlack}
                    >
                      By proceeding to create your account, you agree to Uzzy's{" "}
                      <AppText size="small" color={Colors.inputFocusBorder}>
                        Terms and Conditions
                      </AppText>{" "}
                      and{" "}
                      <AppText
                        size="small"
                        color={Colors.inputFocusBorder}
                        style={{ marginHorizontal: 5 }}
                      >
                        Privacy Policy
                      </AppText>
                    </AppText>
                  </View>
                  <PrimaryButton
                    disabled={isPending || !isValid}
                    style={{ marginTop: 47 }}
                    onPress={() => handleSubmit()}
                    label="Continue"
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
                  <AppText variant="medium">Already have an account?</AppText>
                  <AppText
                    onPress={() => router.push("/login")}
                    variant="medium"
                    color={Colors.inputFocusBorder}
                  >
                    Login
                  </AppText>
                </View>
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
    paddingVertical: 30,
    backgroundColor: Colors.white,
  },
  inputFields: {
    marginTop: 52,
  },
  termsContainer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
  },
});

export default RegistrationPage;
