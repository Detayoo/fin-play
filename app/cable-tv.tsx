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
import {
  getBouquetsFn,
  getTVProvidersFn,
  getUserTvDetailsFn,
} from "@/services";
import { useAuth } from "@/context";
import { buyBouquetSchema } from "@/utils";

type State = {
  serviceProvider: any;
  modal: boolean;
  typeModal: boolean;
  packageType: any;
  smartCardNumber: string;
};

type ElectricityForm = {
  smartCardNumber: string | undefined;
};
const TVPage = () => {
  const { token } = useAuth();
  const { type } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState<State>({
    modal: false,
    typeModal: false,
    serviceProvider: null,
    packageType: "",
    smartCardNumber: "",
  });

  const [providersData, userAccountData, bouquetData] = useQueries({
    queries: [
      {
        queryKey: ["tv providers"],
        queryFn: () => getTVProvidersFn({ token }),
      },
      {
        queryKey: [
          "user tv details",
          state?.smartCardNumber,
          state.serviceProvider,
        ],
        queryFn: () =>
          getUserTvDetailsFn({
            token,
            provider: state.serviceProvider?.label,
            smartCardNumber: state?.smartCardNumber,
          }),
        enabled: !!(
          state.serviceProvider?.label &&
          state.packageType?.label &&
          state?.smartCardNumber?.length === 10
        ),
      },
      {
        queryKey: ["bouquet list"],
        queryFn: () => getBouquetsFn({ token }),
        enabled: !!state?.serviceProvider,
      },
    ],
  });

  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const handlesmartCardNumberChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    updateState({
      smartCardNumber: value,
    });
    setFieldValue("smartCardNumber", value);
  };

  const [providerOptions, setProviderOptions] = useState<any>([]);

  useEffect(() => {
    if (providersData?.data?.data?.providers) {
      setProviderOptions(
        providersData?.data?.data?.providers?.map((each, index: number) => ({
          id: index + 1,
          label: each,
        }))
      );
    }
  }, [providersData?.data?.data?.providers]);

  const { accountName } = userAccountData?.data?.data || {};

  const selectedPackage = bouquetData?.data?.data[state.serviceProvider]?.find(
    (each) => state.packageType?.name === each?.name
  );

  const onSubmit = async (values: ElectricityForm) => {
    try {
      router.push({
        pathname: "/review-payment",
        params: {
          ...values,
          ...userAccountData?.data?.data,
          bouquetProductKey: selectedPackage?.productKey,
          requestId: selectedPackage?.bouquetId,
          provider: state.serviceProvider,
          amount: selectedPackage?.amount,
          from: "/buy-tv",
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
                  smartCardNumber: "",
                }}
                onSubmit={onSubmit}
                validationSchema={buyBouquetSchema}
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
                      {/* {state.serviceProvider?.label && ( */}
                        <>
                          <SelectPlaceholder
                            label={
                              state.packageType?.label ?? "Select package"
                            }
                            onSelect={() =>
                              updateState({
                                typeModal: true,
                              })
                            }
                            title="Select Package"
                          />

                          <TextField
                            onChange={(value: string) =>
                              handlesmartCardNumberChange(value, setFieldValue)
                            }
                            onBlur={handleBlur("smartCardNumber")}
                            value={values.smartCardNumber}
                            placeholder="Enter SmartCard Number"
                            errors={errors.smartCardNumber}
                            touched={touched.smartCardNumber}
                            label="SmartCard Number"
                            keyboardType="number-pad"
                            maxLength={10}
                          />
                          {userAccountData.isFetching ? (
                            <AppText style={{ marginTop: -30 }}>
                              Fetching Details..
                            </AppText>
                          ) : (
                            state?.smartCardNumber?.length === 10 &&
                            accountName && (
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
                                  {accountName}
                                </AppText>
                              </View>
                            )
                          )}

                          <PrimaryButton
                            disabled={
                              !!(
                                !isValid ||
                                !state.serviceProvider ||
                                !accountName ||
                                state?.packageType
                              )
                            }
                            onPress={() => handleSubmit()}
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
                      {/* )} */}
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </Screen>
        </View>

        <SelectField
          options={bouquetData?.data?.data[state?.serviceProvider]?.map(
            (each, index) => ({ id: index + 1, label: each })
          )}
          visible={state.typeModal}
          setVisible={(e) => {
            updateState({
              typeModal: e,
            });
          }}
          setSelectedOption={(e: any) => {
            updateState({
              packageType: e,
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

export default TVPage;
