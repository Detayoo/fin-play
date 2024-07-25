import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

import {
  AppText,
  BackButton,
  Loading,
  Screen,
  SwitchComponent,
  showToast,
} from "@/components";
import { Password, Pin, SmallFingerprint, TwoFA, UpgradeTier } from "@/assets";
import { useBiometrics } from "@/hooks";
import { ChevronDown } from "@/components/ChevronDown";
import { useAuth } from "@/context";
import { TwoFASetup } from "@/modals";
import { useMutation, useQueries } from "@tanstack/react-query";
import { getTwoFAStatusFn, setTwoFAFn, useR } from "@/services";
import { ERRORS, extractServerError } from "@/utils";
import { Spinner } from "@/components/Spinner";
import { Notifications } from "@/types";

const SecurityPage = () => {
  const { isBiometricType, isBiometricSupported } = useBiometrics();
  const { biometrics, saveBiometrics, token } = useAuth();
  const [stage, setStage] = useState(1);
  const { data: userData } = useR({
    token,
  });

  const [twoFAData] = useQueries({
    queries: [
      {
        queryKey: ["2fa status"],
        queryFn: () => getTwoFAStatusFn({ token }),
      },
    ],
  });

  const [state, setState] = useState<Notifications>({
    faceId: !!biometrics,
    fingerprint: !!biometrics,
    "2fa": !!twoFAData?.data?.data?.is2FAEnabled,
    show2FAModal: false,
    transferWithPin: false,
  });

  const updateState = (payload: Partial<Notifications>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };

  useEffect(() => {
    updateState({
      "2fa": !!twoFAData?.data?.data?.is2FAEnabled,
    });
  }, [twoFAData?.data?.data?.is2FAEnabled]);

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: setTwoFAFn,
    onSuccess: () => {
      if (twoFAData?.data?.data?.is2FAEnabled) {
        setStage(2);
      }
      setTimeout(() => {
        updateState({
          show2FAModal: true,
        });
      }, 500);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const handle2faSetup = async () => {
    if (userData?.data?.hasSecret) {
      setStage(2);
      setTimeout(() => {
        updateState({
          show2FAModal: true,
        });
      }, 500);
      return;
    }

    try {
      await mutateAsync({
        toggle: !state["2fa"],
        token,
      });
    } catch (error) {}
  };

  // console.log(isBiometricType, 't', isBiometricSupported, '?')

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
        {twoFAData?.isFetching ? (
          <Loading />
        ) : (
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
                {isPending ? (
                  <View style={{ marginLeft: "auto" }}>
                    <Spinner size={30} />
                  </View>
                ) : (
                  <SwitchComponent
                    state={state["2fa"]}
                    toggleSwitch={handle2faSetup}
                  />
                )}
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
        )}
      </Screen>
      <TwoFASetup
        showModal={state.show2FAModal}
        setShowModal={(e) =>
          updateState({
            show2FAModal: e,
          })
        }
        secretKey={data?.data?.secret}
        stage={stage}
        setStage={setStage}
        state={state}
        updateState={updateState}
        userData={userData}
      />
    </GestureHandlerRootView>
  );
};

export default SecurityPage;
