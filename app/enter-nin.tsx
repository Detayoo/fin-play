import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Formik } from "formik";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  TextField,
} from "@/components";
import { Colors } from "@/constants";
import { ninValidationSchema } from "@/utils";

const EnterNin = () => {
  const onSubmit = async (values: { nin: string }, { resetForm }: any) => {
    router.replace("/initiate-upgrade");
  };
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={{ fontSize: 18 }} variant="medium">
          Enter your NIN
        </AppText>
        <AppText style={{ marginTop: 16 }} color={Colors.faintBlack}>
          We need your NIN so your account can get upgraded on Uzzy
        </AppText>

        <Formik
          initialValues={{ nin: "" }}
          onSubmit={onSubmit}
          validationSchema={ninValidationSchema}
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
              <View style={{ marginTop: 40, flex: 1 }}>
                <TextField
                  onChange={handleChange("nin")}
                  onBlur={handleBlur("nin")}
                  value={values.nin}
                  placeholder="01234567899"
                  errors={errors.nin}
                  touched={touched.nin}
                  label="Enter NIN"
                  maxLength={11}
                  keyboardType="number-pad"
                />
                <PrimaryButton
                  onPress={() => handleSubmit()}
                  label="Submit"
                  style={{
                    marginTop: "auto",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </Screen>
  );
};

export default EnterNin;
