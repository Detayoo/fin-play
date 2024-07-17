import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";

import {
  AppText,
  BackButton,
  ListItem,
  PrimaryButton,
  Screen,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { BigGift, Gift } from "@/assets";
import { formatMoney } from "@/utils";

const ReferralsPage = () => {
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
          Refer a Friend
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
        <View
          style={{
            borderRadius: 10,
            // backgroundColor: "#90AD041A",
            paddingHorizontal: 15,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ABABAB1A",
          }}
        >
          <BigGift />
          <AppText variant="medium" style={{ fontSize: 15 }}>
            Refer a Friend. Get Cashback
          </AppText>
          <AppText
            style={{
              marginTop: 15,
              fontSize: 13,
              textAlign: "center",
              paddingHorizontal: 20,
            }}
          >
            Enjoy free transfers and other goodies when your friends sign up
            with your referral code.
          </AppText>

          <View
            style={{
              paddingVertical: 20,
              gap: 15,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <AppText variant="medium" style={{ alignSelf: "flex-start" }}>
              Share your referral code
            </AppText>
            <Pressable
              onPress={async () => {
                await Clipboard.setStringAsync("SHSS");
                setTimeout(() => {
                  showToast("success", "Copied");
                }, 100);
              }}
              style={{
                gap: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: Colors.inputBorder,
                width: "100%",
                paddingHorizontal: 14,
                paddingVertical: 14,
                borderRadius: 5,
              }}
            >
              <AppText style={{ fontSize: 15 }} variant="medium">
                SHS2527SNA
              </AppText>
              <AppText
                style={{ fontSize: 15 }}
                color={Colors.inputFocusBorder}
                variant="medium"
              >
                Copy
              </AppText>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingVertical: 26,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: "#ABABAB1A",
            borderRadius: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: "30%",
                gap: 16,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 36,
                  width: 36,
                  backgroundColor: Colors.primary,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppText variant="medium" color={Colors.white}>
                  1
                </AppText>
              </View>
              <AppText size="small" style={{ textAlign: "center" }}>
                Share referral code with your friends
              </AppText>
            </View>
            <View
              style={{
                width: "30%",
                gap: 16,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 36,
                  width: 36,
                  backgroundColor: Colors.primary,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppText variant="medium" color={Colors.white}>
                  2
                </AppText>
              </View>
              <AppText size="small" style={{ textAlign: "center" }}>
                Register & fund wallet
              </AppText>
            </View>
            <View
              style={{
                width: "30%",
                gap: 16,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 36,
                  width: 36,
                  backgroundColor: Colors.primary,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppText variant="medium" color={Colors.white}>
                  3
                </AppText>
              </View>
              <AppText size="small" style={{ textAlign: "center" }}>
                You'll receive instant rewards
              </AppText>
            </View>
          </View>
          <PrimaryButton
            label="Share Code"
            style={{ marginTop: 30, paddingHorizontal: 50 }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            paddingVertical: 26,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: "#ABABAB1A",
            borderRadius: 10,
          }}
        >
          <ListItem
            name="Total cash earned"
            value={`NGN${formatMoney("0000")}`}
            size="small"
          />
          <ListItem
            name="Total sign ups using your code"
            value="0"
            size="small"
            maxWidth="70%"
          />
          <ListItem
            name="Sign ups that transacted on the app"
            value="0"
            size="small"
            maxWidth="70%"
          />
          {/* <ListItem
            name="Total no. of pendng referrals"
            value="0"
            size="small"
            maxWidth="70%"
          /> */}
        </View>

        <View
          style={{
            marginTop: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ABABAB1A",
            paddingVertical: 24,
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <AppText variant="medium" style={{ fontSize: 15 }}>
              Your invites record: 0
            </AppText>
            <AppText
              variant="medium"
              color={Colors.inputFocusBorder}
              style={{ fontSize: 13 }}
              onPress={() => router.push("/invites-list")}
            >
              View all
            </AppText>
          </View>
          <View style={styles.dottedBorderContainer}>
            <View style={[styles.dottedBorder, { borderColor: "#F2E6FF" }]} />
          </View>
          <Gift />
          <AppText variant="medium" style={{ marginTop: 10 }}>
            You have no referrals yet
          </AppText>
          {/* <AppText
            size="small"
            color={Colors.faintBlack}
            style={{ textAlign: "center", marginTop: 15 }}
          >
            Share your referral code or link with friends and family to earn
            additional cash and rewards when they sign up and use Uzzy.
          </AppText> */}
        </View>
      </ScrollView>
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

export default ReferralsPage;
