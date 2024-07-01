import { TextField, ToastComponent, showToast } from "@/components";
import { Formik } from "formik";
import { useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegistrationPage = () => {
  const handleSubmit = () => {
    console.log("got here");
  };

  useEffect(() => {
    showToast("success", "Login successful", "Welcome back!");
  }, []);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
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
        <View style={styles.container}>
          <TextField
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Enter your email"
            errors={errors.email}
            touched={touched.email}
          />
          <TextField
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Enter your password"
            errors={errors.password}
            touched={touched.password}
          />
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default RegistrationPage;
