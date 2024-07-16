import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const UpgradeAction = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.39 9.484h-.934a3.685 3.685 0 0 0-3.685 3.684v4.876a3.685 3.685 0 0 0 3.685 3.683h11.13a3.685 3.685 0 0 0 3.686-3.683v-4.886a3.675 3.675 0 0 0-3.674-3.674h-.944M12.021 2.69v12.041M9.106 5.618l2.915-2.928 2.916 2.928"
    />
  </Svg>
);
