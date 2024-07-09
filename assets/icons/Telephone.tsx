import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Telephone = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.532 12.472c3.989 3.988 4.894-.625 7.434 1.913 2.448 2.448 3.856 2.938.753 6.04-.388.312-2.857 4.07-11.534-4.605C-.493 7.144 3.262 4.672 3.574 4.284c3.11-3.11 3.592-1.695 6.04.753 2.54 2.54-2.071 3.447 1.918 7.435Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.353 6.043a4.426 4.426 0 0 1 3.5 3.5"
      opacity={0.4}
    />
  </Svg>
);
