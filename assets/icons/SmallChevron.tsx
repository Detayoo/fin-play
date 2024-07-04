import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const SmallChevron = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" {...props}>
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.167 5.667 8.5 10.332 3.833 5.666"
    />
  </Svg>
);
