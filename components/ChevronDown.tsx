import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const ChevronDown = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#343A40"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.833 7.083 10 12.918 4.167 7.084"
    />
  </Svg>
);
