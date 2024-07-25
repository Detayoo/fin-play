import { useState } from "react";
import { Pressable, View, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";

import {
  AppText,
  TextField,
  AuthLayout,
  PrimaryButton,
  Screen,
  DateComponent,
  showToast,
} from "@/components";
import { Colors, fonts } from "@/constants";
import { QuestionMark } from "@/assets";
import { verifyBVNFn } from "@/services";
import { ERRORS, extractServerError } from "@/utils";
import { useAuth } from "@/context";

export const AccountVerificationPage = () => {
  const { token, user } = useAuth();
  const [showDate, setShowDate] = useState(false);

  const initialValues = {
    bvn: "",
    dob: new Date(),
  };

  const validationSchema = Yup.object({
    bvn: Yup.string().min(11).max(11).required("BVN is required"),
    dob: Yup.string().required(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verifyBVNFn,
    onSuccess: (data) => {
      showToast(
        "success",
        extractServerError(data?.message, "BVN successfully linked")
      );

      router.push("/set-transaction-pin"); // todo: this is subject to change
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const onSubmit = async (
    values: { bvn: string; dob: Date },
    { resetForm }: any
  ) => {
    const formattedDate = format(values?.dob, "dd-MM-yyyy"); //change to yyyy-MM-dd dd-MM-yyyy
    const payload = { bvn: values.bvn, dob: formattedDate, token };

    try {
      await mutateAsync(payload);
      resetForm();
    } catch (error) {}
  };

  return (
    <Screen>
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
            setFieldValue,
            isValid,
          }) => {
            return (
              <View style={styles.container}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
                >
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
                          onChange={handleChange("bvn")}
                          onBlur={handleBlur("bvn")}
                          value={values.bvn}
                          placeholder="Enter your BVN"
                          errors={errors.bvn}
                          touched={touched.bvn}
                          label="BVN"
                          maxLength={11}
                          keyboardType="number-pad"
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

                        <DateComponent
                          date={values?.dob}
                          open={showDate}
                          onOpen={() => setShowDate(true)}
                          onClose={() => setShowDate(false)}
                          handleAction={(date) => {
                            setFieldValue("dob", date);
                          }}
                          dateFormat="yyyy"
                        />
                      </View>
                    </View>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton
                        style={{ marginTop: 100 }}
                        label="Continue"
                        disabled={
                          values?.bvn?.length !== 11 || !isValid || isPending
                        }
                        onPress={() => handleSubmit()}
                      />
                      <PrimaryButton
                        variant="outline"
                        style={{ marginTop: 5 }}
                        label="Skip for now"
                        onPress={() =>
                          router.push(
                            !user?.pinSet ? "/set-transaction-pin" : "/(tabs)"
                          )
                        }
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            );
          }}
        </Formik>
      </AuthLayout>
    </Screen>
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
    paddingBottom: 100,
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
    marginBottom: 10,
  },
  buttonContainer: {
    // paddingBottom: 20,
    backgroundColor: "white",
    // position: "absolute",
    // bottom: 120,
    width: "100%",
  },
});

export default AccountVerificationPage;
