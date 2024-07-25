import * as React from "react";
import Svg, { SvgProps, Circle, Path, G, Defs } from "react-native-svg";

export const Debit = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={12} cy={12} r={9} fill="#FFEAE8" />
      <Path
        stroke="#EA4435"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.38 9.447-4.773 4.773M10.538 9.455l3.842-.009-.008 3.843"
      />
    </G>
    <Defs></Defs>
  </Svg>
);