import { View } from "react-native";

import { Empty } from "@/assets";
import { AppText } from "./AppText";

export const EmptyComponent = ({ message }: { message: string }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
      }}
    >
      <Empty />
      <AppText style={{ marginTop: 10 }} variant="medium">
        {message}
      </AppText>
    </View>
  );
};
