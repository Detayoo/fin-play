import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Formik } from "formik";

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

type Options = { id: number; label: string }[];
type State = {
  serviceProvider: any;
  options: Options;
  modal: boolean;
};
const BuyAirtimePage = () => {
  const { type } = useLocalSearchParams();
  const [state, setState] = useState<any>({
    modal: false,
    serviceProvider: null,
    options: [
      { id: 1, label: "MTN" },
      { id: 2, label: "GLO" },
    ],
  });

  console.log("state", state);

  const [showModal, setShowModal] = useState(false);
  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const onSubmit = (values: any) => {
    router.push({
      pathname: "/review-payment",
      params: values,
    });
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
                  phoneNumber: "",
                  amount: "",
                  serviceProvider: "",
                }}
                onSubmit={onSubmit}
                //   validationSchema={validationSchema}
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
          options={state.options}
          visible={showModal}
          setVisible={setShowModal}
          setSelectedOption={(e: any) =>
            updateState({
              serviceProvider: e,
            })
          }
        />

        <PhoneContacts
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
