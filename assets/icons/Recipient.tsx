import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Recipient = (props: SvgProps) => (
  <Svg width={31} height={31} fill="none" {...props}>
    <Circle cx={15.5} cy={15.5} r={15.5} fill="#90AD04" />
    <Path
      fill="#012B24"
      d="M15.998 18.116c-2.875 0-5.332.454-5.332 2.267 0 1.814 2.441 2.284 5.332 2.284 2.875 0 5.331-.453 5.331-2.267 0-1.814-2.44-2.284-5.331-2.284ZM15.998 16.39a3.515 3.515 0 0 0 3.528-3.529 3.515 3.515 0 0 0-3.528-3.528 3.516 3.516 0 0 0-3.528 3.528 3.516 3.516 0 0 0 3.528 3.528Z"
    />
  </Svg>
);
