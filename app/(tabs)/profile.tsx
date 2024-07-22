import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { AppText, DashboardLayout, PrimaryButton } from "@/components";
import { MORE_ROUTES, SETTINGS_ROUTES } from "@/utils";
import { ChevronDown } from "@/components/ChevronDown";
import { useAuth } from "@/context";
import { Colors } from "@/constants";
import { useR } from "@/services";

const ProfilePage = () => {
  const { logout, token, user: loggedInUser } = useAuth();
  const { data: user } = useR({
    token,
  });
  const { tier } = user?.data?.userProfile || {};
  const handleNavigation = (route: any) => {
    if (route === "/") {
      logout();
      return;
    }
    router.push(route);
  };

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
            {loggedInUser?.fullName}
          </AppText>
          <View style={styles.dashedBorder} />
          <AppText size="small">You're currently on Tier {tier} </AppText>
          <AppText style={{ fontSize: 13, marginTop: 5 }} variant="medium">
            Upgrade your account
          </AppText>
          <PrimaryButton
            onPress={() => router.push("/initiate-upgrade")}
            label="Upgrade"
            style={{ marginTop: 25, width: "100%" }}
          />
        </View>
        <View>
          <AppText style={{ marginTop: 30 }} size="large" variant="medium">
            SETTINGS
          </AppText>
          <View style={{ marginTop: 10 }}>
            {SETTINGS_ROUTES?.map((setting, index) => {
              return (
                <Pressable
                  onPress={() => handleNavigation(setting.route)}
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
                    {/* <View>{setting.icon}</View> */}
                    <AppText variant="medium">{setting.label}</AppText>
                  </View>

                  <View
                    style={{
                      gap: 24,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {setting.label === "Upgrade Tier" && (
                      <View
                        style={{
                          backgroundColor: Colors.lightGreen,
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                          borderRadius: 3,
                        }}
                      >
                        <AppText
                          style={{ textAlign: "right" }}
                          variant="medium"
                        >
                          Tier {tier}
                        </AppText>
                      </View>
                    )}
                    <ChevronDown
                      style={{ transform: [{ rotate: "280deg" }] }}
                    />
                  </View>
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
            {MORE_ROUTES?.map((setting, index) => {
              return (
                <Pressable
                  onPress={() => handleNavigation(setting.route)}
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
                    {/* <View>{setting.icon}</View> */}
                    <AppText
                      variant="medium"
                      color={
                        setting.label === "Log Out"
                          ? Colors.error
                          : Colors.primary
                      }
                    >
                      {setting.label}
                    </AppText>
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

export default ProfilePage;
