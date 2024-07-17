import { View } from "react-native";

import { Empty } from "@/assets";
import { AppText } from "./AppText";
import { PrimaryButton } from "./PrimaryButton";

export const EmptyComponent = ({ message }: { message: string }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
      }}
    >
      <Empty />
      <AppText style={{ marginTop: 15 }} variant="medium">
        {message}
      </AppText>
    </View>
  );
};

export const FetchError = ({
  message,
  onPress,
}: {
  message: string;
  onPress: () => void;
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
      }}
    >
      <Empty />
      <AppText style={{ marginTop: 15 }} variant="medium">
        {message}
      </AppText>
      <PrimaryButton
        style={{ marginTop: 20, paddingHorizontal: 20 }}
        label="Retry"
        onPress={onPress}
      />
    </View>
  );
};
