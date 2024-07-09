import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Facebook = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#90AD04"
      fillRule="evenodd"
      d="M18 8.25h-4.5v-3a1.5 1.5 0 0 1 1.5-1.5h1.5V0h-3A4.5 4.5 0 0 0 9 4.5v3.75H6V12h3v12h4.5V12h3L18 8.25Z"
      clipRule="evenodd"
    />
  </Svg>
);
