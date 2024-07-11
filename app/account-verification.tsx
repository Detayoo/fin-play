import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Colors, fonts } from "@/constants";
import { AppText, AuthLayout, OtpField, Screen, showToast } from "@/components";
import { useCountdown } from "@/hooks";
import { ERRORS, extractServerError, maskEmail } from "@/utils";
import {
  forgotPasswordFn,
  resendOTPFn,
  verifyAccountFn,
  verifyForgotPasswordOTPFn,
} from "@/services";
import { useAuth } from "@/context";

const AccountVerificationPage = () => {
  const { token, saveUser } = useAuth();
  const { email, from } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const OTP_TIME = 60;
  const [seconds, setSeconds] = useState(OTP_TIME);
  const { minutes, remainingSeconds } = useCountdown(seconds, setSeconds);

  useEffect(() => {
    if (otp.length === 6 && from !== "/forgot-password") {
      handleVerification();
      setSeconds(OTP_TIME);
      return;
    }

    if (otp.length === 6 && from === "/forgot-password") {
      handleForgotPasswordOtpVerification();
      setSeconds(OTP_TIME);
    }
  }, [otp]);

  const { data } = useQuery({
    queryKey: ["resend otp"],
    queryFn: () => resendOTPFn({ token }),
    enabled: from === "/login",
  });

  const { mutateAsync: verifyAsync, isPending: isVerifying } = useMutation({
    mutationFn: verifyAccountFn,
    onSuccess: () => {
      if (from === "/registration" || from === "/login") {
        router.replace("/bvn-verification");
        setOtp("");
        return;
      }
    },
    onError: (error) => {
      showToast(
        "error",
        extractServerError(error, ERRORS.FAILED_ACCOUNT_VERIFICATION)
      );
    },
  });

  const { mutateAsync: resendAsync, isPending: isResending } = useMutation({
    mutationFn: resendOTPFn,
    onSuccess: () => {
      setSeconds(OTP_TIME);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const { mutateAsync: verifyForgotFlowAsync } = useMutation({
    mutationFn: verifyForgotPasswordOTPFn,
    onSuccess: (data) => {
      saveUser(null, data?.data?.token);
      router.push("/reset-password");
    },
    onError: (error) => {
      showToast(
        "error",
        extractServerError(error, ERRORS.FAILED_ACCOUNT_VERIFICATION)
      );
    },
  });

  const {
    isPending: isResendingForgotPasswordOTP,
    mutateAsync: mutateForgotAsync,
  } = useMutation({
    mutationFn: forgotPasswordFn,
    onSuccess: (data) => {
      showToast("success", data.message);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  //while trying to reset password
  const handleForgotPasswordOtpVerification = async () => {
    try {
      await verifyForgotFlowAsync({
        otp,
        email,
      });
    } catch (error) {}
  };
  const handleVerification = async () => {
    try {
      await verifyAsync({
        otp,
        token,
      });
    } catch (error) {}
  };

  //send or resend an otp

  const handleResendResetOtp = async () => {
    try {
      await mutateForgotAsync({
        email,
      });
    } catch (error) {}
  };
  const handleResendOtp = async () => {
    try {
      await resendAsync({
        token,
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <AuthLayout showStep={false}>
        <View style={styles.container}>
          <AppText color={Colors.black} style={styles.heading}>
            Verify your account
          </AppText>
          <AppText color={Colors.faintBlack} style={styles.otpSent}>
            A 6-digit OTP was sent to{" "}
            <AppText style={styles.email}>{maskEmail(email)}</AppText>
          </AppText>
          <AppText style={{ fontSize: 14 }} color={Colors.faintBlack}>
            Input the code below;
          </AppText>
          <OtpField code={otp} setCode={setOtp} count={6} />
          {!(minutes === 0 && remainingSeconds === 0) ? (
            <AppText style={styles.expiry} color={Colors.black}>
              Code expires in:{" "}
              <AppText
                color={Colors.inputFocusBorder}
                style={styles.expiryTime}
              >
                {minutes?.toString()?.length !== 1 ? minutes : `0${minutes}`}:
                {remainingSeconds?.toString()?.length !== 1
                  ? remainingSeconds
                  : `0${remainingSeconds}`}
              </AppText>
            </AppText>
          ) : (
            <AppText style={styles.expiry} color={Colors.black}>
              Didn&apos;t receive the code:{" "}
              <AppText
                onPress={
                  from === "/forgot-password"
                    ? handleResendResetOtp
                    : handleResendOtp
                }
                style={styles.resendCode}
                color={Colors.inputFocusBorder}
              >
                {isResending || isResendingForgotPasswordOTP
                  ? "Resending"
                  : "Resend Code"}
              </AppText>
            </AppText>
          )}
        </View>
      </AuthLayout>
    </Screen>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
    paddingBottom: 40,
  },
  heading: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: fonts["satoshi-medium"],
  },
  otpSent: {
    marginTop: 15,
    fontSize: 14,
  },
  email: {
    fontFamily: fonts["satoshi-medium"],
    color: Colors.black,
  },

  otpInput: {
    marginTop: 40,
    margin: 0,
    padding: 0,
    flexDirection: "row",
  },

  codeInputFieldStyle: {
    borderWidth: 1,
    borderColor: "#B9D6CC",
    height: 50,
    width: 50,
    borderRadius: 5,
  },

  expiry: {
    marginTop: 20,
    fontSize: 14,
  },

  expiryTime: {
    fontFamily: fonts["satoshi-medium"],
  },

  resendCode: {
    fontFamily: fonts["satoshi-medium"],
  },
});

export default AccountVerificationPage;
