import { Formik } from "formik";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

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
} from "@/components";
import { Colors } from "@/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useState } from "react";

type FormField = {
  accountNumber: string;
  amount: string;
  narration: string;
  accountName: string;
};

interface Option {
  id: number;
  label: string;
}

const options: Option[] = [
  //   { id: 1, label: "" },
  { id: 1, label: "GTBank" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
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
  const [list, setList] = useState(beneficiaries);
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Option | null>(null);
  const initialValues = {
    accountNumber: "",
    amount: "",
    narration: "",
    accountName: "ADEDIGBA PETER ADETAYO LOMOH LATILE",
  };

  const onSubmit = (values: FormField) => {
    router.push({
      pathname: "/payment-summary",
      params: { ...values, bankName: "GTBank" },
    });
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
                          onChange={handleChange("accountNumber")}
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
                      {values.accountNumber.length === 10 && (
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
                              {values.accountName}
                            </AppText>
                          </View>
                          <AmountField
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
