import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import { AppText, BackButton, Screen } from "@/components";

const DataPage = () => {
  const { type } = useLocalSearchParams();
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
      ></ScrollView>
    </Screen>
  );
};

export default DataPage;
