import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Formik } from "formik";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Key } from "../assets";
import { Colors } from "../constants";
import { ERRORS, copyToClipboard, extractServerError } from "../utils";
import {
  AppText,
  ReusableBottomSheet,
  TextField,
  PrimaryButton,
  showToast,
} from "@/components";
import { setTwoFAFn } from "@/services";
import { useAuth } from "@/context";
import { IUserProfile, Notifications } from "@/types";

export const TwoFASetup = ({
  showModal,
  setShowModal,
  secretKey,
  stage,
  setStage,
  state,
  updateState,
  userData,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  secretKey?: string;
  stage: number;
  setStage: (state: number) => void;
  state: Notifications;
  updateState: any;
  userData?: IUserProfile;
}) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: setTwoFAFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["2fa status"],
      });
      setShowModal(false);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const onSubmit = async (values: { otp: string }) => {
    const { otp } = values;
    try {
      await mutateAsync({
        toggle: !state["2fa"],
        token,
        otp,
      });
    } catch (error) {}
  };

  return (
    <ReusableBottomSheet
      snapPoints={["100%"]}
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
            {secretKey}
          </AppText>
          <PrimaryButton
            onPress={() => {
              copyToClipboard(secretKey);

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
            <Formik initialValues={{ otp: "" }} onSubmit={onSubmit}>
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
                      onPress={() => handleSubmit()}
                      disabled={values?.otp.length !== 6 || isPending}
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
