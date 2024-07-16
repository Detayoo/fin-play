import { Pressable, ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AppText,
  BackButton,
  DashboardLayout,
  PrimaryButton,
} from "@/components";
import { Colors, sizes } from "@/constants";
import { ChevronRight, Referrals, Cashback, CheckMark } from "@/assets";

const TierDetailsPage = () => {
  const { tier } = useLocalSearchParams();
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
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <BackButton />

          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>
        <Image
          source={require("../assets/images/tier-details.png")}
          style={{
            height: sizes.WINDOW_HEIGHT * 0.44,
            width: "100%",
            resizeMode: "cover",
            marginTop: -insets.top * 2 - 10,
            zIndex: 0,
          }}
        />
      </View>
      <View style={{ marginTop: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppText variant="medium" size="large">
            National Identity Number (NIN)
          </AppText>

          <View style={{ flex: 1 }}>
            <View
              style={{
                marginTop: 30,
                backgroundColor: Colors.white,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                width: "100%",
              }}
            >
              <CheckMark />
              <View
                style={{
                  width: "100%",
                }}
              >
                <AppText variant="medium" style={{ fontSize: 15 }}>
                  How we confirm your identity
                </AppText>
                <AppText
                  style={{ fontSize: 13, marginTop: 5, width: "90%" }}
                  color={Colors.faintBlack}
                >
                  We verify your identity by cross-referencing the provided NIN
                  with government databases to ensure data accuracy and
                  authenticity.
                </AppText>
              </View>
            </View>

            <View
              style={{
                marginTop: 30,
                backgroundColor: Colors.white,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                width: "100%",
              }}
            >
              <CheckMark />
              <View
                style={{
                  width: "100%",
                }}
              >
                <AppText variant="medium" style={{ fontSize: 15 }}>
                  Swift and Secure Verification
                </AppText>
                <AppText
                  style={{ fontSize: 13, marginTop: 5, width: "90%" }}
                  color={Colors.faintBlack}
                >
                  Experience quick and secure verification; your details will be
                  confirmed in a matter of minutes, ensuring a seamless
                  upgrading experience.
                </AppText>
              </View>
            </View>
          </View>

          <PrimaryButton
            onPress={
              tier == "2"
                ? () => router.push("/enter-nin")
                : () => router.push("/tier-three-upgrade")
            }
            label="Let's get started"
            style={{ marginVertical: 70 }}
          />
        </ScrollView>
      </View>
    </DashboardLayout>
  );
};

export default TierDetailsPage;
