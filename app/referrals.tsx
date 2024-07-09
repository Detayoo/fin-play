import { ScrollView, View } from "react-native";

import {
  AppText,
  BackButton,
  ListItem,
  PrimaryButton,
  Screen,
} from "@/components";
import { Colors } from "@/constants";
import { Copy, Gift } from "@/assets";
import { copyToClipboard, formatMoney } from "@/utils";

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
            backgroundColor: "#90AD041A",
            paddingHorizontal: 15,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#D6D6D6",
          }}
        >
          <AppText variant="medium" style={{ fontSize: 15 }}>
            Refer a friend
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
              backgroundColor: Colors.lightGreen,
              paddingVertical: 20,
              gap: 15,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <AppText>Tap to copy your referral code</AppText>
            <View
              style={{ gap: 10, flexDirection: "row", alignItems: "center" }}
            >
              <AppText style={{ fontSize: 15 }} variant="medium">
                SHS2527SNA
              </AppText>
              <Copy onPress={() => copyToClipboard("SHS2527SNA")} />
            </View>
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
            paddingHorizontal: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Gift />
          <AppText variant="medium" style={{ marginTop: 10 }}>
            You have no referrals yet
          </AppText>
          <AppText
            size="small"
            color={Colors.faintBlack}
            style={{ textAlign: "center", marginTop: 15 }}
          >
            Share your referral code or link with friends and family to earn
            additional cash and rewards when they sign up and use Uzzy.
          </AppText>
          <PrimaryButton
            label="Share Code"
            style={{ marginTop: 30, paddingHorizontal: 50 }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ReferralsPage;
