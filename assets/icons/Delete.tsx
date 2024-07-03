import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Delete = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#EA4435"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.325 9.468s-.543 6.735-.858 9.572c-.15 1.355-.987 2.15-2.358 2.174-2.61.047-5.221.05-7.83-.005-1.318-.027-2.141-.83-2.288-2.162-.317-2.862-.857-9.579-.857-9.579M20.708 6.24H3.75M17.44 6.24a1.648 1.648 0 0 1-1.614-1.324L15.583 3.7a1.28 1.28 0 0 0-1.237-.95h-4.233a1.28 1.28 0 0 0-1.237.95l-.243 1.216A1.648 1.648 0 0 1 7.018 6.24"
    />
  </Svg>
);
