import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Filter = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" {...props}>
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.543 2C2.967 2 2.5 2.475 2.5 3.06v.624c0 .434.165.85.46 1.164l3.23 3.435.001-.002c.624.638.975 1.501.975 2.401v3.048c0 .204.213.334.39.238l1.84-1.003a.873.873 0 0 0 .45-.766v-1.525c0-.895.347-1.754.965-2.391l3.23-3.435c.294-.314.459-.73.459-1.164V3.06c0-.585-.467-1.06-1.043-1.06H3.543Z"
      clipRule="evenodd"
    />
  </Svg>
);
