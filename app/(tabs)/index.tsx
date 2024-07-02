import { ImageBackground, Pressable, ScrollView, View } from "react-native";
import { Image } from "expo-image";

import { homeStyles as styles } from "@/styles";
import { AppText, DashboardLayout } from "@/components";
import { AddMoney, Bank, Chat, Notification, Show, UserHead } from "@/assets";
import { Colors } from "@/constants";
import { formatMoney } from "@/utils";

export default function HomeScreen() {
  return (
    <DashboardLayout>
      <View style={styles.userCard}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/animoji.png")}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <AppText style={{ fontSize: 12 }}>Welcome Back!</AppText>
            <AppText size="xxlarge" variant="medium">
              Ayodele Tunde
            </AppText>
          </View>
        </View>

        <View style={styles.extras}>
          <Chat />
          <Notification />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/balance-background.png")}
            style={styles.balanceBg}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Show />
              <AppText color={Colors.white}>Wallet Balance</AppText>
            </View>
            <AppText
              style={{ marginTop: 20 }}
              color={Colors.white}
              variant="medium"
              size="xxlarge"
            >
              NGN {formatMoney("500000")}
            </AppText>
          </ImageBackground>
        </View>

        <View style={styles.moneyActions}>
          <Pressable style={{ alignItems: "center" }}>
            <AddMoney />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              Add Money
            </AppText>
          </Pressable>
          <Pressable style={{ alignItems: "center" }}>
            <UserHead />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              To Uzzy
            </AppText>
          </Pressable>
          <Pressable style={{ alignItems: "center" }}>
            <Bank />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              To Banks
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
}
