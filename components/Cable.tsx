import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Cable = (props: SvgProps) => (
  <Svg width={45} height={45} fill="none" {...props}>
    <Circle cx={22.5} cy={22.5} r={22.5} fill="#90AD04" opacity={0.1} />
    <Path
      fill="#012B24"
      d="M29 17h-3.59l2.3-2.29a1.005 1.005 0 0 0-1.42-1.42L23 16.54l-1.17-2a1.004 1.004 0 0 0-1.74 1L21 17h-4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3v1a1 1 0 1 0 2 0v-1h8v1a1 1 0 1 0 2 0v-1a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8Z"
    />
  </Svg>
);
