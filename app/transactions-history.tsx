import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { AppText, BackButton, Screen, TransactionItem } from "@/components";
import { Colors } from "@/constants";
import { Filter, SmallChevron } from "@/assets";

const TransactionsHistoryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [save, setSave] = useState(false);
  const [pin, setPin] = useState("");
  const { accountName, accountNumber, amount, narration, bankName } =
    useLocalSearchParams();
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
          Transaction History
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingTop: 20,
        }}
      >
        <AppText style={{ color: Colors.inputFocusBorder }}>Download</AppText>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            flexDirection: "row",
            backgroundColor: "#90AD041A",
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 10,
          }}
        >
          <Filter />
          <AppText>Filter by</AppText>

          <SmallChevron />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
        }}
      >
        <View style={{ marginTop: 20 }}>
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionItem
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default TransactionsHistoryPage;
