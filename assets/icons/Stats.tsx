import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Stats = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#7E7E7E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.278 13.89c.675 0 1.24.556 1.138 1.222-.605 3.92-3.961 6.83-8.009 6.83A8.107 8.107 0 0 1 2.3 13.837c0-3.688 2.802-7.124 5.957-7.9.678-.168 1.372.309 1.372 1.007 0 4.728.16 5.951 1.057 6.617.898.665 1.954.33 6.592.33Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#7E7E7E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.692 9.952c.054-3.038-3.677-7.935-8.225-7.85a.679.679 0 0 0-.652.653c-.115 2.498.04 5.735.126 7.202a.89.89 0 0 0 .841.842c1.508.086 4.863.204 7.325-.168a.695.695 0 0 0 .585-.68Z"
      clipRule="evenodd"
    />
  </Svg>
);
