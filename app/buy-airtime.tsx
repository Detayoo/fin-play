import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
  showToast,
} from "@/components";
import { Recipient } from "@/assets";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buyAirtimeFn, getAirtimeProvidersFn } from "@/services";
import { useAuth } from "@/context";
import { ERRORS, buyAirtimeSchema, extractServerError } from "@/utils";

type Options = { id: number; label: string }[];
type State = {
  serviceProvider: any;
  options: Options;
  modal: boolean;
  selectedContact: null | Contact;
};

type AirtimeForm = {
  amount: string;
  serviceProvider: string;
  phoneNumber: string | undefined;
};
const BuyAirtimePage = () => {
  const { token } = useAuth();
  const { type } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState<State>({
    modal: false,
    serviceProvider: null,
    options: [
      { id: 1, label: "MTN" },
      { id: 2, label: "GLO" },
    ],
    selectedContact: null,
  });
  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const { data: providersData } = useQuery({
    queryKey: ["airtime providers"],
    queryFn: () => getAirtimeProvidersFn({ token }),
  });

  const onSubmit = async (values: AirtimeForm) => {
    try {
      router.push({
        pathname: "/review-payment",
        params: { ...values, from: "/buy-airtime" },
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
                  amount: "",
                  serviceProvider: state?.serviceProvider?.label || "",
                }}
                onSubmit={onSubmit}
                validationSchema={buyAirtimeSchema}
              >
                {({
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

                      <View style={{ marginTop: 20 }}>
                        <TextField
                          onChange={handleChange("amount")}
                          onBlur={handleBlur("amount")}
                          value={values.amount}
                          placeholder="Enter amount"
                          errors={errors.amount}
                          touched={touched.amount}
                          label="Amount"
                          maxLength={10}
                          keyboardType="number-pad"
                        />
                      </View>
                      <AppText size="small" style={{ marginTop: -16 }}>
                        You will be charged NGN 49.00 for your purchase
                      </AppText>

                      <AppText style={{ marginTop: 30, marginBottom: 20 }}>
                        Or select airtime amount
                      </AppText>
                      <View style={{ gap: 20 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <AppText>NGN50.00</AppText>
                          <View style={{ gap: 4 }}>
                            <AppText size="small">Cashback</AppText>
                            <AppText>NGN1.00</AppText>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <AppText>NGN100.00</AppText>
                          <View style={{ gap: 4 }}>
                            <AppText size="small">Cashback</AppText>
                            <AppText>NGN2.00</AppText>
                          </View>
                        </View>
                      </View>
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
          setSelectedOption={(e: any) =>
            updateState({
              serviceProvider: e,
            })
          }
          // snapPoints={["30%"]}
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

export default BuyAirtimePage;
