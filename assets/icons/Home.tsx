import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Home = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#7E7E7E"
      d="M21.128 7.548c.727.65 1.108 1.471 1.131 2.437V20.477a3 3 0 0 1-2.99 2.99h-1.03v-7.133a4.376 4.376 0 0 0-4.368-4.368h-3.744a4.376 4.376 0 0 0-4.367 4.368v7.133H4.73a3 3 0 0 1-2.99-2.99V10.08c0-1.006.381-1.86 1.131-2.531l6.863-6.144a3.384 3.384 0 0 1 4.532 0l6.862 6.144Zm-4.992 15.92h-8.27v-7.134a2.272 2.272 0 0 1 2.263-2.263h3.744a2.272 2.272 0 0 1 2.263 2.263v7.133Z"
    />
  </Svg>
);
