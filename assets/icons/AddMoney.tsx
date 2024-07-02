import { Colors } from "@/constants";
import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const AddMoney = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Circle cx={20} cy={20} r={20} fill="#90AD04" opacity={0.1} />
    <Path
      fill={Colors.primary}
      fillRule="evenodd"
      d="M20.75 15.41a.75.75 0 0 0-1.5 0v3.828h-3.833a.75.75 0 0 0 0 1.5h3.833v3.83a.75.75 0 0 0 1.5 0v-3.83h3.833a.75.75 0 0 0 0-1.5H20.75V15.41Z"
      clipRule="evenodd"
    />
  </Svg>
);
