import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  View,
  TextInput,
} from "react-native";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";
import { Search } from "@/assets";

export const ContactSelect = ({
  visible,
  setVisible,
  options,
  setSelectedOption,
  snapPoints = ["50%", "75%", "80%"],
  search,
  setSearch,
}: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  options: any;
  setSelectedOption: any;
  snapPoints?: string[];
  search: string;
  setSearch: (state: string) => void;
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
          bottomSheetModalRef.current?.close();
          setVisible(false);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
        <View style={styles.searchContainer}>
          <View style={styles.searchContentContainer}>
            <Search />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
            />
          </View>
        </View>
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

  searchContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  searchContentContainer: {
    width: "100%",
    flexDirection: "row",
    columnGap: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputBorder,
    borderRadius: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
});
