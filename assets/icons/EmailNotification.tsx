import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const EmailNotification = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m17.268 8.562-4.266 3.434a2.223 2.223 0 0 1-2.746 0L5.954 8.562"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.888 3h9.428c1.36.015 2.653.59 3.58 1.59a5.017 5.017 0 0 1 1.326 3.704v6.528a5.017 5.017 0 0 1-1.326 3.704 4.957 4.957 0 0 1-3.58 1.59H6.888C3.968 20.116 2 17.741 2 14.822V8.294C2 5.375 3.968 3 6.888 3Z"
      clipRule="evenodd"
    />
  </Svg>
);
