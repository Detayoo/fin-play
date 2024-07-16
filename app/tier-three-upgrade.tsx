import { ScrollView, View } from "react-native";

import { AppText, BackButton, Screen } from "@/components";

const TierThreeUpgrade = () => {
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
        <AppText size="xlarge" variant="medium"></AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </Screen>
  );
};

export default TierThreeUpgrade;
