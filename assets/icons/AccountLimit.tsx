import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const AccountLimit = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.639 14.396H17.59a2.693 2.693 0 0 1-2.693-2.691 2.693 2.693 0 0 1 2.693-2.691h4.048M18.049 11.643h-.312"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.748 3h8.643a5.248 5.248 0 0 1 5.248 5.248v7.177a5.248 5.248 0 0 1-5.248 5.247H7.748A5.248 5.248 0 0 1 2.5 15.425V8.248A5.248 5.248 0 0 1 7.748 3Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.036 7.538h5.399"
      opacity={0.4}
    />
  </Svg>
);
