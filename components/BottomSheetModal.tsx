import React, { useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants";

export const ReusableBottomSheet = ({
  visible,
  setVisible,
  children,
  onOpen,
  onClose,
  snapPoints = ["25%", "50%", "75%", "100%"],
}: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  children: React.ReactNode;
  onOpen?: any;
  onClose?: any;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<any>(null);
  console.log(visible, "visible");

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
      setVisible(false);
    }
  }, [visible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setVisible(false);
        onClose && onClose();
      } else if (index !== -1 && !visible) {
        setVisible(true);
        onOpen && onOpen();
      }
    },
    [setVisible, onClose, onOpen, visible]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheet}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    margin: -16,
  },
  bottomSheet: {
    minHeight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
});
