import * as React from "react";
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const Credit = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={13} cy={12} r={9} fill="#FAFDEE" />
      <Path
        stroke="#90AD04"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.62 14.553 4.773-4.773M14.462 14.545l-3.842.009.008-3.843"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
