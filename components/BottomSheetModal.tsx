import React, { useCallback, useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

export const ReusableBottomSheet = ({
  children,
  visible,
  onClose,
  snapPoints = ["25%", "50%", "75%"],
}: any) => {
  const bottomSheetRef = useRef<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      bottomSheetRef.current?.close();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <>
      {visible && (
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Pressable style={styles.backdropPressable} onPress={onClose} />
        </Animated.View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        style={styles.bottomSheet}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 0,
  },
  backdropPressable: {
    flex: 1,
  },
  bottomSheet: {
    zIndex: 1,
    borderRadius: 1000,
  },
  handleIndicator: {
    backgroundColor: "#DDDDDD",
    width: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderRadius: 50,
  },
});
