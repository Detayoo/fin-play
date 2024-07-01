import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { router } from "expo-router";

import { TextField, AuthLayout, AppText, PrimaryButton } from "@/components";
import { Colors } from "@/constants";
import { forgotPasswordSchema } from "@/utils";

const ForgotPasswordPage = () => {
  const handleSubmit = (values: { email: string }) => {
    console.log("got here");
    console.log(values);
    router.push("/reset-password");
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordSchema}
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
              Forgot Password
            </AppText>
            <AppText
              color={Colors.faintBlack}
              style={{
                marginTop: 16,
              }}
            >
              Enter your email address and we'll send you a 6-digit code to
              reset your password.
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

              <PrimaryButton
                style={{ marginTop: 70 }}
                onPress={() => handleSubmit()}
                label="Submit"
              />
            </View>
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
    marginTop: 40,
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

export default ForgotPasswordPage;
