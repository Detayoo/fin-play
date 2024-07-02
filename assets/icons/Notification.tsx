import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Notification = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Circle cx={20} cy={20} r={20} fill="#90AD04" opacity={0.3} />
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.445 25.642c5.012 0 7.331-.643 7.555-3.224 0-2.58-1.617-2.413-1.617-5.578 0-2.472-2.343-5.285-5.938-5.285-3.596 0-5.94 2.813-5.94 5.285 0 3.165-1.616 2.999-1.616 5.578.225 2.59 2.544 3.224 7.556 3.224Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22.568 28.317c-1.213 1.347-3.104 1.363-4.328 0"
      opacity={0.4}
    />
  </Svg>
);
