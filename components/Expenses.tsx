import { ScrollView, View } from "react-native";
import { UseQueryResult } from "@tanstack/react-query";

import { Colors } from "@/constants";
import { Bank, Uzzy } from "@/assets";
import { formatMoney, naira } from "@/utils";
import { AppText } from "./AppText";
import { Electricity } from "./Electricity";
import { Airtime } from "./Airtime";
import { Cable } from "./Cable";
import { Smile } from "./Smile";
import { IGetStats } from "@/types";

export const Expenses = ({
  transactionStatsData,
}: {
  transactionStatsData: UseQueryResult<IGetStats>;
}) => {
  const { bills, total, transfer } =
    transactionStatsData?.data?.data?.expense || {};

  const list = [
    {
      icon: <Electricity />,
      name: "Electricity",
      amount: "4500",
    },
    {
      icon: <Bank />,
      name: "Transfer to Banks",
      amount: transfer,
    },
    {
      icon: <Bank />,
      name: "Uzzy to Uzzy",
      amount: "4500",
    },
    {
      icon: <Airtime />,
      name: "Airtime",
      amount: "4500",
    },
    {
      icon: <Cable />,
      name: "Cable TV",
      amount: "4500",
    },
    {
      icon: <Smile />,
      name: "Internet",
      amount: "4500",
    },
  ];
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#90AD0426",
          paddingVertical: 16,
          borderRadius: 10,
          alignItems: "center",
          gap: 10,
        }}
      >
        <AppText>Total Expenses</AppText>
        <AppText variant="medium" style={{ fontSize: 22 }}>
          {naira}
          {formatMoney(total || "0")}
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
                  {formatMoney(each.amount ?? "0")}
                </AppText>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
