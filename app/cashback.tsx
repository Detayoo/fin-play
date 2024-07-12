import { ScrollView, View } from "react-native";
import { useQueries } from "@tanstack/react-query";

import {
  AppText,
  BackButton,
  Loading,
  PrimaryButton,
  Screen,
} from "@/components";
import { useAuth } from "@/context";
import { getRewardsFn } from "@/services";
import { Colors } from "@/constants";
import { formatMoney } from "@/utils";

const CashbackPage = () => {
  const { token } = useAuth();
  const [rewardsData] = useQueries({
    queries: [
      {
        queryKey: ["rewards"],
        queryFn: () =>
          getRewardsFn({
            token,
          }),
        // enabled: false,
      },
    ],
  });

  return (
    <Screen>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // paddingHorizontal: 16,
            // paddingTop: 20,
          }}
        >
          <BackButton />
          <AppText size="xlarge" variant="medium">
            Cashback
          </AppText>
          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>
      </View>
      {rewardsData?.isFetching ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 26,
              paddingVertical: 14,
              backgroundColor: Colors.black,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 10 }}>
              <AppText color={Colors.white} size="small">
                Cashback
              </AppText>
              <AppText
                variant="medium"
                style={{ fontSize: 16 }}
                color={Colors.white}
              >
                NGN {formatMoney(rewardsData?.data?.data?.total_bonus || "0")}
              </AppText>
            </View>
            <PrimaryButton
              style={{ backgroundColor: Colors.boldGreen, height: 32 }}
              label="How to use"
              labelStyle={{ color: Colors.black }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppText>Bonuses & Expenses</AppText>
            <PrimaryButton
              style={{ height: 32 }}
              variant="outline"
              label="Filter by"
            />
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: Colors.lightGreen,
              paddingVertical: 10,
              paddingHorizontal: 24,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <AppText>Bonuses</AppText>
              <AppText style={{ marginTop: 12 }} size="large" variant="medium" >
                NGN {formatMoney(rewardsData?.data?.data?.total_bonus || "0")}
              </AppText>
            </View>
            <View>
              <AppText>Expenses</AppText>
              <AppText style={{ marginTop: 12 }} size="large" variant="medium">
                NGN {formatMoney(rewardsData?.data?.data?.expenses || "0")}
              </AppText>
            </View>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

export default CashbackPage;
