import { Pressable, View } from "react-native";

import { AppText } from "./AppText";
import { Colors } from "../constants";
import { Copy } from "../assets";
import { copyToClipboard } from "../utils";

export const ListItem = ({
  name,
  value,
  value2,
  canCopy = false,
  hasBottomBorder = false,
  hasBackgroundColor,
}: {
  name: string;
  value: string | string[] | undefined;
  value2?: any;
  canCopy?: boolean;
  hasBottomBorder?: boolean;
  hasBackgroundColor?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: hasBottomBorder ? 1 : 0,
        borderBottomColor: "#2A285F0D",
        paddingTop: hasBottomBorder ? 20 : 0,
      }}
    >
      <AppText style={{ maxWidth: "35%" }} color={Colors.faintBlack}>
        {name}
      </AppText>
      <View
        style={{
          maxWidth: "60%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "flex-end",
            backgroundColor: hasBackgroundColor ? Colors.lightGreen : "",
            paddingVertical: hasBackgroundColor ? 4 : 0,
            paddingHorizontal: hasBackgroundColor ? 20 : 0,
            borderRadius: hasBackgroundColor ? 100 : 0,
          }}
        >
          <AppText style={{ textAlign: "right" }} variant="medium">
            {value}
          </AppText>
          {!!canCopy && (
            <Pressable
              style={{ marginTop: 3 }}
              onPress={() => copyToClipboard(value)}
            >
              <Copy />
            </Pressable>
          )}
        </View>
        <AppText style={{ textAlign: "right", fontSize: 12, marginTop: 5 }}>
          {value2}
        </AppText>
      </View>
    </View>
  );
};
