import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Search = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Circle
      cx={9.806}
      cy={9.805}
      r={7.49}
      stroke="#272A27"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      stroke="#272A27"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15.016 15.404 2.936 2.93"
    />
  </Svg>
);
