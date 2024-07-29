import { ScrollView, View } from "react-native";

import { Colors } from "@/constants";
import { Bank, Uzzy } from "../assets";
import { formatMoney, naira } from "@/utils";
import { AppText } from "./AppText";
import { Electricity } from "./Electricity";
import { Airtime } from "./Airtime";
import { Cable } from "./Cable";
import { Smile } from "./Smile";
import { UseQueryResult } from "@tanstack/react-query";
import { IGetStats } from "@/types";
import { Loading } from "./Loading";

export const Income = ({
  transactionStatsData,
}: {
  transactionStatsData: UseQueryResult<IGetStats>;
}) => {
  const { airtime, betting, data, electricity, payout, tv, walletTransfer } =
    transactionStatsData?.data?.data?.income || {};

  const list = [
    {
      icon: <Electricity />,
      name: "Electricity",
      amount: electricity,
    },
    {
      icon: <Bank />,
      name: "Transfer to Banks",
      amount: payout,
    },
    {
      icon: <Bank />,
      name: "Uzzy to Uzzy",
      amount: walletTransfer,
    },
    {
      icon: <Airtime />,
      name: "Airtime",
      amount: airtime,
    },
    {
      icon: <Airtime />,
      name: "Data",
      amount: data,
    },
    {
      icon: <Airtime />,
      name: "Airtime",
      amount: airtime,
    },
    {
      icon: <Cable />,
      name: "Cable TV",
      amount: tv,
    },
    // {
    //   icon: <Smile />,
    //   name: "Internet",
    //   amount: "4500",
    // },
    {
      icon: <Airtime />,
      name: "Betting",
      amount: betting,
    },
  ];

  if (transactionStatsData?.isFetching) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "#90AD0426",
          paddingVertical: 16,
          borderRadius: 10,
          alignItems: "center",
          gap: 10,
        }}
      >
        <AppText>Total Income</AppText>
        <AppText variant="medium" style={{ fontSize: 22 }}>
          {naira}
          {formatMoney(transactionStatsData?.data?.data?.totalSum ?? "0")}
        </AppText>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: "#f4f4f4",
          backgroundColor: Colors.white,
          marginTop: 30,
          borderRadius: 10,
        }}
      >
        <AppText variant="medium">Expenses Breakdown</AppText>
        {list?.map((each, index) => {
          return (
            <View
              key={index}
              style={{
                gap: 10,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#F4F4F4",
                paddingTop: 25,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                {each.icon}
                <AppText style={{ fontSize: 13 }}>{each.name}</AppText>
                <AppText
                  variant="medium"
                  style={{ fontSize: 13, marginLeft: "auto" }}
                >
                  {naira}
                  {formatMoney(each.amount || "0")}
                </AppText>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
