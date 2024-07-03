import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Copy = (props: SvgProps) => (
  <Svg width={12} height={14} fill="none" {...props}>
    <Path
      fill="#012B24"
      d="M4.773 10.637a2.32 2.32 0 0 1-2.318-2.318V2.728H1.5c-.827 0-1.5.673-1.5 1.5v7.364c0 .827.673 1.5 1.5 1.5h6.818c.827 0 1.5-.673 1.5-1.5v-.955H4.773Z"
    />
    <Path
      fill="#012B24"
      d="M4.773 0a1.5 1.5 0 0 0-1.5 1.5v6.818a1.5 1.5 0 0 0 1.5 1.5H10.5a1.5 1.5 0 0 0 1.5-1.5V1.636C12 .732 11.268 0 10.364 0H4.773Z"
    />
  </Svg>
);
