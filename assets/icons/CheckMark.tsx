import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const CheckMark = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.334 2.75H7.665c-3.02 0-4.915 2.139-4.915 5.166v8.168c0 3.027 1.885 5.166 4.915 5.166h8.668c3.031 0 4.917-2.139 4.917-5.166V7.916c0-3.027-1.886-5.166-4.916-5.166Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.44 12 2.374 2.373 4.746-4.746"
    />
  </Svg>
)
