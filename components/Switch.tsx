import { Switch, Platform } from "react-native";

import { Colors } from "@/constants";

export const SwitchComponent = ({
  state,
  toggleSwitch,
}: {
  state: boolean;
  toggleSwitch: () => void;
}) => {
  return (
    <Switch
      trackColor={{
        false:Platform.OS === 'ios'?  Colors.inputBackground:  Colors.inputBorder,
        true: Colors.inputFocusBorder,
      }}
      thumbColor={Platform.OS === "android" ? Colors.primary : Colors.white}
      ios_backgroundColor={Colors.inputBackground}
      onValueChange={toggleSwitch}
      value={state}
    />
  );
};
