import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQueries } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { Formik } from "formik";
import { Contact } from "expo-contacts";

import {
  AppText,
  BackButton,
  PhoneContacts,
  PrimaryButton,
  Screen,
  SelectField,
  SelectPlaceholder,
  TextField,
} from "@/components";
import { Recipient } from "@/assets";
import { getAirtimeProvidersFn, getDataPlansFn } from "@/services";
import { useAuth } from "@/context";
import { buyDataSchema } from "@/utils";
import { DataPlan } from "@/types";

type Options = { id: number; label: string }[];
type State = {
  serviceProvider: any;
  options: Options;
  modal: boolean;
  selectedContact: null | Contact;
  selectedPlan: DataPlan | null;
};

type DataForm = {
  phoneNumber: string | undefined;
  serviceProvider: string;
};

const BuyDataPage = () => {
  const { token } = useAuth();
  const { type } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);

  const [dataPlans, providersData] = useQueries({
    queries: [
      {
        queryKey: ["data plans"],
        queryFn: () => getDataPlansFn({ token }),
      },
      {
        queryKey: ["data providers"],
        queryFn: () => getAirtimeProvidersFn({ token }),
      },
    ],
  });

  const [state, setState] = useState<State>({
    modal: false,
    serviceProvider: null,
    options:
      providersData?.data?.data?.providers?.map((each, index) => ({
        id: index + 1,
        label: each,
      })) || [],
    selectedContact: null,
    selectedPlan: null,
  });
  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const providersPlans = [
    {
      price: 250,
      tariff_type_id: "DATA-823",
      name: "Youtube_N250 500MB SocialPlan",
      category: "GLO",
    },
  ];

  const selectedTariff = dataPlans?.data?.data?.provider?.find(
    (each) => state.selectedPlan?.tariff_type_id === each?.tariff_type_id
  );

  const onSubmit = async (values: DataForm) => {
    try {
      router.push({
        pathname: "/review-payment",
        params: {
          ...values,
          amount: selectedTariff?.price,
          tariffId: selectedTariff?.tariff_type_id,
          from: "/buy-data",
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
                enableReinitialize
                initialValues={{
                  phoneNumber: state?.selectedContact?.phoneNumbers
                    ? state?.selectedContact?.phoneNumbers[0]?.number?.replace(
                        /[\s-]/g,
                        ""
                      )
                    : "",
                  serviceProvider: state?.serviceProvider?.label || "",
                }}
                onSubmit={onSubmit}
                validationSchema={buyDataSchema}
              >
                {({
                  isValid,
                  handleSubmit,
                  values,
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                }) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        position: "relative",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 20,
                          position: "relative",
                        }}
                      >
                        <View style={{ width: "85%" }}>
                          <TextField
                            onChange={handleChange("phoneNumber")}
                            onBlur={handleBlur("phoneNumber")}
                            value={values.phoneNumber}
                            placeholder="Enter recipient's phone number"
                            errors={errors.phoneNumber}
                            touched={touched.phoneNumber}
                            label="Phone Number"
                            maxLength={11}
                            keyboardType="number-pad"
                          />
                        </View>
                        <Pressable
                          onPress={() =>
                            updateState({
                              modal: true,
                            })
                          }
                          style={{ position: "absolute", bottom: 30, right: 0 }}
                        >
                          <Recipient />
                        </Pressable>
                      </View>

                      <SelectPlaceholder
                        label={
                          state.serviceProvider?.label ??
                          "Select service provider"
                        }
                        onSelect={() => setShowModal(true)}
                        title="Service Provider"
                      />

                      {values.serviceProvider && (
                        <>
                          <AppText
                            variant="medium"
                            style={{ marginTop: 30, marginBottom: 20 }}
                          >
                            Data Bundles
                          </AppText>
                          <View style={{ gap: 20 }}>
                            {dataPlans?.data?.data?.provider?.map(
                              (each, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      updateState({
                                        selectedPlan: each,
                                      });

                                      setTimeout(() => {
                                        handleSubmit();
                                      }, 200);
                                    }}
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <AppText style={{ width: "70%" }}>
                                      {each.name} valid for 2 days, available at
                                      NGN
                                      {each.price}
                                    </AppText>
                                    <View style={{ gap: 4, width: "20%" }}>
                                      <AppText size="small">Cashback</AppText>
                                      <AppText>NGN1.00</AppText>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }
                            )}
                          </View>
                        </>
                      )}
                      <PrimaryButton
                        onPress={() => handleSubmit()}
                        label="Proceed to Payment"
                        style={{
                          marginTop: 20,
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: "100%",
                        }}
                        disabled={!isValid || !selectedTariff}
                      />
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </Screen>
        </View>

        <SelectField
          options={[
            { id: 1, label: "MTN" },
            { id: 2, label: "GLO" },
          ]}
          visible={showModal}
          setVisible={setShowModal}
          setSelectedOption={(e: any) => {
            updateState({
              serviceProvider: e,
            });
          }}
        />

        <PhoneContacts
          setSelectedContact={(e) => {
            updateState({
              selectedContact: e,
            });
          }}
          showModal={state.modal}
          setShowModal={(e) =>
            updateState({
              modal: e,
            })
          }
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default BuyDataPage;
