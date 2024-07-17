import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  ListItem,
  ReusableBottomSheet,
  OtpField,
  SwitchComponent,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { PaymentRecipient } from "@/assets";
import { ERRORS, extractServerError, formatMoney } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { internalTransferFn } from "@/services";
import { useAuth } from "@/context";

const PaymentSummary = () => {
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [save, setSave] = useState(false);
  const [pin, setPin] = useState("");
  const { accountName, accountNumber, amount, narration, bankName, from } =
    useLocalSearchParams();
  console.log("form", from);

  const { mutateAsync: internalTransferAsync, isPending } = useMutation({
    mutationFn: internalTransferFn,
    onSuccess: (data) => {
      router.replace({
        pathname: "/payment-receipt",
        params: { ...data?.data?.transaction, from: "/internal-transfer" },
      });
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const makePayment = async () => {
    if (from === "/internal-transfer") {
      try {
        await internalTransferAsync({
          payload: {
            accountNumber: accountNumber ?? "",
            amount: amount ?? "",
            pin,
          },
          token,
        });
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      makePayment();
    }
  }, [pin]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            Payment Summary
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
            alignItems: "center",
            backgroundColor: "#90AD0408",
            paddingTop: 20,
            paddingBottom: 30,
            borderRadius: 10,
            marginTop: 15,
            shadowColor: "#ABABAB1A",
            shadowOffset: { width: 4, height: 6 },
            shadowOpacity: 4,
            shadowRadius: 1,
            elevation: 2,
            paddingHorizontal: 16,
          }}
        >
          <PaymentRecipient />
          <AppText style={{ marginTop: 14 }} size="xlarge" variant="medium">
            NGN {formatMoney(amount)}
          </AppText>
          <AppText style={{ marginTop: 10 }}>
            {format(new Date(), "MMMM dd, yyyy hh:mma")}
          </AppText>
          <View
            style={{
              marginTop: 36,
              backgroundColor: Colors.lightGreen,
              borderRadius: 100,
              width: "100%",
              paddingVertical: 7,
            }}
          >
            <AppText
              style={{
                textAlign: "center",
              }}
            >
              {bankName
                ? "Transaction fee of ₦10 applies"
                : "Zero charges, Instant payment, Fast"}
            </AppText>
          </View>

          <View style={{ gap: 30, width: "100%", marginTop: 35 }}>
            <ListItem name="Recipient Name" value={accountName} />
            <ListItem name="Account Number" value={accountNumber} />
            <ListItem name="Bank Name" value={bankName ?? "Uzzy Account"} />
            <ListItem name="Narration" value={narration} />
            <ListItem name="Fee" value="NGN 0.00" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText color={Colors.faintBlack}>Save as Beneficiary</AppText>
              <SwitchComponent
                state={save}
                toggleSwitch={() => setSave(!save)}
              />
            </View>
          </View>
        </ScrollView>
        <PrimaryButton
          onPress={() => setShowModal(true)}
          style={{ marginTop: 50 }}
          label="Send Payment"
        />
      </Screen>
      <ReusableBottomSheet
        snapPoints={["75%"]}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <View style={{ paddingTop: 20, height: 300 }}>
          <AppText size="xxlarge" variant="medium">
            Enter PIN
          </AppText>
          <AppText color={Colors.faintBlack} style={{ marginTop: 16 }}>
            Proceed with your 4-digit PIN to complete this transaction.
          </AppText>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
                width: "60%",
              }}
            >
              <OtpField
                autoFocus={showModal}
                code={pin}
                setCode={setPin}
                count={4}
              />
            </View>
          </View>
        </View>
      </ReusableBottomSheet>
    </GestureHandlerRootView>
  );
};

export default PaymentSummary;
