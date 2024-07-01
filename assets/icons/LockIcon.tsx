import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const LockIcon = (props: SvgProps) => (
  <Svg width={41} height={41} fill="none" {...props}>
    <Circle cx={20.5} cy={20.5} r={20.5} fill="#90AD04" fillOpacity={0.3} />
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M25.423 17.448V15.3a4.552 4.552 0 0 0-4.551-4.551 4.55 4.55 0 0 0-4.57 4.53v2.168"
      opacity={0.4}
    />
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M24.683 29.25h-7.641a3.792 3.792 0 0 1-3.792-3.792v-4.29a3.792 3.792 0 0 1 3.792-3.791h7.641a3.792 3.792 0 0 1 3.792 3.792v4.289a3.792 3.792 0 0 1-3.792 3.792Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.862 22.203v2.22"
    />
  </Svg>
);
