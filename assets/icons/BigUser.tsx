import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const BigUser = (props: SvgProps) => (
  <Svg width={45} height={45} fill="none" {...props}>
    <Circle cx={22.5} cy={22.5} r={22.5} fill="#90AD04" fillOpacity={0.3} />
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22.985 26.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948ZM22.985 23.006a4.596 4.596 0 1 0-4.596-4.596 4.58 4.58 0 0 0 4.563 4.596h.033Z"
      clipRule="evenodd"
    />
  </Svg>
);
