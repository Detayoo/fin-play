import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
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
import { useRefreshByUser, useRefreshOnFocus } from "@/hooks";
import { RewardTransactionType } from "@/types";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";

const CashbackPage = () => {
  const { token } = useAuth();
  const [rewardsData] = useQueries({
    queries: [
      {
        queryKey: ["rewards"],
        queryFn: () =>
          getRewardsFn({
            token,
            currentPage: 1,
            perPage: 50,
          }),
        // enabled: false,
      },
    ],
  });

  const transactionsData = useInfiniteQuery({
    queryKey: ["rewards list"],
    queryFn: ({ pageParam: currentPage }) =>
      getRewardsFn({
        token,
        perPage: 10,
        currentPage,
      }),
    enabled: !!token,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { totalRecords, currentPage, perPage } = lastPage?.metadata || {};
      if (totalRecords > currentPage * perPage) {
        return currentPage + 1;
      } else {
        return null;
      }
    },
  });

  const flatListData =
    transactionsData?.data?.pages
      ?.map((page) => page?.data.cashback_transaction)
      .flat() ?? [];

  useRefreshOnFocus(transactionsData?.refetch);

  const loadMore = () => {
    if (transactionsData?.hasNextPage) transactionsData?.fetchNextPage();
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(
    transactionsData.refetch
  );

  const renderItem = ({ item }: { item: RewardTransactionType }) => (
    <View
      key={item.transaction_id}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View style={{ gap: 2 }}>
        <AppText style={{ textTransform: "capitalize" }}>
          {item?.category}
        </AppText>
        <AppText style={{ fontSize: 10 }} color={Colors.faintBlack}>
          {item.transaction_date
            ? format(new Date(item?.transaction_date), "MMMM dd, yyyy hh:mma")
            : null}
        </AppText>
      </View>
      <View style={{ gap: 2 }}>
        <AppText style={{ textAlign: "right" }} variant="medium">
          +{item?.bonus?.toFixed(2)}
        </AppText>
        <AppText style={{ fontSize: 10 }} color={Colors.faintBlack}>
          Balance before:{" "}
          <AppText style={{ fontSize: 10 }} variant="medium">
            {item?.initial_bonus?.toFixed(2)}
          </AppText>
        </AppText>
      </View>
    </View>
  );

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

      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={refetchByUser}
            refreshing={isRefetchingByUser}
            // title="Fetching Records"
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
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
        ) : (
          <View style={{ marginTop: 20 }}>
            <AppText style={{ marginBottom: 0 }} variant="medium">
              {/* June, 2024 */}
            </AppText>

            <FlatList
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              data={flatListData}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <EmptyComponent message="No record found" />
                </View>
              }
              renderItem={renderItem}
              onEndReached={loadMore}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.transaction_id}
              ListFooterComponent={
                transactionsData.isFetchingNextPage ? <Spinner /> : null
              }
              refreshControl={
                <RefreshControl
                  onRefresh={refetchByUser}
                  refreshing={isRefetchingByUser}
                  title="Fetching Records"
                  tintColor={Colors.primary}
                />
              }
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

export default CashbackPage;
