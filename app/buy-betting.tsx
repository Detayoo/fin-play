import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQueries } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Formik } from "formik";
import { Contact } from "expo-contacts";

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
import {
  checkMeterFn,
  getBettingProvidersFn,
  getElectricityProvidersFn,
  getUserBettingDetailsFn,
} from "@/services";
import { useAuth } from "@/context";
import { bettingSchema, buyElectricitySchema, formatMoney } from "@/utils";

type Options = { id: number; label: string }[];
type State = {
  serviceProvider: any;
  options: Options;
  modal: boolean;
  typeModal: boolean;
  selectedContact: null | Contact;
  selectedType: any;
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
    modal: false,
    typeModal: false,
    serviceProvider: null,
    options: [
      { id: 1, label: "MTN" },
      { id: 2, label: "GLO" },
    ],
    selectedContact: null,
    selectedType: "",
    customerId: "",
    amount: "",
  });
  const updateState = (payload: any) => {
    setState((prevState: any) => ({ ...prevState, ...payload }));
  };

  const handlecustomerIdChange = (
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
        queryKey: ["user betting details"],
        queryFn: () =>
          getUserBettingDetailsFn({
            token,
            customerId: state?.customerId,
            provider: state?.serviceProvider,
          }),
        // enabled: !!(state.serviceProvider?.label && state.selectedType?.label),
      },
    ],
  });

  const { minimumAmountPayable, accountName } = userAccountData?.data?.data || {};

  useEffect(() => {
    if (
      minimumAmountPayable &&
      state.amount &&
      +minimumAmountPayable > +state?.amount
    ) {
      showToast(
        "error",
        "This amount is lesser than the minimum payable amount"
      );
      return;
    }
  }, [state?.amount, minimumAmountPayable]);

  console.log("useraccountdata", userAccountData?.data?.data?.accountName);

  const [providerOptions, setProviderOptions] = useState(
    providersData?.data?.data?.providers?.map(
      (each: string, index: number) => ({
        id: index + 1,
        label: each,
      })
    )
  );

  const onSubmit = async (values: BettingForm) => {
    try {
      router.push({
        pathname: "/review-payment",
        params: {
          ...values,
          ...userAccountData?.data?.data,

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
                  handleChange,
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
                        // onChange={handleChange("customerId")}
                        onChange={(value: string) =>
                          handlecustomerIdChange(value, setFieldValue)
                        }
                        onBlur={handleBlur("customerId")}
                        value={values.customerId}
                        placeholder="Enter Customer ID"
                        errors={errors.customerId}
                        touched={touched.customerId}
                        label="Customer ID"
                        keyboardType="number-pad"
                      />

                      {!!accountName && <View
                        style={{
                          marginTop: -20,
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <Recipient />
                        <AppText variant="medium">
                          {accountName}
                        </AppText>
                      </View>}

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

                      <PrimaryButton
                        disabled={!isValid || !state.serviceProvider}
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
          options={[
            { id: 1, label: "Bet9ja" },
            { id: 2, label: "NairaBet" },
          ]}
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
