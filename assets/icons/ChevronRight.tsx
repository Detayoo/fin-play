import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const ChevronRight = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.5 5 7 7-7 7"
    />
  </Svg>
);
