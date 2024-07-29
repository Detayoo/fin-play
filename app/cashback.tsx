import { ScrollView, View } from "react-native";
import { useQueries } from "@tanstack/react-query";
import { router } from "expo-router";
import { format } from "date-fns";

import {
  AppText,
  BackButton,
  EmptyComponent,
  FetchError,
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
                {formatMoney(rewardsData?.data?.data?.total_bonus ?? "0")}
              </AppText>
            </View>
            <PrimaryButton
              style={{ backgroundColor: Colors.boldGreen, height: 32 }}
              label="How to use"
              labelStyle={{ color: Colors.black }}
              onPress={() => router.push("/how-to-use-cashbacks")}
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
            {/* <PrimaryButton
              style={{ height: 32 }}
              variant="outline"
              label="Filter by"
            /> */}
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
              <AppText>Daily cashback</AppText>
              <AppText style={{ marginTop: 12 }} size="large" variant="medium">
                {formatMoney(rewardsData?.data?.data?.daily_bonus ?? "0")}
              </AppText>
            </View>
            <View>
              <AppText>Expenses</AppText>
              <AppText style={{ marginTop: 12 }} size="large" variant="medium">
                {formatMoney(rewardsData?.data?.data?.expenses ?? "0")}
              </AppText>
            </View>
          </View>
          {rewardsData?.isError ? (
            <FetchError
              message="Error fetching cashback records"
              onPress={() => rewardsData?.refetch()}
            />
          ) : rewardsData?.data?.data?.cashback_transaction?.length === 0 ? (
            <EmptyComponent message="No cashback record found" />
          ) : (
            <View style={{ marginTop: 20 }}>
              <AppText style={{ marginBottom: 30 }} variant="medium">
                June, 2024
              </AppText>
              <View style={{ gap: 20 }}>
                {rewardsData?.data?.data?.cashback_transaction?.map((trx) => {
                  return (
                    <View
                      key={trx.transaction_id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ gap: 2 }}>
                        <AppText style={{ textTransform: "capitalize" }}>
                          {trx?.category}
                        </AppText>
                        <AppText
                          style={{ fontSize: 10 }}
                          color={Colors.faintBlack}
                        >
                          {trx.transaction_date
                            ? format(
                                new Date(trx?.transaction_date),
                                "MMMM dd, yyyy hh:mma"
                              )
                            : null}
                        </AppText>
                      </View>
                      <View style={{ gap: 2 }}>
                        <AppText
                          style={{ textAlign: "right" }}
                          variant="medium"
                        >
                          +{trx?.bonus}
                        </AppText>
                        <AppText
                          style={{ fontSize: 10 }}
                          color={Colors.faintBlack}
                        >
                          Balance before:{" "}
                          <AppText style={{ fontSize: 10 }} variant="medium">
                            {trx?.initial_bonus?.toFixed(2)}
                          </AppText>
                        </AppText>
                      </View>
                    </View>
                  );
                })}
                {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ gap: 2 }}>
                  <AppText>MTN Airtime</AppText>
                  <AppText style={{ fontSize: 10 }} color={Colors.faintBlack}>
                    {format(
                      (new Date(), "dd/MM/yyyy HH:mm:ss", new Date()),
                      "MMMM dd, yyyy hh:mma"
                    )}
                  </AppText>
                </View>
                <View style={{ gap: 2 }}>
                  <AppText style={{ textAlign: "right" }} variant="medium">
                    +400
                  </AppText>
                  <AppText style={{ fontSize: 10 }} color={Colors.faintBlack}>
                    Balance before:{" "}
                    <AppText style={{ fontSize: 10 }} variant="medium">
                      20
                    </AppText>
                  </AppText>
                </View>
              </View> */}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </Screen>
  );
};

export default CashbackPage;
