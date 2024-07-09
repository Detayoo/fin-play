import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
export const PushNotification = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.245 14.781 2.993-3.89 3.414 2.682 2.93-3.78"
    />
    <Circle
      cx={19.995}
      cy={4.201}
      r={1.922}
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.925 3.12H7.657c-3.012 0-4.879 2.133-4.879 5.144v8.083c0 3.011 1.83 5.135 4.879 5.135h8.604c3.011 0 4.879-2.124 4.879-5.135v-7.04"
    />
  </Svg>
);
