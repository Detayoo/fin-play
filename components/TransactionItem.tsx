import { TouchableOpacity, View } from "react-native";
import { format } from "date-fns";

import { AppText } from "./AppText";
import { formatMoney, naira } from "../utils";
import { Colors } from "../constants";
import { BankOutward, BigBank, Credit, GloOutward } from "../assets";
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
        return <BigBank />;
      case "REVERSAL":
        return <BigBank />;
      case "WALLETTRANSFER":
        return <BigBank />;
      case "PAYOUT":
        return <BigBank />;
      case "WALLET_FUNDING":
        return <BigBank />;
      case "GLO":
        return <GloOutward />;
      default:
        break;
    }
  };

  console.log(data, "cat");

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
        {/* <Credit style={{ position: "absolute", bottom: 0, right: 0 }} /> */}

        {isBill ||
        data?.category?.toUpperCase() === "PAYOUT" ||
        data?.category?.toUpperCase() === "WALLETTRANSFER" ? (
          <Debit style={{ position: "absolute", bottom: -10, right: -5 }} />
        ) : (
          <Credit style={{ position: "absolute", bottom: -10, right: -5 }} />
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
            : data?.category?.toUpperCase() === "PAYOUT"
            ? `Transfer to ${data?.accountName}`
            : data?.category?.toUpperCase() === "WALLETTRANSFER"
            ? `Transfer to ${data?.accountName}`
            : data?.category?.toUpperCase() === "REVERSAL"
            ? `Reversal on transaction ${data?.reference}`
            : `${data?.category} `}
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
