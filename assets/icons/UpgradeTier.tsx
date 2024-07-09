import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const UpgradeTier = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22.631 13.014H1.5M20.75 8.778V6.825A3.335 3.335 0 0 0 17.425 3.5h-1.644M3.382 8.778V6.82a3.32 3.32 0 0 1 3.316-3.32l1.68-.001M20.75 13.015v4.53a3.335 3.335 0 0 1-3.325 3.326h-1.644M3.382 13.015v4.535a3.32 3.32 0 0 0 3.316 3.32h1.68"
    />
  </Svg>
);
