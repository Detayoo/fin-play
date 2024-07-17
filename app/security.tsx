import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

import {
  AppText,
  BackButton,
  Screen,
  SwitchComponent,
  TwoFASetup,
} from "@/components";
import { Password, Pin, SmallFingerprint, TwoFA, UpgradeTier } from "@/assets";
import { useBiometrics } from "@/hooks";
import { ChevronDown } from "@/components/ChevronDown";
import { useAuth } from "@/context";

type Notifications = {
  faceId: boolean;
  fingerprint: boolean;
  "2fa": boolean;
  show2FAModal: boolean;
  transferWithPin: boolean;
};

const SecurityPage = () => {
  const { isBiometricType, isBiometricSupported } = useBiometrics();
  const { biometrics, saveBiometrics } = useAuth();
  const [state, setState] = useState<Notifications>({
    faceId: !!biometrics,
    fingerprint: !!biometrics,
    "2fa": false,
    show2FAModal: false,
    transferWithPin: false,
  });

  const updateState = (payload: Partial<Notifications>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

  const toggleBiometrics = async () => {
    try {
      const authentication = await LocalAuthentication.authenticateAsync({
        promptMessage: "Enable Login with Biometrics",
      });

      if (authentication.success) {
        saveBiometrics(!state.fingerprint);
        saveBiometrics(!state.faceId);
        updateState({
          faceId: !state?.faceId,
          fingerprint: !state.fingerprint,
        });
      }
    } catch (error) {}
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            Security
          </AppText>
          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingTop: 20, width: "100%" }}>
          <Pressable
            onPress={() => router.push("/change-password")}
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
              <Password />
              <AppText variant="medium">Change Password</AppText>
            </View>
            <ChevronDown style={{ transform: [{ rotate: "280deg" }] }} />
          </Pressable>
          <Pressable
            onPress={() => router.push("/change-pin")}
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
              <Pin />
              <AppText variant="medium">Change Transaction Pin</AppText>
            </View>
            <ChevronDown style={{ transform: [{ rotate: "280deg" }] }} />
          </Pressable>
          <Pressable
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
              <Pin />
              <AppText variant="medium">Forgot Transaction Pin</AppText>
            </View>
            <ChevronDown style={{ transform: [{ rotate: "280deg" }] }} />
          </Pressable>
          {!!isBiometricSupported && isBiometricType === 2 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 20,
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
                  }}
                >
                  <UpgradeTier />

                  <AppText variant="medium">Use Face ID</AppText>
                </View>
                <SwitchComponent
                  state={state.faceId}
                  toggleSwitch={toggleBiometrics}
                />
              </Pressable>
            </View>
          )}
          {!!isBiometricSupported && isBiometricType === 1 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 20,
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
                  }}
                >
                  <SmallFingerprint />
                  <AppText variant="medium">Use Fingerprint</AppText>
                </View>
                <SwitchComponent
                  state={state.fingerprint}
                  toggleSwitch={toggleBiometrics}
                />
              </Pressable>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 20,
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
                }}
              >
                <TwoFA />
                <AppText variant="medium">Enable 2FA</AppText>
              </View>
              <SwitchComponent
                state={state["2fa"]}
                toggleSwitch={() => {
                  updateState({
                    // "2fa": !state["2fa"],
                    show2FAModal: true,
                  });
                }}
              />
            </Pressable>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 20,
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
                }}
              >
                <TwoFA />
                <AppText variant="medium">
                  Transfer Using{" "}
                  {isBiometricType === 1
                    ? "Fingerprint"
                    : isBiometricType === 2
                    ? "Face ID"
                    : null}
                </AppText>
              </View>
              <SwitchComponent
                state={state["2fa"]}
                toggleSwitch={() => {
                  updateState({
                    // "2fa": !state["2fa"],
                    transferWithPin: true,
                  });
                }}
              />
            </Pressable>
          </View> */}
        </ScrollView>
      </Screen>
      <TwoFASetup
        showModal={state.show2FAModal}
        setShowModal={(e) =>
          updateState({
            show2FAModal: e,
          })
        }
      />
    </GestureHandlerRootView>
  );
};

export default SecurityPage;
