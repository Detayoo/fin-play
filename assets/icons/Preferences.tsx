import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Preferences = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#90AD04"
      d="M9 9a3 3 0 0 0-2.25-2.895V3.75a.75.75 0 1 0-1.5 0v2.355a3 3 0 0 0 0 5.79v8.355a.75.75 0 1 0 1.5 0v-8.355A3 3 0 0 0 9 9Zm-3 1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm6.75 3.105V3.75a.75.75 0 1 0-1.5 0v9.855a3 3 0 0 0 0 5.79v.855a.75.75 0 1 0 1.5 0v-.855a3 3 0 0 0 0-5.79ZM12 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm9-10.5a3 3 0 0 0-2.25-2.895V3.75a.75.75 0 1 0-1.5 0v.855a3 3 0 0 0 0 5.79v9.855a.75.75 0 1 0 1.5 0v-9.855A3 3 0 0 0 21 7.5ZM18 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
    />
  </Svg>
);
