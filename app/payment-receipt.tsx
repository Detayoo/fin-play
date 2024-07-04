import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  ListItem,
  ReusableBottomSheet,
} from "@/components";
import { Colors } from "@/constants";
import {
  BigBank,
  PaymentRecipient,
  ReceiptTypeImage,
  ReceiptTypePDF,
} from "@/assets";
import { formatMoney } from "@/utils";

const PaymentReceipt = () => {
  const [showModal, setShowModal] = useState(false);
  const { accountName, accountNumber, amount, narration } =
    useLocalSearchParams();
  console.log(useLocalSearchParams());
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
        {/* <PaymentRecipient /> */}
        <BigBank />
        <AppText style={{ marginTop: 14 }} size="xlarge" variant="medium">
          NGN {formatMoney("0")}
        </AppText>
        <AppText style={{ marginTop: 10 }} color={Colors.inputFocusBorder}>
          Transfer Successful
        </AppText>
        <AppText style={{ marginTop: 10, marginBottom: 30 }}>
          {format(new Date(), "MMMM dd, yyyy hh:mma")}
        </AppText>

        <View
          style={{
            gap: 30,
            width: "100%",
            borderTopWidth: 1,
            borderColor: "#EDEDED",
            paddingTop: 20,
          }}
        >
          <ListItem
            name="Recipient's Details"
            value={accountName || "Adedigba Peter Adetayo"}
            value2={"Uzzy Bank | 01234567890"}
          />
          <ListItem
            name="Sender's Details"
            value={accountNumber || "Starboy"}
            value2={"Uzzy Bank | 01234567890"}
          />
          <ListItem name="Narration" value={narration} />
          <ListItem name="Fee" value="NGN 0.00" />
          <ListItem name="Transaction ID" value="axhjdajjj1215613653" canCopy />
          <ListItem
            name="Session ID"
            value="5dhsSHSIU3SJey2747299472 hIY7s3"
            canCopy
          />
        </View>
      </ScrollView>
      <PrimaryButton
        onPress={() => router.push("/(tabs)")}
        variant="outline"
        style={{ marginTop: 30 }}
        label="Go back to Home"
      />
      <PrimaryButton
        onPress={() => setShowModal(true)}
        style={{ marginTop: 16 }}
        label="Share Receipt"
      />
      <ReusableBottomSheet
        snapPoints={["30%"]}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <View style={{ paddingTop: 20, height: 300 }}>
          <AppText size="xlarge" variant="medium">
            Select Share Format
          </AppText>

          <TouchableOpacity
            style={{
              width: "100%",
              gap: 10,
              marginTop: 30,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ReceiptTypeImage />
            <AppText>Image</AppText>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#EDEDED",
              marginTop: 15,
            }}
          />
          <TouchableOpacity
            style={{
              width: "100%",
              gap: 10,
              marginTop: 15,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ReceiptTypePDF />
            <AppText>PDF</AppText>
          </TouchableOpacity>
        </View>
      </ReusableBottomSheet>
    </Screen>
  );
};

export default PaymentReceipt;
