import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const SettingsProfile = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.985 15.346c-3.868 0-7.17.585-7.17 2.926 0 2.342 3.281 2.948 7.17 2.948 3.867 0 7.17-.586 7.17-2.927 0-2.34-3.282-2.947-7.17-2.947ZM11.985 12.006A4.596 4.596 0 1 0 7.389 7.41a4.58 4.58 0 0 0 4.563 4.596h.033Z"
      clipRule="evenodd"
    />
  </Svg>
);
