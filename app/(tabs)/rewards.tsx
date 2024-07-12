import { Pressable, ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, BackButton, DashboardLayout } from "@/components";
import { Colors, sizes } from "@/constants";
import { ChevronRight, Referrals, Cashback } from "@/assets";

const RewardsPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <DashboardLayout>
      <View
        style={{
          marginHorizontal: -16,
          // backgroundColor: "red",
          marginTop: -insets.top,
          paddingVertical: insets.top,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          {/* <BackButton /> */}
          <AppText size="xlarge" variant="medium">
            Rewards
          </AppText>
          {/* <BackButton
            style={{
              opacity: 0,
            }}
          /> */}
        </View>
        <Image
          source={require("../../assets/images/rewards-image.png")}
          style={{
            height: sizes.WINDOW_HEIGHT * 0.52,
            width: "100%",
            // position: "absolute",
            // top: 0,
            // right: 0,
            resizeMode: "cover",
            marginTop: -insets.top * 2 - 10,
            zIndex: 0,
          }}
        />
      </View>
      <View style={{ marginTop: 0, paddingHorizontal: 16 }}>
        <AppText variant="medium" size="large">
          Earn Cashback and Rewards with Our Referral Program!
        </AppText>

        <ScrollView
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
        >
          <View style={{ marginTop: 40, gap: 34 }}>
            <Pressable
              onPress={() => router.push("/cashback")}
              style={{ flexDirection: "row", gap: 20 }}
            >
              <Cashback />
              <View style={{ gap: 5, flex: 1 }}>
                <AppText style={{ fontSize: 15 }} variant="medium">
                  Cashback
                </AppText>
                <AppText style={{ fontSize: 13 }} color={Colors.faintBlack}>
                  Get a portion of your spending back with every purchase. Start
                  saving today!
                </AppText>
              </View>
              <ChevronRight style={{ alignSelf: "center" }} />
            </Pressable>
            <Pressable style={{ flexDirection: "row", gap: 20 }}>
              <Referrals />
              <View style={{ gap: 5, flex: 1 }}>
                <AppText style={{ fontSize: 15 }} variant="medium">
                  Referrals
                </AppText>
                <AppText style={{ fontSize: 13 }} color={Colors.faintBlack}>
                  Invite your friends to join us and earn exciting rewards for
                  every successful referral!
                </AppText>
              </View>
              <ChevronRight style={{ alignSelf: "center" }} />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </DashboardLayout>
  );
};

export default RewardsPage;
