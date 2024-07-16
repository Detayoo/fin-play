import { useState } from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  SelectField,
  SelectPlaceholder,
  TextField,
  UploadField,
  showToast,
} from "@/components";
import { Colors } from "@/constants";
import {
  ERRORS,
  extractServerError,
  ninValidationSchema,
  tierThreeSchema,
} from "@/utils";
import { upgradeAccountFn } from "@/services";
import { useAuth } from "@/context";
import { UTILITY_TYPE, states } from "@/data";

const TierThreeUpgrade = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [image, setImage] = useState("");

  const [state, setState] = useState<{
    label: string;
    id: number;
  } | null>(null);
  const [type, setType] = useState<{
    label: string;
    id: number;
  } | null>(null);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: upgradeAccountFn,
    onSuccess: (data) => {
      showToast("success", data?.message);
      queryClient.invalidateQueries({
        queryKey: ["user profile"],
      });

      setTimeout(() => {
        router.replace("/initiate-upgrade");
      }, 1000);
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });
  const onSubmit = async (
    values: { address: string; city: string },
    { resetForm }: any
  ) => {
    const formData = new FormData();
    formData.append("type", type?.label ?? "");
    formData.append("proofOfAddress", image);
    formData.append("address", values.address);
    formData.append("state", state?.label ?? "");
    formData.append("city", values.city);
    try {
      await mutateAsync({
        token,
        tier: "3",
        payload: formData,
      });
    } catch (error) {}
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Screen>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BackButton />
            <AppText variant="medium">Upgrade to Tier 3</AppText>
            <BackButton style={{ opacity: 0 }} />
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 20,
              // flex: 1,
              // backgroundColor: "red",
              marginBottom: 1000,
            }}
            showsVerticalScrollIndicator={false}
          >
            <AppText style={{ fontSize: 16 }} variant="medium">
              Please provide the following proof of address:
            </AppText>

            <Formik
              initialValues={{ address: "", city: "" }}
              onSubmit={onSubmit}
              validationSchema={tierThreeSchema}
            >
              {({
                handleSubmit,
                values,
                errors,
                handleBlur,
                handleChange,
                touched,
                isValid,
              }) => {
                return (
                  <View
                    style={{
                      marginTop: 40,
                      gap: 20,
                    }}
                  >
                    <SelectPlaceholder
                      label={type?.label ?? "Select Utility Type"}
                      onSelect={() => setShowTypeModal(true)}
                      title="Utility Type"
                    />

                    <UploadField
                      label="Upload Proof of Address"
                      media={image}
                      setMedia={setImage}
                    />

                    <TextField
                      onChange={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                      placeholder="Enter your address"
                      errors={errors.address}
                      touched={touched.address}
                      label="Address"
                    />

                    <View style={{ marginTop: -20 }}>
                      <SelectPlaceholder
                        label={state?.label ?? "Select state of residence"}
                        onSelect={() => setShowModal(true)}
                        title="State"
                      />
                    </View>
                    <TextField
                      onChange={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                      placeholder="Enter city"
                      errors={errors.city}
                      touched={touched.city}
                      label="City"
                    />

                    <PrimaryButton
                      disabled={
                        isPending ||
                        !state?.label ||
                        !type?.label ||
                        !image ||
                        !isValid
                      }
                      onPress={() => handleSubmit()}
                      label="Submit"
                    />
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </Screen>

        <SelectField
          options={states?.map((each, index) => ({
            id: index,
            label: each,
          }))}
          visible={showModal}
          setVisible={setShowModal}
          setSelectedOption={setState}
        />

        <SelectField
          options={UTILITY_TYPE?.map((each, index) => ({
            id: index,
            label: each,
          }))}
          visible={showTypeModal}
          setVisible={setShowTypeModal}
          setSelectedOption={setType}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default TierThreeUpgrade;
