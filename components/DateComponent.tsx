import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import { AppText } from "./AppText";
import { Colors, fonts } from "@/constants";
import { Calendar } from "@/assets";

export const DateComponent = ({
  open,
  date,
  handleAction,
  onOpen,
  onClose,
  dateFormat,
  maxDate,
  minDate,
}: {
  open: boolean;
  date: Date;
  handleAction: (x: Date) => void;
  onOpen: () => void;
  onClose: () => void;
  dateFormat?: string;
  maxDate?: Date;
  minDate?: Date;
}) => {
  const formattedDate = date ? format(date, "dd/MM/yyyy") : "dd/MM/yyyy";
  return (
    <View style={styles.container}>
      <AppText style={styles.dateText}>
        {date ? formattedDate : "DD/MM/YYYY"}
      </AppText>
      <Pressable onPress={onOpen}>
        <Calendar />
      </Pressable>
      <View>
        <DateTimePickerModal
          isVisible={open}
          date={date}
          onConfirm={(date: Date) => {
            handleAction(date);
            onClose();
          }}
          onCancel={onClose}
          maximumDate={maxDate || new Date()}
          minimumDate={minDate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#FCFEF5",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingLeft: 15,
    paddingRight: 5,
  },
  dateText: {
    flex: 1,
    fontFamily: fonts["satoshi-medium"],
    fontSize: 14,
  },
});
