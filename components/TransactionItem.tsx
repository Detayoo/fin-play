import { TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

import { AppText } from "./AppText";
import { formatMoney } from "../utils";
import { Colors } from "../constants";
import { BankOutward, GloOutward } from "../assets";

export const TransactionItem = ({
  addBorder = true,
  status,
  onPress,
  data,
}: {
  addBorder?: boolean;
  status: "GLO" | "DEBIT";
  onPress: () => void;
  data?: any;
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
          {data?.accountName}
        </AppText>
        <AppText size="small" color={Colors.faintBlack}>
          {data?.paidAt
            ? format(new Date(data.paidAt), "MMMM dd, yyyy hh:mma")
            : null}
        </AppText>
      </View>

      <View style={{ marginLeft: "auto", gap: 8, alignItems: "flex-end" }}>
        <AppText style={{ fontSize: 13 }} variant="medium">
          {/* check ttype here */}
          {"-"}NGN{formatMoney(data?.amountPaid || 0)}
        </AppText>
        <AppText
          size="small"
          style={{ textTransform: "capitalize" }}
          color={
            data?.status?.toLocaleLowerCase() === "success"
              ? Colors.inputFocusBorder
              : Colors.error
          }
        >
          {data?.status}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
