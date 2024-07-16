import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
export const Key = (props: SvgProps) => (
  <Svg width={80} height={80} fill="none" {...props}>
    <Circle cx={40} cy={40} r={40} fill="#90AD04" fillOpacity={0.3} />
    <Circle cx={40.5} cy={40.5} r={29.5} fill="#90AD04" fillOpacity={0.3} />
    <Path
      fill="#90AD04"
      d="m54.375 28.799 1.094-1.08a1.548 1.548 0 0 0-2.189-2.189l-2.158 2.174-4.363 4.363-9.728 9.713a7.708 7.708 0 1 0 2.19 2.189l8.617-8.633 3.269 3.283a1.544 1.544 0 0 0 2.514-.509 1.542 1.542 0 0 0-.34-1.68l-3.269-3.268 2.19-2.174 1.078 1.08a1.544 1.544 0 0 0 2.637-1.082 1.544 1.544 0 0 0-.448-1.093L54.375 28.8ZM32.792 52.834a4.625 4.625 0 1 1 0-9.25 4.625 4.625 0 0 1 0 9.25Z"
    />
  </Svg>
);
