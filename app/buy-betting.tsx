import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQueries } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Formik } from "formik";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  SelectField,
  SelectPlaceholder,
  TextField,
  showToast,
} from "@/components";
import { Recipient } from "@/assets";
import { getBettingProvidersFn, getUserBettingDetailsFn } from "@/services";
import { useAuth } from "@/context";
import { bettingSchema, formatMoney } from "@/utils";

type State = {
  serviceProvider: any;
  customerId: string;
  amount: string;
};

type BettingForm = {
  amount: string;
  customerId: string | undefined;
};
const BuyBettingPage = () => {
  const { token } = useAuth();
  const { type } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState<State>({
    serviceProvider: null,
    customerId: "",
    amount: "",
  });
  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const handleCustomerIdChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    updateState({
      customerId: value,
    });
    setFieldValue("customerId", value);
  };
  const handleAmountChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    updateState({
      amount: value,
    });
    setFieldValue("amount", value);
  };

  const [providersData, userAccountData] = useQueries({
    queries: [
      {
        queryKey: ["betting providers"],
        queryFn: () => getBettingProvidersFn({ token }),
      },
      {
        queryKey: [
          "user betting details",
          state.serviceProvider?.label,
          state?.customerId,
        ],
        queryFn: () =>
          getUserBettingDetailsFn({
            token,
            customerId: state?.customerId,
            provider: state?.serviceProvider?.label,
          }),
        enabled: !!(state.serviceProvider?.label && state.customerId?.length),
      },
    ],
  });

  const { minimumAmountPayable, accountName } =
    userAccountData?.data?.data?.transaction?.details || {};

  // useEffect(() => {
  //   if (
  //     minimumAmountPayable &&
  //     state.amount &&
  //     +minimumAmountPayable > +state?.amount
  //   ) {
  //     showToast(
  //       "error",
  //       "This amount is lesser than the minimum payable amount"
  //     );
  //     return;
  //   }
  // }, [state?.amount, minimumAmountPayable]);

  const onSubmit = async (values: BettingForm) => {
    try {
      router.push({
        pathname: "/review-payment",
        params: {
          // ...values,
          amount: values.amount,
          serviceProvider: state.serviceProvider?.label,
          ...userAccountData?.data?.data?.transaction?.details,
          from: "/buy-betting",
        },
      });
      return;
    } catch (error) {}
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
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
                Buy {type}
              </AppText>
              <BackButton
                style={{
                  opacity: 0,
                }}
              />
            </View>
            <ScrollView
              contentContainerStyle={{ paddingTop: 20, flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <Formik
                initialValues={{
                  amount: "",
                  customerId: "",
                }}
                onSubmit={onSubmit}
                validationSchema={bettingSchema}
              >
                {({
                  handleSubmit,
                  values,
                  errors,
                  handleBlur,
                  touched,
                  isValid,
                  setFieldValue,
                }) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        position: "relative",
                        gap: 20,
                      }}
                    >
                      <SelectPlaceholder
                        label={
                          state.serviceProvider?.label ??
                          "Select a service provider"
                        }
                        onSelect={() => setShowModal(true)}
                        title="Select Service Provider"
                      />

                      <TextField
                        onChange={(value: string) =>
                          handleCustomerIdChange(value, setFieldValue)
                        }
                        onBlur={handleBlur("customerId")}
                        value={values.customerId}
                        placeholder="Enter Customer ID"
                        errors={errors.customerId}
                        touched={touched.customerId}
                        label="Customer ID"
                        keyboardType="number-pad"
                      />

                      {userAccountData?.isFetching ? (
                        <AppText
                          style={{
                            marginTop: -20,
                          }}
                        >
                          Fetching User..
                        </AppText>
                      ) : (
                        !!accountName && (
                          <View
                            style={{
                              marginTop: -20,
                              flexDirection: "row",
                              gap: 10,
                              alignItems: "center",
                            }}
                          >
                            <Recipient />
                            <AppText variant="medium">{accountName}</AppText>
                          </View>
                        )
                      )}

                      <View style={{}}>
                        <TextField
                          onChange={(value: string) =>
                            handleAmountChange(value, setFieldValue)
                          }
                          onBlur={handleBlur("amount")}
                          value={values.amount}
                          placeholder="Enter amount"
                          errors={errors.amount}
                          touched={touched.amount}
                          label="Amount"
                          keyboardType="number-pad"
                        />
                      </View>

                      {minimumAmountPayable && (
                        <AppText>
                          Minimum Payable Amount - NGN
                          {formatMoney(minimumAmountPayable)}
                        </AppText>
                      )}

                      <PrimaryButton
                        disabled={
                          !!(
                            !isValid ||
                            !state.serviceProvider ||
                            !accountName ||
                            (minimumAmountPayable &&
                              +minimumAmountPayable > +state?.amount)
                          )
                        }
                        onPress={
                          minimumAmountPayable &&
                          +minimumAmountPayable > +state?.amount
                            ? () => {}
                            : () => handleSubmit()
                        }
                        label="Proceed to Payment"
                        style={{
                          marginTop: 20,
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: "100%",
                        }}
                      />
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </Screen>
        </View>

        <SelectField
          options={providersData?.data?.data?.providers?.map(
            (each: string, index: number) => ({
              id: index + 1,
              label: each,
            })
          )}
          visible={showModal}
          setVisible={setShowModal}
          setSelectedOption={(e: any) => {
            updateState({
              serviceProvider: e,
            });
          }}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BuyBettingPage;
