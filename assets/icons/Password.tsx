import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Password = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.424 9.448V7.301a4.552 4.552 0 0 0-4.551-4.551 4.55 4.55 0 0 0-4.57 4.531v2.167"
      opacity={0.4}
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.683 21.25h-7.64a3.792 3.792 0 0 1-3.793-3.792v-4.289a3.792 3.792 0 0 1 3.792-3.792h7.641a3.792 3.792 0 0 1 3.792 3.792v4.289a3.792 3.792 0 0 1-3.792 3.792Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.863 14.203v2.221"
    />
  </Svg>
);
