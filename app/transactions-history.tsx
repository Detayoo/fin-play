import { useEffect, useState } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  AppText,
  BackButton,
  Expenses,
  Screen,
  TransactionFilterModal,
  TransactionItem,
} from "@/components";
import { Colors } from "@/constants";
import {
  ActiveStats,
  Filter,
  InactiveTransactions,
  SmallChevron,
  Stats,
  Transactions,
} from "@/assets";
import { useAuth } from "@/context";
import { getAllTransactionsFn } from "@/services";
import { useRefreshByUser, useRefreshOnFocus } from "@/hooks";

type TransactionFilter = {
  duration: string;
  status: string;
  type: string;
};

type StateType = {
  activeTab: string;
  statsTab: string[];
  showFilter: boolean;
};

const TransactionsHistoryPage = () => {
  const { token } = useAuth();
  const currentDate = new Date(Date.now());

  const dayFromNow = (numberOfDays: number) => {
    return currentDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000;
  };

  const [state, setState] = useState({
    activeTab: "All Transactions",
    statsTab: ["expenses", "income"],
    showFilter: false,
  });

  const mainTabs = [
    {
      name: "All Transactions",
      icon: <InactiveTransactions />,
      activeIcon: <Transactions />,
    },
    {
      name: "Transaction Statistics",
      icon: <Stats />,
      activeIcon: <ActiveStats />,
    },
  ];

  const [statsActiveTab, setStatsActiveTab] = useState("expenses");

  const [filterObj, setFilterObj] = useState({
    duration: "",
    status: "",
    type: "",
    range: {
      start: "",
      end: "",
    },
  });

  const updateState = (payload: Partial<StateType>) => {
    setState((previousState) => ({ ...previousState, ...payload }));
  };

  const updateFilter = (payload: Partial<TransactionFilter>) => {
    setFilterObj((previousState) => ({ ...previousState, ...payload }));
  };

  const transactionsData = useInfiniteQuery({
    queryKey: ["all transactions", JSON.stringify(filterObj)],
    queryFn: ({ pageParam: currentPage }) =>
      getAllTransactionsFn({
        token,
        perPage: 50,
        currentPage: currentPage,
        status: filterObj?.status ?? null,
        transactionType: filterObj?.type ?? null,
        startDate:
          filterObj?.duration === "Last 7 Days"
            ? format(new Date(dayFromNow(7)), "yyyy-MM-dd")
            : filterObj?.duration === "Last 30 Days"
            ? format(new Date(dayFromNow(30)), "yyyy-MM-dd")
            : filterObj.duration === "Custom"
            ? format(new Date(filterObj.range.start), "yyyy-MM-dd")
            : null,
        endDate:
          filterObj?.duration === "Last 7 Days" ||
          filterObj.duration === "Last 30 Days"
            ? format(new Date(currentDate), "yyyy-MM-dd")
            : filterObj.duration === "Custom"
            ? format(new Date(filterObj.range.end), "yyyy-MM-dd")
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
            Transactions History
          </AppText>
          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>

        {state.activeTab === "Transaction Statistics" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 30,
                borderBottomWidth: 1,
                borderBottomColor: "#F4F4F4",
              }}
            >
              {state.statsTab.map((tab, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setStatsActiveTab(tab);
                    }}
                    style={{
                      borderBottomColor:
                        statsActiveTab === tab
                          ? Colors.boldGreen
                          : "transparent",
                      borderBottomWidth: 3,
                      paddingBottom: 15,
                    }}
                  >
                    <AppText
                      style={{
                        fontSize: 15,
                        // paddingHorizontal: 30,
                        width: 124,
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                      color={
                        statsActiveTab === tab ? Colors.boldGreen : Colors.black
                      }
                      variant={statsActiveTab === tab ? "medium" : "normal"}
                    >
                      {tab}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
        {state.activeTab === "All Transactions" ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingTop: 20,
              }}
            >
              <AppText style={{ color: Colors.inputFocusBorder }}>
                Download
              </AppText>
              <Pressable
                onPress={() =>
                  updateState({
                    showFilter: true,
                  })
                }
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
            {/* <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                width: "100%",
              }}
            > */}
            <View style={{ marginTop: 20 }}>
              <FlatList
                style={{}}
                showsVerticalScrollIndicator={false}
                data={flatListData}
                renderItem={({ item }) => (
                  <TransactionItem
                    onPress={() =>
                      router.push({
                        pathname: "/payment-receipt",
                        params: {},
                      })
                    }
                    status="GLO"
                  />
                )}
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
                    title="Fetching Transactions"
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
            </View>
            {/* </ScrollView> */}
          </>
        ) : (
          <Expenses />
        )}
        <View
          style={{
            height: 60,
            backgroundColor: Colors.white,
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#ABABBA40",
            width: "100%",
            marginTop: "auto",
          }}
        >
          {mainTabs?.map((tab) => {
            return (
              <Pressable
                key={tab.name}
                onPress={() =>
                  updateState({
                    activeTab: tab?.name,
                  })
                }
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  paddingTop: 17,
                }}
              >
                {state.activeTab === tab.name ? tab.activeIcon : tab.icon}
                <AppText
                  color={
                    state.activeTab === tab.name
                      ? Colors.boldGreen
                      : Colors.faintBlack
                  }
                  size="small"
                  variant={state.activeTab === tab.name ? "medium" : "normal"}
                >
                  {tab.name}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </Screen>
      <TransactionFilterModal
        filterObj={filterObj}
        setFilterObj={setFilterObj}
        showModal={state.showFilter}
        setShowModal={(e) =>
          updateState({
            showFilter: e,
          })
        }
      />
    </GestureHandlerRootView>
  );
};

export default TransactionsHistoryPage;
