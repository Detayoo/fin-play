import { useEffect, useState } from "react";
import { Formik } from "formik";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Empty, Recipient } from "@/assets";
import {
  AmountField,
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  SelectField,
  SelectPlaceholder,
  TextField,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { resolveTransferToBankFn } from "@/services";
import { ERRORS, extractServerError } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context";

type FormField = {
  accountNumber: string;
  amount: string;
  narration: string;
  accountName: string;
};

interface Option {
  id: number;
  label: string;
  code: string;
}

const options: Option[] = [
  { id: 1, label: "GTBank", code: "1234" },
  { id: 2, label: "Option 2", code: "1234" },
  { id: 3, label: "Option 3", code: "1234" },
];

const beneficiaries = [
  {
    accountNumber: "08169971162",
    accountName: "Adetayo Lomoh",
    bankName: "United Bank For Africa",
  },
  {
    accountNumber: "08160071162",
    accountName: "Adetayo Cider",
    bankName: "GT Bank",
  },
  {
    accountNumber: "08160071162",
    accountName: "Adetayo Cider",
    bankName: "GT Bank",
  },
];

const BankTransfer = () => {
  const { token } = useAuth();
  const [list, setList] = useState(beneficiaries);
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Option | null>(null);
  const initialValues = {
    accountNumber: "",
    amount: "",
    narration: "",
    accountName: "",
  };

  const [state, setState] = useState({
    accountName: "",
    accountNumber: "",
    selectedBankCode: "",
  });

  const updateState = (
    payload: Partial<{
      accountName: string;
      accountNumber: string;
      selectedBankCode: string;
    }>
  ) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resolveTransferToBankFn,
    onSuccess: (data) => {
      updateState({
        accountName: data?.data?.accountName,
      });
    },

    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
      // updateState({
      //   accountName: "",
      // });
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

  console.log("seelctdna", selectedBank);

  const handleResolution = async () => {
    try {
      await mutateAsync({
        payload: {
          accountNumber: state.accountNumber,
          bankCode: selectedBank?.code,
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

  console.log(state, "state");

  const onSubmit = async (values: FormField) => {
    try {
      router.push({
        pathname: "/payment-summary",
        params: {
          accountName: state.accountName,
          accountNumber: values.accountNumber,
          amount: values.amount,
          narration: values.narration,
          from: "/bank-transfer",
          bankCode: selectedBank?.code,
          bankName: selectedBank?.label,
        },
      });
    } catch (error) {}
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <Screen>
            <BackButton />
            <ScrollView showsVerticalScrollIndicator={false}>
              <AppText
                style={{ marginTop: 20 }}
                size="xxlarge"
                variant="medium"
              >
                Send Money to other banks
              </AppText>
              <AppText style={{ marginTop: 10 }} color={Colors.faintBlack}>
                Send money to your desired destination bank account number
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
                  setFieldValue,
                  isValid,
                }) => {
                  return (
                    <View style={{ marginTop: 20 }}>
                      <View style={{ gap: 20 }}>
                        <SelectPlaceholder
                          label={selectedBank && selectedBank?.label}
                          onSelect={() => setShowModal(true)}
                          title="Bank Name"
                        />
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
                      </View>
                      {values.accountNumber.length === 10 &&
                        state.accountName && (
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
                              <AppText variant="medium">
                                {state.accountName}
                              </AppText>
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
                    paddingVertical: list?.length ? 20 : 50,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  {list?.map(
                    ({ accountNumber, accountName, bankName }, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            router.push({
                              pathname: "/beneficiary-transfer",
                              params: {
                                accountNumber,
                                accountName,
                                bankName,
                                from: "/bank-transfer",
                                bankCode: "", //todo: add bank code here
                              },
                            })
                          }
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: Colors.lightGreen,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              height: 45,
                              width: 45,
                            }}
                          >
                            <AppText size="xxlarge" variant="medium">
                              A
                            </AppText>
                          </View>

                          <View style={{ marginLeft: 10 }}>
                            <AppText variant="medium">{accountName}</AppText>
                            <AppText size="small" style={{ marginTop: 2 }}>
                              {bankName} | {""}
                              {accountNumber}
                            </AppText>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  )}
                </View>
              </View>
            </ScrollView>
          </Screen>

          <SelectField
            options={options}
            visible={showModal}
            setVisible={setShowModal}
            setSelectedOption={setSelectedBank}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BankTransfer;
