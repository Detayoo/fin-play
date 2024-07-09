import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppText, DashboardLayout, PrimaryButton } from "@/components";
import { Image } from "expo-image";
import { MORE_ROUTES, SETTINGS_ROUTES } from "@/utils";
import { ChevronDown } from "@/components/ChevronDown";

const RewardsPage = () => {
  return (
    <DashboardLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
          <Image
            source={require("../../assets/images/animoji.png")}
            style={{ width: 50, height: 50 }}
          />
          <AppText style={{ fontSize: 15, marginTop: 12 }} variant="medium">
            Ayodele Tunde
          </AppText>
          <View style={styles.dashedBorder} />
          <AppText size="small">You're currently on Tier 1 </AppText>
          <AppText style={{ fontSize: 13, marginTop: 5 }} variant="medium">
            Upgrade your account
          </AppText>
          <PrimaryButton
            label="Upgrade"
            style={{ marginTop: 25, width: "100%" }}
          />
        </View>
        <View>
          <AppText style={{ marginTop: 30 }} size="large" variant="medium">
            SETTINGS
          </AppText>
          <View style={{ marginTop: 10 }}>
            {SETTINGS_ROUTES.map((setting, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#EEEEEE",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 40,
                      alignItems: "center",
                      paddingVertical: 20,
                    }}
                  >
                    {setting.icon}
                    <AppText variant="medium">{setting.label}</AppText>
                  </View>
                  <ChevronDown style={{ transform: [{ rotate: "280deg" }] }} />
                </Pressable>
              );
            })}
          </View>
        </View>
        <View>
          <AppText style={{ marginTop: 30 }} size="large" variant="medium">
            MORE
          </AppText>
          <View style={{ marginTop: 10 }}>
            {MORE_ROUTES.map((setting, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#EEEEEE",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 40,
                      alignItems: "center",
                      paddingVertical: 20,
                    }}
                  >
                    {setting.icon}
                    <AppText variant="medium">{setting.label}</AppText>
                  </View>
                  <ChevronDown style={{ transform: [{ rotate: "280deg" }] }} />
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  dashedBorder: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderStyle: "dashed",
    borderRadius: 5,
    marginVertical: 20,
  },
});

export default RewardsPage;
