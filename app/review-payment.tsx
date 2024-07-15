import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  ListItem,
  ReusableBottomSheet,
  OtpField,
  SwitchComponent,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import { BigMtn } from "@/assets";
import { ERRORS, extractServerError, formatMoney } from "@/utils";
import {
  buyAirtimeFn,
  buyBettingPlanFn,
  buyDataFn,
  buyElectricityFn,
  getPointsBalanceFn,
} from "@/services";
import { useAuth } from "@/context";

const ReviewPayment = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [save, setSave] = useState(false);
  const [useCashback, setUseCashback] = useState(false);
  const [pin, setPin] = useState("");
  const {
    amount,
    phoneNumber,
    serviceProvider,
    from,
    tariffId,
    meterNumber,
    vendType,
    disco,
    address,
    accountName,
    customerId,
    provider,
  } = useLocalSearchParams();
  console.log(useLocalSearchParams());

  const [pointsData] = useQueries({
    queries: [
      {
        queryKey: ["points balance"],
        queryFn: () =>
          getPointsBalanceFn({
            token,
          }),
      },
    ],
  });

  const { availablePoint: pointBal = 20 } = pointsData?.data?.data || {};
  const subsidizedAmount = amount && pointBal && +amount - pointBal;

  const { isPending: buyingAirtime, mutateAsync: buyAirtimeAsync } =
    useMutation({
      mutationFn: buyAirtimeFn,
      onSuccess: (data) => {
        router.push({
          pathname: "/payment-receipt",
          params: { ...data?.data, from: "/airtime-payment" },
        });
      },
      onError: (error) => {
        showToast(
          "error",
          extractServerError(error, ERRORS.SOMETHING_HAPPENED)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["points balance"],
        });
      },
    });

  const { isPending: buyingData, mutateAsync: buyDataAsync } = useMutation({
    mutationFn: buyDataFn,
    onSuccess: (data) => {
      router.push({
        pathname: "/payment-receipt",
        params: { ...data?.data, from: "/data-payment" },
      });
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["points balance"],
      });
    },
  });

  const { isPending: buyingElectricity, mutateAsync: buyElectricityAsync } =
    useMutation({
      mutationFn: buyElectricityFn,
      onSuccess: (data) => {
        router.push({
          pathname: "/payment-receipt",
          params: { ...data?.data, from: "/electricity-payment" },
        });
      },
      onError: (error) => {
        showToast(
          "error",
          extractServerError(error, ERRORS.SOMETHING_HAPPENED)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["points balance"],
        });
      },
    });

  const { isPending: buyingBettingPlan, mutateAsync: buyBettingPlanAsync } =
    useMutation({
      mutationFn: buyBettingPlanFn,
      onSuccess: (data) => {
        router.push({
          pathname: "/payment-receipt",
          params: { ...data?.data, from: "/betting-payment" },
        });
      },
      onError: (error) => {
        showToast(
          "error",
          extractServerError(error, ERRORS.SOMETHING_HAPPENED)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["points balance"],
        });
      },
    });

  const makePayment = async () => {
    try {
      if (from === "/buy-airtime") {
        await buyAirtimeAsync({
          payload: {
            amount: amount ? +amount : 0,
            networkProvider: serviceProvider,
            phoneNumber,
            usePoint: useCashback,
          },
          token,
        });
      }
      if (from === "/buy-data") {
        await buyDataAsync({
          payload: {
            tariffId: tariffId,
            networkProvider: serviceProvider,
            phoneNumber,
          },
          token,
        });
      }
      if (from === "/buy-electricity") {
        await buyElectricityAsync({
          payload: {
            amount: amount ? +amount : 0,
            disco,
            meter: meterNumber,
            vendType,
          },
          token,
        });
      }
      if (from === "/buy-betting") {
        await buyBettingPlanAsync({
          payload: {
            amount: amount ? +amount : 0,
            customerId,
            provider,
          },
          token,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (pin.length === 4) {
      makePayment();
    }
  }, [pin]);

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
            Review Payment
          </AppText>
          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: "#90AD0408",
            paddingTop: 20,
            paddingBottom: 30,
            borderRadius: 10,
            marginTop: 15,
            shadowColor: "#ABABAB1A",
            shadowOffset: { width: 4, height: 6 },
            shadowOpacity: 4,
            shadowRadius: 1,
            elevation: 2,
            paddingHorizontal: 16,
          }}
        >
          <BigMtn />
          <AppText style={{ marginTop: 14 }} size="xlarge" variant="medium">
            NGN {formatMoney(amount)}
          </AppText>
          <AppText
            style={{
              marginTop: 10,
              paddingBottom: 30,
              width: "100%",
              textAlign: "center",
            }}
          >
            {format(new Date(), "MMMM dd, yyyy hh:mma")}
          </AppText>

          <View
            style={{
              gap: 30,
              width: "100%",
              paddingTop: 35,
              borderTopWidth: 1,
              borderTopColor: "#EDEDED",
            }}
          >
            {meterNumber && (
              <ListItem name="Meter Number" value={meterNumber} />
            )}
            {provider && <ListItem name="Service Provider" value={provider} />}
            {disco && <ListItem name="Service Provider" value={disco} />}
            {customerId && <ListItem name="Customer ID" value={customerId} />}
            {accountName && (
              <ListItem
                name={
                  from === "/buy-electricity"
                    ? "Meter Name"
                    : from === "/buy-betting"
                    ? "Customer Name"
                    : "Account Name"
                }
                value={accountName}
              />
            )}
            {vendType && <ListItem name="Account Type" value={vendType} />}
            {address && <ListItem name="Address" value={address} />}
            {phoneNumber && (
              <ListItem name="Phone Number" value={phoneNumber} />
            )}
            <ListItem
              name="Amount to pay (NGN)"
              value={
                useCashback
                  ? formatMoney(subsidizedAmount || "0")
                  : formatMoney(amount || "0")
              }
            />
            {serviceProvider && (
              <ListItem name="Network Provider" value={serviceProvider} />
            )}
            <ListItem name="Cashback" value={`${pointBal || 0}`} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText color={Colors.faintBlack}>Use cashback</AppText>
              <View>
                <SwitchComponent
                  state={useCashback}
                  toggleSwitch={() => setUseCashback(!useCashback)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText color={Colors.faintBlack}>Save as Beneficiary</AppText>
              <SwitchComponent
                state={save}
                toggleSwitch={() => setSave(!save)}
              />
            </View>
          </View>
        </ScrollView>
        <PrimaryButton
          onPress={() => setShowModal(true)}
          style={{ marginTop: 50 }}
          label="Send Payment"
          disabled={
            buyingAirtime ||
            buyingData ||
            buyingElectricity ||
            buyingBettingPlan
          }
        />
      </Screen>
      <ReusableBottomSheet
        snapPoints={["75%"]}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <View style={{ paddingTop: 20, height: 300 }}>
          <AppText size="xxlarge" variant="medium">
            Enter PIN
          </AppText>
          <AppText color={Colors.faintBlack} style={{ marginTop: 16 }}>
            Proceed with your 4-digit PIN to complete this transaction.
          </AppText>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
                width: "60%",
              }}
            >
              <OtpField
                autoFocus={showModal}
                code={pin}
                setCode={setPin}
                count={4}
              />
            </View>
          </View>
        </View>
      </ReusableBottomSheet>
    </GestureHandlerRootView>
  );
};

export default ReviewPayment;
