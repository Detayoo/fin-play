import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Formik } from "formik";

import { Key } from "../assets";
import { Colors } from "../constants";
import { copyToClipboard } from "../utils";
import { AppText } from "./AppText";
import { ReusableBottomSheet } from "./BottomSheetModal";
import { PrimaryButton } from "./PrimaryButton";
import { TextField } from "./TextField";

export const TwoFASetup = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
}) => {
  const [stage, setStage] = useState(1);
  return (
    <ReusableBottomSheet
      snapPoints={["75%"]}
      visible={showModal}
      onClose={() => {
        setShowModal(false);
        setStage(1);
      }}
    >
      <AppText
        style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}
        variant="medium"
      >
        Setup Key
      </AppText>
      {stage === 1 ? (
        <View
          style={{
            backgroundColor: "#90AD040D",
            marginTop: 30,
            paddingHorizontal: 24,
            paddingVertical: 24,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.inputBorder,
            borderRadius: 5,
          }}
        >
          <Key />
          <AppText variant="medium" style={{ marginTop: 26 }}>
            AXBESF85FGWUEUR84628SHDS
          </AppText>
          <PrimaryButton
            onPress={() => {
              copyToClipboard("AXBESF85FGWUEUR84628SHDS");

              setTimeout(() => {
                setStage(2);
              }, 1000);
            }}
            style={{
              marginTop: 14,
              height: 40,
            }}
            label="Copy Setup Key"
          />
        </View>
      ) : (
        <View style={{ flex: 1, height: 500 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <Formik initialValues={{ otp: "" }} onSubmit={() => {}}>
              {({
                handleSubmit,
                values,
                errors,
                handleBlur,
                handleChange,
                touched,
              }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      paddingVertical: 40,
                    }}
                  >
                    <TextField
                      onChange={handleChange("otp")}
                      onBlur={handleBlur("otp")}
                      value={values.otp}
                      placeholder="Enter OTP"
                      errors={errors.otp}
                      touched={touched.otp}
                      label="Enter OTP"
                      maxLength={6}
                      keyboardType="number-pad"
                    />
                    <PrimaryButton
                      disabled={values?.otp.length !== 6}
                      label="Submit"
                    />
                  </View>
                );
              }}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      )}
    </ReusableBottomSheet>
  );
};
