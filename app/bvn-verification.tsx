import { useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

import { AppText, TextField, AuthLayout, PrimaryButton } from "@/components";
import { Colors, fonts } from "@/constants";
import { QuestionMark } from "@/assets";

export const AccountVerificationPage = () => {
  const [date, setDate] = useState(new Date());

  const initialValues = {
    bvn: "",
    dateOfBirth: new Date(),
  };

  const validationSchema = Yup.object({
    bvn: Yup.string().min(11).max(11).required("BVN is required"),
  });

  const onSubmit = async (
    values: { bvn: string; dateOfBirth: Date },
    { resetForm }: any
  ) => {};

  return (
    <AuthLayout currentStep={2}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          values,
          errors,
          handleBlur,
          handleChange,
          touched,
        }) => (
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.contentContainer}>
                <AppText style={styles.heading}>
                  Bank Verification Number
                </AppText>
                <AppText
                  color={Colors.faintBlack}
                  style={styles.welcomeMessage}
                >
                  Almost done champ
                </AppText>
                <View style={styles.inputContainer}>
                  <View style={{ gap: 0 }}>
                    <TextField
                      value={values.bvn}
                      touched={touched.bvn}
                      errors={errors.bvn}
                      onBlur={() => handleBlur("bvn")}
                      onChange={() => handleChange("bvn")}
                      label="BVN"
                      placeholder="Enter your BVN"
                      keyboardType="number-pad"
                      maxLength={11}
                    />
                    <Pressable style={styles.bvnReason}>
                      <AppText
                        style={styles.bvnReasonText}
                        color={Colors.faintBlack}
                        size="small"
                      >
                        Why we need your BVN?
                      </AppText>
                      <QuestionMark />
                    </Pressable>
                  </View>
                  <View>
                    <AppText
                      style={styles.verifyText}
                      variant="medium"
                      color={Colors.black}
                    >
                      Verify your BVN with your Date of Birth
                    </AppText>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                label="Continue"
                disabled={!date || values?.bvn?.length !== 11}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: "100%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
  },
  heading: {
    fontSize: 20,
    fontFamily: fonts["satoshi-medium"],
  },
  welcomeMessage: {
    fontSize: 16,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 30,
  },
  bvnReason: {
    flexDirection: "row",
    columnGap: 5,
  },
  bvnReasonText: {
    fontSize: 14,
    fontFamily: fonts["satoshi-medium"],
  },
  verifyText: {
    fontSize: 15,
    fontFamily: fonts["satoshi-medium"],
    marginTop: 25,
  },
  buttonContainer: {
    paddingVertical: 20,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default AccountVerificationPage;
