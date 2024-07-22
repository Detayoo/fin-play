import { TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

import { AppText } from "./AppText";
import { formatMoney, naira } from "../utils";
import { Colors } from "../constants";
import { BankOutward, Credit, GloOutward } from "../assets";
import { IGetTransactionById, ITransactionsList, Transaction } from "@/types";
import { Debit } from "@/assets/icons/Debit";

export const TransactionItem = ({
  addBorder = true,
  status,
  onPress,
  data,
  type,
}: {
  addBorder?: boolean;
  status?: "GLO" | "DEBIT" | "CREDIT";
  onPress: () => void;
  data?: Transaction;
  type?: string;
}) => {
  const renderImage = () => {
    switch (type) {
      case "DEBIT":
        return <BankOutward />;
      case "CREDIT":
        return <BankOutward />;
      case "GLO":
        return <GloOutward />;
      default:
        break;
    }
  };

  const isBill =
    data?.category?.toLowerCase() == "airtime" ||
    data?.category?.toLowerCase() === "data" ||
    data?.category?.toLowerCase() === "electricity" ||
    data?.category?.toLowerCase() === "tv" ||
    data?.category?.toLowerCase() === "betting";

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
      <View style={{ position: "relative" }}>
        {renderImage()}

        {isBill ? (
          <Debit style={{ position: "absolute", bottom: 0, right: 0 }} />
        ) : (
          <Credit style={{ position: "absolute", bottom: 0, right: 0 }} />
        )}
      </View>
      <View
        style={{
          gap: 8,
          flex: 1,
        }}
      >
        <AppText
          style={{ textTransform: "uppercase" }}
          numberOfLines={1}
          variant="medium"
        >
          {isBill && (data?.category === "airtime" || data?.category === "data")
            ? `${data?.operatorName} VTU ${data?.beneficiary}`
            : isBill &&
              !(data?.category === "airtime" || data?.category === "data")
            ? `${data?.category} purchase for ${data?.beneficiary}`
            : data?.accountName}
        </AppText>
        <AppText size="small" color={Colors.faintBlack}>
          {data?.time
            ? format(new Date(data.time), "MMMM dd, yyyy hh:mma")
            : null}
        </AppText>
      </View>

      <View style={{ marginLeft: "auto", gap: 8, alignItems: "flex-end" }}>
        <AppText
          style={{ fontSize: 13 }}
          variant="medium"
          color={isBill || data?.type == "debit" ? Colors.error : Colors.black}
        >
          {/* check type here */}
          {isBill || data?.type === "debit" ? "-" : ""}
          {naira}
          {formatMoney(data?.amountPaid || 0)}
        </AppText>
        <AppText
          size="small"
          style={{ textTransform: "capitalize" }}
          color={
            data?.status?.toLocaleLowerCase() === "success"
              ? Colors.primary
              : Colors.error
          }
        >
          {data?.status}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
