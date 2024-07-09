import { Pressable, ScrollView, View } from "react-native";
import { useState } from "react";

import { AppText, BackButton, Screen, SwitchComponent } from "@/components";
import { PushNotification } from "@/assets";

type Notifications = {
  pushNotification: boolean;
  emailNotification: boolean;
};

const PreferencesPage = () => {
  const [state, setState] = useState<Notifications>({
    pushNotification: false,
    emailNotification: false,
  });

  const updateState = (payload: Partial<Notifications>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

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
          User Profile
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 20, width: "100%" }}>
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
              <PushNotification />
              <AppText variant="medium">Push Notification</AppText>
            </View>
            <SwitchComponent
              state={state.pushNotification}
              toggleSwitch={() =>
                updateState({
                  pushNotification: !state.pushNotification,
                })
              }
            />
          </Pressable>
        </View>
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
              <PushNotification />
              <AppText variant="medium">Email Notification</AppText>
            </View>
            <SwitchComponent
              state={state.emailNotification}
              toggleSwitch={() =>
                updateState({
                  emailNotification: !state.emailNotification,
                })
              }
            />
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default PreferencesPage;
