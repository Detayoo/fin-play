import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

import { Colors } from "@/constants";
export const ActiveHome = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={Colors.inputFocusBorder}
      fillRule="evenodd"
      d="M22.76 10.079v10.398a3.5 3.5 0 0 1-3.49 3.49h-1.53v-7.633a3.876 3.876 0 0 0-3.869-3.868h-3.744a3.876 3.876 0 0 0-3.867 3.868v7.633H4.73a3.5 3.5 0 0 1-3.49-3.49V10.08c0-1.149.442-2.138 1.298-2.904l6.863-6.143a3.884 3.884 0 0 1 5.198 0l6.863 6.143a3.772 3.772 0 0 1 1.298 2.904Zm-6.126 13.888H7.365v-7.633a2.772 2.772 0 0 1 2.764-2.763h3.744a2.772 2.772 0 0 1 2.763 2.763v7.633h-.002Z"
      clipRule="evenodd"
    />
  </Svg>
);
