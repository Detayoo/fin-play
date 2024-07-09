import { ScrollView, TouchableOpacity, View } from "react-native";

import { AppText, BackButton, PrimaryButton, Screen } from "@/components";
import { Colors } from "@/constants";
import { copyToClipboard, formatMoney, naira } from "@/utils";
import { BigBank, BigUser, Copy, DashedBorder } from "@/assets";

const TIERS = [
  {
    tier: 1,
    name: "Daily Transaction Limit",
    dailyTransactionLimit: "50000",
    maxAccountBalance: "300000",
  },
  {
    tier: 2,
    name: "Daily Transaction Limit",
    dailyTransactionLimit: "200000",
    maxAccountBalance: "500000",
  },
  {
    tier: 3,
    name: "Daily Transaction Limit",
    dailyTransactionLimit: "5000000",
    maxAccountBalance: "UNLIMITED",
  },
];

const accountNumber = "1234567890";

const AccountLimitPage = () => {
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
                U
              </AppText>
            </View>

            <View style={{ marginLeft: 10 }}>
              <AppText size="small">Account Number</AppText>
              <AppText size="xlarge" variant="medium" style={{ marginTop: 4 }}>
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
              <AppText size="xlarge" variant="medium" style={{ marginTop: 4 }}>
                Uzzy App
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
              <AppText size="xlarge" variant="medium" style={{ marginTop: 4 }}>
                AYODELE TUNDE SAMUEL
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
              <AppText size="xlarge" variant="medium" style={{ marginTop: 4 }}>
                12345**12162
              </AppText>
            </View>
          </View>
          <DashedBorder />
        </View>
        <View style={{ marginTop: 10, marginBottom: 40, gap: 20 }}>
          {TIERS?.map((each) => {
            const { tier, dailyTransactionLimit, maxAccountBalance, name } =
              each;
            return (
              <View
                key={tier}
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
                    Tier {tier}
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
                    {formatMoney(dailyTransactionLimit)}
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
                    {maxAccountBalance === "UNLIMITED" ? (
                      <AppText>{maxAccountBalance}</AppText>
                    ) : (
                      <AppText>
                        {naira}
                        {formatMoney(maxAccountBalance)}
                      </AppText>
                    )}
                  </AppText>
                </View>
              </View>
            );
          })}
        </View>
        <PrimaryButton label="Upgrade Tier" />
      </ScrollView>
    </Screen>
  );
};

export default AccountLimitPage;
