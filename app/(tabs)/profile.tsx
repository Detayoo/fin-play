import { View } from "react-native";
import { AppText, DashboardLayout, PrimaryButton } from "@/components";

const RewardsPage = () => {
  return (
    <DashboardLayout>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "#90AD041A",
          paddingHorizontal: 26,
          paddingVertical: 20,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#D6D6D6",
        }}
      >
        <PrimaryButton label="Upgrade" />
      </View>
    </DashboardLayout>
  );
};

export default RewardsPage;
