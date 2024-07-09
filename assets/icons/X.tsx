import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const X = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#90AD04"
      d="M15.751 0h3.067l-6.7 8.472L20 20h-6.172l-4.833-6.992L3.464 20H.394l7.167-9.062L0 0h6.328l4.37 6.39L15.75 0Zm-1.076 17.97h1.7L5.404 1.923H3.58L14.675 17.97Z"
    />
  </Svg>
);
