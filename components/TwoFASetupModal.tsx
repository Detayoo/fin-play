import { View } from "react-native";

import { Key } from "@/assets";
import { AppText } from "./AppText";
import { ReusableBottomSheet } from "./BottomSheetModal";
import { PrimaryButton } from "./PrimaryButton";
import { Colors } from "@/constants";
import { copyToClipboard } from "@/utils";

export const TwoFASetup = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
}) => {
  return (
    <ReusableBottomSheet
      snapPoints={["50%"]}
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <AppText
        style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}
        variant="medium"
      >
        Setup Key
      </AppText>
      <View
        style={{
          backgroundColor: "#90AD040D",
          marginTop: 30,
          paddingHorizontal: 24,
          paddingVertical: 24,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: Colors.inputBorder,
          borderRadius: 5,
        }}
      >
        <Key />
        <AppText variant="medium" style={{ marginTop: 26 }}>
          AXBESF85FGWUEUR84628SHDS
        </AppText>
        <PrimaryButton
          onPress={() => copyToClipboard("AXBESF85FGWUEUR84628SHDS")}
          style={{
            marginTop: 14,
            height: 40,
          }}
          label="Copy Setup Key"
        />
      </View>
    </ReusableBottomSheet>
  );
};
