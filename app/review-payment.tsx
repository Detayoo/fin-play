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
} from "@/components";
import { Colors } from "@/constants";
import { BigMtn } from "@/assets";
import { formatMoney } from "@/utils";

const ReviewPayment = () => {
  const [showModal, setShowModal] = useState(false);
  const [save, setSave] = useState(false);
  const [useCashback, setUseCashback] = useState(false);
  const [pin, setPin] = useState("");
  const {
    accountNumber,
    amount,
    narration,
    bankName,
    phoneNumber,
    serviceProvider,
    cashback,
  } = useLocalSearchParams();
  console.log(useLocalSearchParams());

  const makePayment = () => {
    router.push("/payment-receipt");
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
          <BigMtn />
          <AppText style={{ marginTop: 14 }} size="xlarge" variant="medium">
            NGN {formatMoney(amount)}
          </AppText>
          <AppText
            style={{
              marginTop: 10,
              paddingBottom: 30,
              width: "100%",
              textAlign: "center",
            }}
          >
            {format(new Date(), "MMMM dd, yyyy hh:mma")}
          </AppText>

          <View
            style={{
              gap: 30,
              width: "100%",
              paddingTop: 35,
              borderTopWidth: 1,
              borderTopColor: "#EDEDED",
            }}
          >
            <ListItem name="Phone Number" value={accountNumber} />
            <ListItem name="Amount to pay (NGN)" value={amount} />
            <ListItem name="Network Provider" value={serviceProvider} />
            <ListItem name="Cashback" value="NGN 1.00" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText color={Colors.faintBlack}>Use cashback</AppText>
              <SwitchComponent
                state={useCashback}
                toggleSwitch={() => setUseCashback(!useCashback)}
              />
            </View>
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

export default ReviewPayment;
