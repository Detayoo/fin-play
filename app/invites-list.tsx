import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  FlatList,
  RefreshControl,
} from "react-native";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { Image } from "expo-image";
import { format } from "date-fns";

import { AppText, BackButton, ListItem, Loading, Screen } from "@/components";
import { useAuth } from "@/context";
import { getInviteesFn, getRewardsFn } from "@/services";
import { Colors } from "@/constants";
import { formatMoney } from "@/utils";
import { useRefreshByUser, useRefreshOnFocus } from "@/hooks";
import { Referral } from "@/types";

const InvitesPage = () => {
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

  const inviteesData = useInfiniteQuery({
    queryKey: ["all invitees"],
    queryFn: ({ pageParam: page }) =>
      getInviteesFn({
        token,
        perPage: 50,
        page,
      }),
    enabled: !!token,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { total, page, perPage } = lastPage?.data?.metadata || {};
      if (total > page * perPage) {
        return page + 1;
      } else {
        return null;
      }
    },
  });

  const flatListData =
    inviteesData?.data?.pages
      ?.map((page) => page?.data?.referral_history)
      .flat() ?? [];

  useRefreshOnFocus(inviteesData?.refetch);

  const loadMore = () => {
    if (inviteesData?.hasNextPage) {
      inviteesData?.fetchNextPage();
    }
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(
    inviteesData.refetch
  );

  const renderItem = ({ item }: { item: Referral }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../assets/images/animoji.png")}
        style={{ width: 50, height: 50 }}
      />
      <View style={{ marginLeft: 15, gap: 5 }}>
        <AppText size="large">{item.name}</AppText>
        <AppText color={Colors.faintBlack} size="small">
          {format(new Date(item.approved_date), "MMMM dd, yyyy hh:mma")}
        </AppText>
      </View>
      <AppText
        style={{ marginLeft: "auto" }}
        color={Colors.faintBlack}
        size="small"
      >
        {item.status}
      </AppText>
    </View>
  );

  const data = inviteesData?.data?.pages?.map((page) => page?.data);

  return (
    <Screen>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <BackButton />
          <AppText size="xlarge" variant="medium">
            Invites Record
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
              paddingVertical: 16,
              paddingHorizontal: 13,
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 10,
              backgroundColor: Colors.primary,
            }}
          >
            <View>
              <AppText color={Colors.white}>Total reward earned </AppText>
              <AppText
                color={Colors.white}
                style={{ marginTop: 12 }}
                size="large"
                variant="medium"
              >
                NGN {formatMoney(rewardsData?.data?.data?.daily_bonus || "0")}
              </AppText>
            </View>
            <View>
              <AppText color={Colors.white}>Total invitees</AppText>
              <AppText
                color={Colors.white}
                style={{ marginTop: 12 }}
                size="large"
                variant="medium"
              >
                0
              </AppText>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: Colors.white,
              paddingVertical: 15,
              paddingHorizontal: 14,
              borderRadius: 10,
              ...Platform.select({
                ios: {
                  shadowColor: "#dddddd",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 1.5,
                },
              }),
            }}
          >
            <ListItem
              name="Total no. of pending referrals"
              value="0"
              size="small"
              maxWidth="70%"
            />
            <ListItem
              name="Total no. of completed referrals"
              value="0"
              size="small"
              maxWidth="70%"
            />
          </View>

          <View
            style={{
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ABABAB1A",
              paddingVertical: 24,
              paddingHorizontal: 16,
            }}
          >
            <AppText
              variant="medium"
              style={{
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              Your invites
            </AppText>
            <View style={styles.dottedBorderContainer}>
              <View style={[styles.dottedBorder, { borderColor: "#F2E6FF" }]} />
            </View>
            <View>
              <FlatList
                style={{}}
                showsVerticalScrollIndicator={false}
                data={flatListData}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                keyExtractor={(_, index) => index.toString()}
                ListFooterComponent={
                  inviteesData.isFetchingNextPage ? (
                    <AppText>LOADING MORE..</AppText>
                  ) : null
                }
                refreshControl={
                  <RefreshControl
                    onRefresh={refetchByUser}
                    refreshing={isRefetchingByUser}
                    title="Fetching Invites"
                  />
                }
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  dottedBorderContainer: {
    height: 1,
    overflow: "hidden",
    width: "100%",
    marginBottom: 30,
  },
  dottedBorder: {
    height: 2,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderStyle: "dashed",
  },
});

export default InvitesPage;
