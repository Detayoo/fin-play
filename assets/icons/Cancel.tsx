import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Cancel = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#012B24"
      strokeWidth={1.5}
      d="M22.25 7.25v9.5a3 3 0 0 1-3 3H8.747a1.2 1.2 0 0 1-.848-.352l-6.55-6.55a1.2 1.2 0 0 1 0-1.697l6.55-6.55a1.2 1.2 0 0 1 .848-.351H19.25a3 3 0 0 1 3 3Z"
    />
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m11 9 3 3m3 3-3-3m0 0 3-3m-3 3-3 3"
    />
  </Svg>
);
