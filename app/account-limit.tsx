import { ScrollView, TouchableOpacity, View } from "react-native";
import { useQueries } from "@tanstack/react-query";
import { router } from "expo-router";

import {
  AppText,
  BackButton,
  Loading,
  PrimaryButton,
  Screen,
} from "@/components";
import { Colors } from "@/constants";
import { copyToClipboard, formatMoney, getFirstLetter, naira } from "@/utils";
import { BigBank, BigUser, Copy, DashedBorder } from "@/assets";
import { getTiersFn, getUserAccountDetailsFn } from "@/services";
import { useAuth } from "@/context";

const AccountLimitPage = () => {
  const { token } = useAuth();

  const [tiersData, userAccountData] = useQueries({
    queries: [
      {
        queryKey: ["tiers"],
        queryFn: () =>
          getTiersFn({
            token,
          }),
      },
      {
        queryKey: ["user account details"],
        queryFn: () => getUserAccountDetailsFn({ token }),
      },
    ],
  });

  const { accountName, accountNumber, bankName } =
    userAccountData?.data?.data || {};

  const isLoading = userAccountData?.isFetching || tiersData?.isFetching;

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
          Account Limit
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.lightGreen,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 45,
                  width: 45,
                }}
              >
                <AppText size="xxlarge" variant="medium">
                  {getFirstLetter(bankName)}
                </AppText>
              </View>

              <View style={{ marginLeft: 10 }}>
                <AppText size="small">Account Number</AppText>
                <AppText
                  size="xlarge"
                  variant="medium"
                  style={{ marginTop: 4 }}
                >
                  {accountNumber}
                </AppText>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipboard(accountNumber)}
                style={{
                  marginLeft: "auto",
                  backgroundColor: Colors.lightGreen,
                  borderRadius: 50,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <AppText size="small">Copy</AppText>
                <View style={{ marginTop: 4 }}>
                  <Copy />
                </View>
              </TouchableOpacity>
            </View>
            <DashedBorder />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <BigBank />
              <View style={{ marginLeft: 10 }}>
                <AppText size="small">Bank Name</AppText>
                <AppText
                  size="xlarge"
                  variant="medium"
                  style={{ marginTop: 4 }}
                >
                  {bankName}
                </AppText>
              </View>
            </View>
            <DashedBorder />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <BigUser />
              <View style={{ marginLeft: 10 }}>
                <AppText size="small">Account Name</AppText>
                <AppText
                  size="xlarge"
                  variant="medium"
                  style={{ marginTop: 4 }}
                >
                  {accountName}
                </AppText>
              </View>
            </View>
            <DashedBorder />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <BigBank />
              <View style={{ marginLeft: 10 }}>
                <AppText size="small">Bank Verification Number</AppText>
                <AppText
                  size="xlarge"
                  variant="medium"
                  style={{ marginTop: 4 }}
                >
                  12345**12162
                </AppText>
              </View>
            </View>
            <DashedBorder />
          </View>
          <View style={{ marginTop: 10, marginBottom: 40, gap: 20 }}>
            {tiersData?.data?.data?.kyc_level?.map((each) => {
              const { daily_trans_limit, max_balance, name } = each;
              return (
                <View
                  key={name}
                  style={{
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ABABAB1A",
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#90AD0433",
                      height: 40,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 15,
                    }}
                  >
                    <AppText size="large" variant="medium">
                      Tier {name}
                    </AppText>
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <AppText color={Colors.faintBlack}>{name}</AppText>
                    <AppText variant="medium">
                      {naira}
                      {formatMoney(daily_trans_limit)}
                    </AppText>
                  </View>
                  <View
                    style={{
                      paddingBottom: 20,
                      paddingHorizontal: 15,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <AppText color={Colors.faintBlack}>
                      Maximum Account Balance
                    </AppText>
                    <AppText variant="medium">
                      {max_balance === "UNLIMITED" ? (
                        <AppText color={Colors.inputFocusBorder}>
                          {max_balance}
                        </AppText>
                      ) : (
                        <AppText>
                          {naira}
                          {formatMoney(max_balance)}
                        </AppText>
                      )}
                    </AppText>
                  </View>
                </View>
              );
            })}
          </View>
          <PrimaryButton
            onPress={() => router.push("/initiate-upgrade")}
            label="Upgrade Tier"
          />
        </ScrollView>
      )}
    </Screen>
  );
};

export default AccountLimitPage;
