import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const UserHead = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Circle cx={20} cy={20} r={20} fill="#90AD04" opacity={0.1} />
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.99 22.23c-2.579 0-4.78.39-4.78 1.952 0 1.561 2.188 1.965 4.78 1.965 2.578 0 4.78-.39 4.78-1.951 0-1.56-2.188-1.965-4.78-1.965ZM19.99 20.004a3.064 3.064 0 1 0-3.064-3.064 3.054 3.054 0 0 0 3.042 3.064h.022Z"
      clipRule="evenodd"
    />
  </Svg>
);
