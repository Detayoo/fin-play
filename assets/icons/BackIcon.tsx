import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const BackIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.25 12.274h15M10.3 18.299l-6.05-6.024L10.3 6.25"
    />
  </Svg>
);
