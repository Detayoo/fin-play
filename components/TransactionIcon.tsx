import { TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

import { AppText } from "./AppText";
import { formatMoney } from "@/utils";
import { Colors } from "@/constants";
import { BankOutward, GloOutward } from "@/assets";

export const TransactionIcon = ({
  addBorder = true,
  status,
  onPress,
}: {
  addBorder?: boolean;
  status: "GLO" | "DEBIT";
  onPress: () => void;
}) => {
  const renderImage = () => {
    switch (status) {
      case "DEBIT":
        return <BankOutward />;
      case "GLO":
        return <GloOutward />;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: addBorder ? 1 : 0,
        borderColor: "#EDEDED",
        gap: 15,
      }}
    >
      {renderImage()}
      <View
        style={{
          gap: 8,
          flex: 1,
        }}
      >
        <AppText numberOfLines={1} variant="medium">
          Adedigba Peter Adetayo YasMineeeeeeeeeeeee
        </AppText>
        <AppText size="small" color={Colors.faintBlack}>
          {format(new Date(), "MMMM dd, yyyy hh:mma")}
        </AppText>
      </View>

      <View style={{ marginLeft: "auto", gap: 8, alignItems: "flex-end" }}>
        <AppText style={{ fontSize: 13 }} variant="medium">
          -NGN{formatMoney("2000")}
        </AppText>
        <AppText size="small" color={Colors.inputFocusBorder}>
          Successful
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
