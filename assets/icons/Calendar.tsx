import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Calendar = (props: SvgProps) => (
  <Svg width={20} height={22} fill="none" {...props}>
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.093 8.404h17.824"
    />
    <Path
      fill="#074D41"
      fillRule="evenodd"
      d="M4.808 12.31a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75Zm5.197-.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5h-.01Zm4.437 0a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5h-.01Zm0 3.886a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5h-.01Zm-5.187.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75Zm-3.697-.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5h-.01Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.044 1v3.29M5.966 1v3.29"
    />
    <Path
      stroke="#074D41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.238 2.58H5.771C2.834 2.58 1 4.214 1 7.221v9.05C1 19.326 2.834 21 5.771 21h8.458C17.175 21 19 19.355 19 16.348V7.222c.01-3.007-1.816-4.643-4.762-4.643Z"
      clipRule="evenodd"
    />
  </Svg>
);
