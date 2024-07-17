import { useEffect, useState } from "react";
import { Formik } from "formik";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";

import { Empty, Recipient } from "@/assets";
import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  TextField,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { resolveInternalTransferFn } from "@/services";
import { ERRORS, extractServerError } from "@/utils";
import { useAuth } from "@/context";
import { isValid } from "date-fns";

type FormField = {
  accountNumber: string;
  amount: string;
  narration: string;
  accountName: string;
};

const InternalTransfer = () => {
  const { token } = useAuth();
  const [state, setState] = useState({
    accountName: "",
    accountNumber: "",
  });

  const updateState = (
    payload: Partial<{ accountName: string; accountNumber: string }>
  ) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resolveInternalTransferFn,
    onSuccess: (data) => {
      updateState({
        accountName: data?.data?.accountName,
      });
    },

    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
      updateState({
        accountName: "",
      });
    },
  });

  const handleAccountNumberChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    updateState({
      accountNumber: value,
    });
    setFieldValue("accountNumber", value);
  };

  const handleResolution = async () => {
    try {
      await mutateAsync({
        payload: {
          accountNumber: state.accountNumber,
        },
        token,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (state.accountNumber.length === 10) {
      handleResolution();
      updateState({
        accountName: "Tayo ADE",
      });
    }
  }, [state.accountNumber]);

  const initialValues = {
    accountNumber: "",
    amount: "",
    narration: "",
    accountName: "",
  };

  const onSubmit = async (values: FormField) => {
    try {
      router.push({
        pathname: "/payment-summary",
        params: {
          accountName: state.accountName,
          accountNumber: values.accountNumber,
          amount: values.amount,
          narration: values.narration,
          from: "/internal-transfer",
        },
      });
    } catch (error) {}
  };

  return (
    <Screen>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={{ marginTop: 20 }} size="xxlarge" variant="medium">
          Send Money to Uzzy app user
        </AppText>
        <AppText style={{ marginTop: 10 }} color={Colors.faintBlack}>
          With just their account number, send money to any Uzzy app users.
        </AppText>

        <AppText style={{ marginTop: 30 }} variant="medium" size="large">
          Recipient Account
        </AppText>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          //   validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            values,
            errors,
            handleBlur,
            handleChange,
            touched,
            isValid,
            setFieldValue,
          }) => {
            console.log(values);
            return (
              <View style={{ marginTop: 20 }}>
                <TextField
                  onChange={(value: string) =>
                    handleAccountNumberChange(value, setFieldValue)
                  }
                  onBlur={handleBlur("accountNumber")}
                  value={values.accountNumber}
                  placeholder="Enter recipient's account number"
                  errors={errors.accountNumber}
                  touched={touched.accountNumber}
                  label="Account Number"
                  maxLength={10}
                  keyboardType="number-pad"
                  hasBalance
                />
                {values.accountNumber.length === 10 && state.accountName && (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        marginBottom: 20,
                        alignItems: "center",
                      }}
                    >
                      <Recipient />
                      <AppText variant="medium">{state.accountName}</AppText>
                    </View>
                    <TextField
                      onChange={handleChange("amount")}
                      onBlur={handleBlur("amount")}
                      value={values.amount}
                      placeholder="Enter amount"
                      errors={errors.amount}
                      touched={touched.amount}
                      label="Amount"
                      keyboardType="number-pad"
                    />
                    <TextField
                      onChange={handleChange("narration")}
                      onBlur={handleBlur("narration")}
                      value={values.narration}
                      placeholder="Add a note"
                      errors={errors.narration}
                      touched={touched.narration}
                      label="Narration"
                    />
                  </>
                )}

                <PrimaryButton
                  disabled={!isValid || !state.accountName}
                  onPress={() => handleSubmit()}
                  label="Next"
                  style={{ marginTop: 40 }}
                />
              </View>
            );
          }}
        </Formik>
        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppText style={{ fontSize: 15 }} variant="medium">
              Beneficiaries
            </AppText>
            <AppText
              onPress={() => router.push("/beneficiaries")}
              style={{ fontSize: 15 }}
              color={Colors.inputFocusBorder}
            >
              View all
            </AppText>
          </View>
          <View
            style={{
              paddingVertical: 50,
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <Empty />
            <AppText variant="medium">No beneficiaries found</AppText>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default InternalTransfer;
