import { View } from "react-native";

import { AppText } from "./AppText";
import { Colors } from "@/constants";

export const ListItem = ({
  name,
  value,
}: {
  name: string;
  value: string | string[] | undefined;
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <AppText style={{ maxWidth: "35%" }} color={Colors.faintBlack}>
        {name}
      </AppText>
      <AppText style={{ maxWidth: "60%", textAlign: "right" }} variant="medium">
        {value}
      </AppText>
    </View>
  );
};
