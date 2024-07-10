import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text, Pressable, StyleSheet, Animated, View } from "react-native";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";

export const ContactSelect = ({
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const defaultSnapPoints = useMemo(
    () => snapPoints || ["25%", "50%", "75%"],
    []
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (visible) {
      handlePresentModalPress();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      bottomSheetModalRef.current?.close();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setVisible(false);
    }
  }, []);

  const onClose = () => {
    bottomSheetModalRef.current?.close();
    setVisible(false);
  };

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
        <View>
          {item?.name ? <AppText>{item?.name}</AppText> : null}
          {item?.phoneNumbers?.length ? (
            <AppText>{item?.phoneNumbers[0]?.number}</AppText>
          ) : null}
        </View>
      </Pressable>
    ),
    []
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={defaultSnapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        style={styles.bottomSheet}
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={(item: any, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>
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
    padding: 16,
    backgroundColor: "white",
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
