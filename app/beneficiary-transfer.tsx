import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { ScrollView, View } from "react-native";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  TextField,
} from "@/components";
import { PaymentRecipient } from "@/assets";
import { Colors } from "@/constants";

const BeneficiaryTransfer = () => {
  const { accountName, accountNumber, bankName } = useLocalSearchParams();
  const initialValues = {
    amount: "",
    narration: "",
  };
  const onSubmit = (values: { amount: string; narration: string }) => {
    router.push({
      pathname: "/payment-summary",
      params: {
        amount: values.amount,
        narration: values.narration,
        accountNumber,
        accountName,
      },
    });
  };

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
        <AppText size="xlarge" variant="medium">
          {bankName ? "Transfer to Bank" : "Transfer to Uzzy Account"}
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingTop: 30,
        }}
      >
        <PaymentRecipient />

        <AppText style={{ marginTop: 13 }} variant="medium" size="xlarge">
          {accountName}
        </AppText>
        <AppText style={{ marginTop: 10, fontSize: 13 }}>
          {accountNumber}
        </AppText>
        <View
          style={{
            marginTop: 30,
            backgroundColor: Colors.lightGreen,
            borderRadius: 100,
            width: "80%",
            paddingVertical: 7,
          }}
        >
          <AppText
            style={{
              textAlign: "center",
            }}
          >
            Zero charges, Instant payment, Fast
          </AppText>
        </View>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            handleSubmit,
            values,
            errors,
            handleBlur,
            handleChange,
            touched,
          }) => {
            console.log(values);
            return (
              <View
                style={{
                  width: "100%",
                  marginTop: 40,
                  flex: 1,
                }}
              >
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
                <PrimaryButton
                  onPress={() => handleSubmit()}
                  label="Next"
                  style={{ marginTop: 80 }}
                />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </Screen>
  );
};

export default BeneficiaryTransfer;
