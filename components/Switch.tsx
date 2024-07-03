import { Switch } from "react-native";

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
        false: Colors.inputBackground,
        true: Colors.inputFocusBorder,
      }}
      thumbColor={Colors.white}
      ios_backgroundColor={Colors.inputBackground}
      onValueChange={toggleSwitch}
      value={state}
    />
  );
};
