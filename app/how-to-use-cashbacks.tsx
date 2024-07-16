import { ScrollView, View } from "react-native";

import { AppText, BackButton, Screen } from "@/components";
import { Colors } from "@/constants";

const HowToUseCashbacksPage = () => {
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
          How to use
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <AppText size="large" variant="medium">
            Earn Cashback
          </AppText>
          <AppText style={{ marginTop: 4 }} color={Colors.faintBlack}>
            Make qualifying transactions to accumulate cashback rewards.
          </AppText>
        </View>
        <View>
          <AppText size="large" variant="medium">
            Check Balance
          </AppText>
          <AppText style={{ marginTop: 4 }} color={Colors.faintBlack}>
            View your cashback balance in the rewards section of the app.
          </AppText>
        </View>
        <View>
          <AppText size="large" variant="medium">
            Redeem Rewards
          </AppText>
          <AppText style={{ marginTop: 4 }} color={Colors.faintBlack}>
            Redeem your cashback directly to your account or use it towards
            future transactions.
          </AppText>
        </View>
        <View>
          <AppText size="large" variant="medium">
            Terms and Conditions
          </AppText>
          <AppText style={{ marginTop: 4 }} color={Colors.faintBlack}>
            Ensure you meet the minimum cashback balance required for
            redemption.
          </AppText>
        </View>
        <View>
          <AppText size="large" variant="medium">
            Expiration
          </AppText>
          <AppText style={{ marginTop: 4 }} color={Colors.faintBlack}>
            Be aware of any expiration dates for your cashback rewards.
          </AppText>
        </View>
        <View>
          <AppText size="large" variant="medium">
            Support
          </AppText>
          <AppText style={{ marginTop: 4 }} color={Colors.faintBlack}>
            Contact customer support if you encounter any issues with your
            cashback rewards.
          </AppText>
        </View>
        <View>
          <AppText color={Colors.faintBlack}>
            Enjoy the benefits of using your cashback to maximize your savings
            and spending power!
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default HowToUseCashbacksPage;
