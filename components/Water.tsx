import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Water = (props: SvgProps) => (
  <Svg width={45} height={45} fill="none" {...props}>
    <Circle cx={22.5} cy={22.5} r={22.5} fill="#90AD04" opacity={0.1} />
    <Path
      fill="#012B24"
      d="M22.86 11.776a1.125 1.125 0 0 0-1.72 0c-.308.364-7.527 9.001-7.527 14.462 0 4.625 3.763 8.387 8.387 8.387 4.625 0 8.387-3.762 8.387-8.387 0-5.456-7.218-14.097-7.526-14.462ZM22 32.375a6.144 6.144 0 0 1-6.137-6.137c0-3.37 3.867-9.034 6.137-11.947 2.271 2.913 6.137 8.575 6.137 11.947A6.144 6.144 0 0 1 22 32.375Z"
    />
  </Svg>
);
