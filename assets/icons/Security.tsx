import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Security = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.865 5.124c.437.153.729.565.729 1.028v6.772c0 1.894-.688 3.7-1.903 5.1-.611.706-1.384 1.255-2.205 1.698l-3.558 1.922-3.564-1.922c-.822-.445-1.596-.992-2.208-1.699a7.783 7.783 0 0 1-1.906-5.102V6.15c0-.462.292-.874.729-1.027l6.582-2.313a1.09 1.09 0 0 1 .722 0l6.582 2.313Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#90AD04"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.323 11.917 1.891 1.893 3.899-3.898"
    />
  </Svg>
);
