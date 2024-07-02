import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

export const Airtime = (props: SvgProps) => (
  <Svg width={45} height={45} fill="none" {...props}>
    <Circle cx={22.5} cy={22.5} r={22.5} fill="#90AD04" opacity={0.1} />
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M24.835 15.136a6.52 6.52 0 0 1 5.76 5.754M24.835 18.035a3.621 3.621 0 0 1 2.864 2.864"
      opacity={0.4}
    />
    <Path
      stroke="#012B24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22.117 23.296c3.264 3.262 4.004-.512 6.082 1.564 2.003 2.003 3.156 2.404.617 4.942-.318.255-2.338 3.33-9.438-3.768-7.1-7.098-4.027-9.12-3.772-9.438 2.545-2.545 2.94-1.387 4.943.616 2.077 2.078-1.696 2.82 1.568 6.084Z"
      clipRule="evenodd"
    />
  </Svg>
);
