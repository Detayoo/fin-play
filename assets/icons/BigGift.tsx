import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
export const BigGift = (props: SvgProps) => (
  <Svg
    width={153}
    height={161}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h153v161H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.0018 0 0 .00171 -.204 -.113)" />
      </Pattern>
      <Image
        id="b"
        width={2000}
        height={2000}
      />
    </Defs>
  </Svg>
)