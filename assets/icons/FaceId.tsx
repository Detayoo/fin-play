

import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

import { Colors } from "@/constants";
export const FaceId = (props: SvgProps) => (
  <Svg width={60} height={59} fill="none" {...props}>
    <Circle cx={31} cy={30} r={29} fill={Colors.checkboxBorder} />
    <Circle cx={27.5} cy={27.5} r={27.5} fill={Colors.primary} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M35.224 14h2.895a2.894 2.894 0 0 1 2.894 2.894v2.894m-27.013 0v-2.894A2.894 2.894 0 0 1 16.894 14h2.894m0 27.013h-2.894A2.894 2.894 0 0 1 14 38.118v-2.894m27.013 0v2.895a2.894 2.894 0 0 1-2.895 2.894h-2.894"
    />
    <Path
      stroke="#fff"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M21.235 23.648c.267 0 .483-.432.483-.965 0-.533-.216-.965-.483-.965-.266 0-.482.432-.482.965 0 .533.216.965.482.965Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.049 33.128a7.712 7.712 0 0 0 10.915 0"
    />
    <Path
      stroke="#fff"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M33.777 23.648c.267 0 .483-.432.483-.965 0-.533-.216-.965-.483-.965-.266 0-.482.432-.482.965 0 .533.216.965.482.965Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M27.507 21.718v4.823a1.928 1.928 0 0 1-1.93 1.93"
    />
  </Svg>
);
