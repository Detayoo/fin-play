import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";
import { ChevronDown } from "./ChevronDown";
import { GTBank } from "@/assets";

export const SelectField = ({
  visible,
  setVisible,
  options,
  setSelectedOption,
  snapPoints = ["50%", "75%", "95%"],
}: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  options: any;
  setSelectedOption: any;
  snapPoints?: string[];
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const defaultSnapPoints = useMemo(
    () => snapPoints || ["25%", "50%", "75%"],
    []
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (visible) handlePresentModalPress();
  }, [visible]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setVisible(false);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Pressable
        style={styles.item}
        onPress={() => {
          setSelectedOption(item);
          //   bottomSheetModalRef.current?.dismiss();
          bottomSheetModalRef.current?.close();
          setVisible(false);
        }}
      >
        <Text>{item.label}</Text>
      </Pressable>
    ),
    []
  );
  return (
    visible && (
      <View
        style={{
          display: visible ? "flex" : "none",
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <View style={styles.backdrop} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={defaultSnapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
        >
          <BottomSheetFlatList
            data={options}
            keyExtractor={(item: any, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheetModal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "red",
  },
  contentContainer: {
    padding: 16,
    // borderRadius: 100,
  },
  item: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    marginVertical: 8,
    // backgroundColor: "#f9c2ff",
    borderRadius: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: Colors.black,
    backgroundColor: Colors.inputBackground,
    fontFamily: fonts["satoshi-medium"],
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

export const SelectPlaceholder = ({
  onSelect,
  label,
  title,
}: {
  onSelect: () => void;
  label: string | null;
  title: string;
}) => {
  return (
    <View style={{}}>
      <AppText variant="medium">{title}</AppText>
      <TouchableOpacity onPress={onSelect} style={styles.input}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {label && <GTBank />}
          <AppText>{label || "Select"}</AppText>
        </View>
        <ChevronDown />
      </TouchableOpacity>
    </View>
  );
};
