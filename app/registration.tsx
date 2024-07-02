import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
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
import { registrationSchema } from "@/utils";
import { RegistrationType } from "@/types";

const RegistrationPage = () => {
  const [terms, setTerms] = useState(false);
  const handleSubmit = (values: RegistrationType) => {
    console.log("got here");
    console.log(values);

    router.push({
      pathname: "/account-verification",
      params: {
        email: values?.email,
      },
    });
  };

  useEffect(() => {
    showToast("success", "Login successful", "Welcome back!");
  }, []);
  return (
    <Screen>
      <Formik
        enableReinitialize
        initialValues={{ email: "", password: "", fullName: "", terms }}
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
        }) => (
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
                <PasswordField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />

                <View style={styles.termsContainer}>
                  <Checkbox onChange={() => setTerms(!terms)} checked={terms} />
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
        )}
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
