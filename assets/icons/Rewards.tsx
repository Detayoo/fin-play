import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Rewards = (props: SvgProps) => (
  <Svg width={22} height={26} fill="none" {...props}>
    <Path
      stroke="#7E7E7E"
      strokeWidth={1.5}
      d="M10.469 19.938a9.469 9.469 0 0 0 0-18.938 9.469 9.469 0 1 0 0 18.938Z"
    />
    <Path
      stroke="#7E7E7E"
      strokeWidth={1.5}
      d="M17.603 16.825v7.426c0 1.094 0 1.641-.359 1.871-.359.23-.855 0-1.85-.458l-3.275-1.51c-.748-.345-1.122-.517-1.52-.517-.399 0-.773.172-1.521.517l-3.276 1.51c-.994.458-1.49.688-1.85.458-.358-.23-.358-.777-.358-1.871v-7.427"
    />
    <Path
      stroke="#7E7E7E"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10.598 20.197v2.854"
    />
  </Svg>
);
