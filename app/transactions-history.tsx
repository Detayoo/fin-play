import { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { AppText, BackButton, Screen, TransactionItem } from "@/components";
import { Colors } from "@/constants";
import { Filter, SmallChevron } from "@/assets";
import { useAuth } from "@/context";
import { getAllTransactionsFn } from "@/services";
import { useRefreshByUser, useRefreshOnFocus } from "@/hooks";

type TransactionFilter = {
  duration: string;
  status: string;
  type: string;
};

const TransactionsHistoryPage = () => {
  const { token } = useAuth();
  const currentDate = new Date(Date.now());

  const dayFromNow = (numberOfDays: number) => {
    return currentDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000;
  };

  const [filterObj, setFilterObj] = useState({
    duration: "",
    status: "",
    type: "",
  });

  const updateFilter = (payload: Partial<TransactionFilter>) => {
    setFilterObj((previousState) => ({ ...previousState, ...payload }));
  };

  const getStartDate = () => {
    if (filterObj?.duration === "Last 7 days") {
      return dayFromNow(7);
    }
    if (filterObj?.duration === "Last 30 days") {
      return dayFromNow(30);
    }

    return filterObj?.duration;
  };
  const getEndDate = () => {
    if (
      filterObj?.duration === "Last 7 days" ||
      filterObj?.duration === "Last 30 days"
    ) {
      return currentDate;
    }

    return filterObj?.duration;
  };

  const transactionsData = useInfiniteQuery({
    queryKey: ["all transactions", JSON.stringify(filterObj)],
    queryFn: ({ pageParam: currentPage }) =>
      getAllTransactionsFn({
        token,
        perPage: 50,
        currentPage: currentPage,
        status: filterObj?.status,
        transactionType: filterObj?.type,
        startDate: filterObj?.duration
          ? format(new Date(getStartDate()), "yyyy-MM-dd")
          : null,
        endDate: filterObj?.duration
          ? format(new Date(getEndDate()), "yyyy-MM-dd")
          : null,
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
      ?.map((page) => page?.data.transactions)
      .flat() ?? [];

  useRefreshOnFocus(transactionsData?.refetch);

  const loadMore = () => {
    if (transactionsData?.hasNextPage) {
      transactionsData?.fetchNextPage();
    }
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(
    transactionsData.refetch
  );

  console.log("flatlist data", flatListData);
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
          <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={flatListData}
            renderItem={({ item }) => <View></View>}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item.id}
            ListFooterComponent={
              transactionsData.isFetchingNextPage ? (
                <AppText>LOADING MORE..</AppText>
              ) : null
            }
            refreshControl={
              <RefreshControl
                onRefresh={refetchByUser}
                refreshing={isRefetchingByUser}
              />
            }
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
