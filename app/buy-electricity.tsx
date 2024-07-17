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
  Loading,
  PrimaryButton,
  Screen,
  SelectField,
  SelectPlaceholder,
  TextField,
} from "@/components";
import { Recipient } from "@/assets";
import { checkMeterFn, getElectricityProvidersFn } from "@/services";
import { useAuth } from "@/context";
import { buyElectricitySchema, formatMoney } from "@/utils";

type Options = { id: number; label: string }[];
type State = {
  serviceProvider: any;
  options: Options;
  modal: boolean;
  typeModal: boolean;
  selectedType: any;
  meterNumber: string;
  amount: "";
};

type ElectricityForm = {
  amount: string;
  meterNumber: string | undefined;
};
const BuyElectricityPage = () => {
  const { token } = useAuth();
  const { type } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState<State>({
    modal: false,
    typeModal: false,
    serviceProvider: null,
    options: [
      { id: 1, label: "MTN" },
      { id: 2, label: "GLO" },
    ],
    selectedType: "",
    meterNumber: "",
    amount: "",
  });

  const [providersData, userAccountData] = useQueries({
    queries: [
      {
        queryKey: ["electricity providers"],
        queryFn: () => getElectricityProvidersFn({ token }),
      },
      {
        queryKey: [
          "user electricity details",
          state?.meterNumber,
          state.selectedType,
          state.serviceProvider,
        ],
        queryFn: () =>
          checkMeterFn({
            token,
            disco: state.serviceProvider?.label,
            meter: state?.meterNumber,
            type: state.selectedType?.label,
          }),
        enabled: !!(
          state.serviceProvider?.label &&
          state.selectedType?.label &&
          state?.meterNumber?.length === 11
        ),
      },
    ],
  });

  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const handleMeterNumberChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    updateState({
      meterNumber: value,
    });
    setFieldValue("meterNumber", value);
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

  const [providerOptions, setProviderOptions] = useState<any>([]);

  useEffect(() => {
    if (providersData?.data?.data?.availableDiscos) {
      setProviderOptions(
        providersData?.data?.data?.availableDiscos?.map(
          (each, index: number) => ({
            id: index + 1,
            label: each,
          })
        )
      );
    }
  }, [providersData?.data?.data?.availableDiscos]);
  const { minimumAmountPayable, maximumAmountPayable } =
    userAccountData?.data?.data?.data?.meterDetails || {};

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
  //   if (
  //     maximumAmountPayable &&
  //     state.amount &&
  //     +maximumAmountPayable < +state?.amount
  //   ) {
  //     showToast(
  //       "error",
  //       "This amount is greater than the minimum payable amount"
  //     );
  //   }
  // }, [state?.amount, minimumAmountPayable, maximumAmountPayable]);

  const onSubmit = async (values: ElectricityForm) => {
    try {
      router.push({
        pathname: "/review-payment",
        params: {
          ...values,
          ...userAccountData?.data?.data?.data?.meterDetails,

          from: "/buy-electricity",
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
                  meterNumber: "",
                }}
                onSubmit={onSubmit}
                validationSchema={buyElectricitySchema}
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
                      {state.serviceProvider?.label && (
                        <>
                          <SelectPlaceholder
                            label={
                              state.selectedType?.label ??
                              "Select an account type"
                            }
                            onSelect={() =>
                              updateState({
                                typeModal: true,
                              })
                            }
                            title="Select Account Type"
                          />

                          <TextField
                            onChange={(value: string) =>
                              handleMeterNumberChange(value, setFieldValue)
                            }
                            onBlur={handleBlur("meterNumber")}
                            value={values.meterNumber}
                            placeholder="Enter meter number"
                            errors={errors.meterNumber}
                            touched={touched.meterNumber}
                            label="Meter Number"
                            keyboardType="number-pad"
                            length={11}
                          />
                          {userAccountData.isFetching && (
                            <AppText style={{ marginTop: -30 }}>
                              Fetching Meter Details..
                            </AppText>
                          )}

                          {state?.meterNumber?.length === 11 &&
                            userAccountData?.data?.data?.data?.meterDetails
                              ?.accountName && (
                              <View
                                style={{
                                  marginTop: -30,
                                  flexDirection: "row",
                                  gap: 10,
                                  alignItems: "center",
                                }}
                              >
                                <Recipient />
                                <AppText variant="medium">
                                  {
                                    userAccountData?.data?.data?.data
                                      ?.meterDetails?.accountName
                                  }
                                </AppText>
                              </View>
                            )}

                          <View style={{ marginTop: -10 }}>
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
                          {minimumAmountPayable && maximumAmountPayable && (
                            <View>
                              <AppText>
                                Minimum Payable Amount - NGN
                                {formatMoney(minimumAmountPayable)}
                              </AppText>
                              <AppText>
                                Maximum Payable Amount - NGN{" "}
                                {formatMoney(maximumAmountPayable)}
                              </AppText>
                            </View>
                          )}

                          <PrimaryButton
                            disabled={
                              !!(
                                !isValid ||
                                !state.selectedType ||
                                !state.serviceProvider ||
                                !userAccountData?.data?.data?.data?.meterDetails
                                  ?.accountName ||
                                (maximumAmountPayable &&
                                  +maximumAmountPayable < +state?.amount) ||
                                (minimumAmountPayable &&
                                  +minimumAmountPayable > +state?.amount)
                              )
                            }
                            onPress={
                              (maximumAmountPayable &&
                                +maximumAmountPayable < +state?.amount) ||
                              (minimumAmountPayable &&
                                +minimumAmountPayable > +state?.amount)
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
                        </>
                      )}
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </Screen>
        </View>

        <SelectField
          options={[
            { id: 1, label: "PREPAID" },
            { id: 2, label: "POSTPAID" },
          ]}
          visible={state.typeModal}
          setVisible={(e) => {
            updateState({
              typeModal: e,
            });
          }}
          setSelectedOption={(e: any) => {
            updateState({
              selectedType: e,
            });
          }}
        />
        <SelectField
          options={providerOptions}
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

export default BuyElectricityPage;
