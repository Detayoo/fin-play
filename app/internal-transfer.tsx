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
} from "@/components";
import { Colors } from "@/constants";

type FormField = {
  accountNumber: string;
  amount: string;
  narration: string;
  accountName: string;
};

const InternalTransfer = () => {
  const initialValues = {
    accountNumber: "",
    amount: "",
    narration: "",
    accountName: "ADEDIGBA PETER ADETAYO LOMOH LATILE",
  };

  const onSubmit = (values: FormField) => {
    router.push({
      pathname: "/payment-summary",
      params: values,
    });
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
            setFieldValue,
          }) => {
            console.log(values);
            return (
              <View style={{ marginTop: 20 }}>
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
                      <AppText variant="medium">{values.accountName}</AppText>
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
