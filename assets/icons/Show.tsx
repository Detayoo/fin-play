import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const Show = ({
  stroke,
  width,
  onPress,
}: {
  stroke?: string;
  width?: number;
  onPress?: () => void;
}) => (
  <Svg onPress={onPress} width={width ?? 24} height={width ?? 24} fill="none">
    <Path
      stroke={stroke ?? "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.162 12.053a3.162 3.162 0 1 1-6.324-.001 3.162 3.162 0 0 1 6.324.001Z"
      clipRule="evenodd"
    />
    <Path
      stroke={stroke ?? "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.998 19.355c3.808 0 7.291-2.738 9.252-7.302-1.961-4.564-5.444-7.302-9.252-7.302h.004c-3.808 0-7.291 2.738-9.252 7.302 1.961 4.564 5.444 7.302 9.252 7.302h-.004Z"
      clipRule="evenodd"
    />
  </Svg>
);
