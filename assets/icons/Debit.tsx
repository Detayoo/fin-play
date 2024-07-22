import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Debit = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Circle cx={9} cy={9} r={9} fill="#FFEAE8" />
    <Path
      stroke="#EA4435"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.378 6.447 6.605 11.22M7.536 6.455l3.842-.008-.008 3.842"
    />
  </Svg>
);
