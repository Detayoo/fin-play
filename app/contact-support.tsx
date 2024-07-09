import { Linking, Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";

import { AppText, BackButton, Screen } from "@/components";
import {
  EmailNotification,
  Facebook,
  Instagram,
  LiveChat,
  Telephone,
  X,
} from "@/assets";
import { Colors } from "@/constants";

const DETAILS = [
  {
    value: "+2348123456789",
    icon: <Telephone />,
    action: () => Linking.openURL("tel:+2348123456789"),
  },
  {
    value: "support@betamoney.com",
    icon: <EmailNotification />,
    action: () => Linking.openURL("mailto:support@betamoney.com"),
  },
  {
    value: "Live chat",
    subValue: "Start a conversation",
    icon: <LiveChat />,
    action: () => {},
  },
];
const SOCIALS = [
  {
    name: "Facebook",
    icon: <Facebook />,
    route: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: <Instagram />,
    route: "https://instagram.com",
  },
  {
    name: "Twitter",
    icon: <X />,
    route: "https://x.com",
  },
];

const ContactSupportPage = () => {
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
          Contact Support
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 20, width: "100%" }}>
        {DETAILS.map(({ action, icon, value, subValue }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#2A285F0D",
              }}
            >
              <Pressable
                onPress={action}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 40,
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                >
                  {icon}
                  <View>
                    <AppText variant="medium" style={{ fontSize: 13 }}>
                      {value}
                    </AppText>
                    {subValue && (
                      <AppText
                        variant="medium"
                        size="small"
                        color={Colors.faintBlack}
                        style={{ marginTop: 4 }}
                      >
                        {subValue}
                      </AppText>
                    )}
                  </View>
                </View>
              </Pressable>
            </View>
          );
        })}
        {SOCIALS.map(({ icon, name, route }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#2A285F0D",
              }}
            >
              <Pressable
                onPress={() => router.push(route)}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 40,
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                >
                  {icon}
                  <View>
                    <AppText variant="medium" style={{ fontSize: 13 }}>
                      {name}
                    </AppText>
                  </View>
                </View>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default ContactSupportPage;
