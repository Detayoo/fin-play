import { Platform, ScrollView, StyleSheet, View } from "react-native";

import {
  AppText,
  BackButton,
  Loading,
  PrimaryButton,
  Screen,
} from "@/components";
import { Colors, fonts } from "@/constants";
import { UpgradeAction } from "@/assets";
import { useR } from "@/services";
import { useAuth } from "@/context";
import { router } from "expo-router";

const CurrentTier = () => {
  return (
    <View style={styles.currentTierContainer}>
      <AppText style={styles.currentTier}>Current Tier</AppText>
    </View>
  );
};

const InitialUpgradePage = () => {
  const { token } = useAuth();
  const { data: userData, isFetching } = useR({
    token,
  });

  const { tier } = userData?.data || {};
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
          Upgrade Tier
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      {isFetching ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.tierNameContainer}>
              <AppText style={styles.tierName}>Tier 1</AppText>
              {tier === 1 && <CurrentTier />}
            </View>
            <View style={styles.tierDetailsContainer}>
              <AppText>
                <AppText
                  style={{
                    fontFamily: fonts["satoshi-medium"],
                  }}
                >
                  • Requirements:{" "}
                </AppText>
                First name, Last name, Other name, Phone number, Email address
                and Bank Verification Number (BVN)
              </AppText>
              <AppText>
                <AppText>• Transaction Limit: </AppText>
                <AppText style={{ fontFamily: fonts["satoshi-medium"] }}>
                  NGN50,000{" "}
                </AppText>
                per week.
              </AppText>
              <AppText>
                <AppText>• Maximum Wallet Balance: </AppText>
                <AppText style={{ fontFamily: fonts["satoshi-medium"] }}>
                  NGN200,000
                </AppText>
              </AppText>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.tierNameContainer}>
              <AppText style={styles.tierName}>Tier 2</AppText>
              {tier === 2 && <CurrentTier />}
            </View>
            <View style={styles.tierDetailsContainer}>
              <AppText>
                <AppText
                  style={{
                    fontFamily: fonts["satoshi-medium"],
                  }}
                >
                  • Requirements:{" "}
                </AppText>
                All credentials from Tier 1
              </AppText>
              <AppText>
                <AppText>• National Identity Number (NIN)</AppText>
              </AppText>
              <AppText>
                <AppText>• Transaction Limit: </AppText>
                <AppText style={{ fontFamily: fonts["satoshi-medium"] }}>
                  NGN200,000{" "}
                </AppText>
                per day.
              </AppText>
              <AppText>
                <AppText>• Maximum Wallet Balance: </AppText>
                <AppText style={{ fontFamily: fonts["satoshi-medium"] }}>
                  NGN500,000
                </AppText>
              </AppText>

              {/* {tier === 1 && ( */}
              <PrimaryButton
                onPress={() => {
                  router.push({
                    pathname: "/tier-details",
                    params: {
                      tier: "2",
                    },
                  });
                }}
                style={styles.upgradeBtn}
                label={
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <UpgradeAction />
                    <AppText color={Colors.white}>Upgrade to Tier 2</AppText>
                  </View>
                }
              />
              {/* )} */}
            </View>
          </View>
          <View style={[styles.container, { marginBottom: 70 }]}>
            <View style={styles.tierNameContainer}>
              <AppText style={styles.tierName}>Tier 3</AppText>
              {tier === 3 && <CurrentTier />}
            </View>
            <View style={styles.tierDetailsContainer}>
              <AppText>
                <AppText
                  style={{
                    fontFamily: fonts["satoshi-medium"],
                  }}
                >
                  • Requirements:{" "}
                </AppText>
                Proof of Address
              </AppText>
              <AppText>
                <AppText>• Transaction Limit: </AppText>
                <AppText style={{ fontFamily: fonts["satoshi-medium"] }}>
                  NGN5,000,000{" "}
                </AppText>
                per day.
              </AppText>
              <AppText>
                <AppText>• Maximum Wallet Balance: </AppText>
                <AppText style={{ fontFamily: fonts["satoshi-medium"] }}>
                  UNLIMITED
                </AppText>
              </AppText>

              {/* {tier && tier < 3 && ( */}
                <PrimaryButton
                  onPress={() => {
                    router.push({
                      pathname: "/tier-details",
                      params: {
                        tier: "3",
                      },
                    });
                  }}
                  style={styles.upgradeBtn}
                  label={
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                      }}
                    >
                      <UpgradeAction />
                      <AppText color={Colors.white}>Upgrade to Tier 3</AppText>
                    </View>
                  }
                />
              {/* )} */}
            </View>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: Colors.lightGreen,
    borderBottomWidth: 1,
  },
  gradient: {
    flex: 1,
  },

  flatList: {
    marginHorizontal: 16,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontSize: 20,
    fontFamily: fonts["satoshi-medium"],
  },
  iconsContainer: {
    flexDirection: "row",
    columnGap: 25,
    alignItems: "center",
  },
  tabsContainer: {
    height: 55,
    backgroundColor: Colors.lightGreen,
    flexDirection: "row",
    borderRadius: 100,
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.boldGreen,
  },
  tabText: {
    fontSize: 14,
  },
  transactionContentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    flex: 1,
  },
  transactionListContainer: {
    // marginBottom: 20,
  },
  searchContainer: {
    height: 40,
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    marginTop: 24,
  },
  searchField: {
    height: "100%",
    fontSize: 14,
    color: Colors.black,
    flex: 1,
    fontFamily: fonts["satoshi"],
  },

  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 26,
    borderRadius: 10,
    // marginHorizontal: 16,
    marginTop: 20,
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
  },
  tierNameContainer: {
    height: 40,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    backgroundColor: "#90AD0433",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tierName: {
    fontSize: 16,
    fontFamily: fonts["satoshi-medium"],
  },
  currentTierContainer: {
    borderRadius: 3,
    marginLeft: 30,
    backgroundColor: Colors.black,
  },
  currentTier: {
    color: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  tierDetailsContainer: {
    rowGap: 15,
    paddingTop: 30,
  },
  upgradeBtn: {
    marginTop: 50,
  },
});

export default InitialUpgradePage;
