import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { AppText, BackButton, EmptyComponent, Screen } from "@/components";
import { Colors } from "@/constants";
import { ChevronDown } from "@/components/ChevronDown";
const InitiateBillPaymentPage = () => {
  const { type } = useLocalSearchParams<any>();

  const lowerCaseType: string = type?.toLowerCase();
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
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/${lowerCaseType}`,
              params: {
                type,
              },
            })
          }
          style={{
            height: 60,
            borderWidth: 1,
            borderColor: "#D7E3E1",
            backgroundColor: "#90AD0408",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <AppText variant="medium">Buy for a new phone number</AppText>
          <ChevronDown style={{ transform: [{ rotate: "280deg" }] }} />
        </Pressable>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppText style={{ fontSize: 15 }} variant="medium">
              {type} Beneficiaries
            </AppText>
            <AppText
              onPress={() => router.push("/beneficiaries")}
              style={{ fontSize: 15 }}
              color={Colors.inputFocusBorder}
            >
              View all
            </AppText>
          </View>
          <EmptyComponent message={`No recent ${type} purchase`} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default InitiateBillPaymentPage;
